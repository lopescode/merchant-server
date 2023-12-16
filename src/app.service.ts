import { Injectable } from '@nestjs/common';
import { GAME_SESSION_ID } from 'src/infra/constants/game-session';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async resetGame() {
    const updatedGame = await this.prismaService.game.update({
      where: {
        id: GAME_SESSION_ID,
      },
      data: {
        day: 1,
        blueprintsInGame: {
          deleteMany: {},
        },
        createdAt: new Date(),
      },
    });

    return {
      updatedGame,
    };
  }

  async nextDay() {
    const game = await this.prismaService.game.findUnique({
      where: {
        id: GAME_SESSION_ID,
      },
    });

    const updatedGame = await this.prismaService.game.update({
      where: {
        id: GAME_SESSION_ID,
      },
      data: {
        day: game.day + 1,
      },
    });

    const blueprintsInGame =
      await this.prismaService.blueprintInGame.findMany();

    const blueprintPromise = blueprintsInGame.map(async (blueprintInGame) => {
      const isExpired = blueprintInGame.expirationDay <= updatedGame.day;

      if (!isExpired) return blueprintInGame;

      await this.prismaService.blueprintInGame.delete({
        where: {
          gameId_blueprintId: {
            blueprintId: blueprintInGame.blueprintId,
            gameId: blueprintInGame.gameId,
          },
        },
      });
    });

    await Promise.allSettled(blueprintPromise);

    const updatedBlueprintsInGame =
      await this.prismaService.blueprintInGame.findMany();

    return {
      updatedGame,
      updatedBlueprintsInGame,
    };
  }

  async generateBlueprint() {
    const game = await this.prismaService.game.findUnique({
      where: {
        id: GAME_SESSION_ID,
      },
      include: {
        blueprintsInGame: true,
      },
    });

    const blueprints = await this.prismaService.blueprint.findMany();

    const availableBlueprints = blueprints.filter(
      (blueprint) =>
        !game.blueprintsInGame.some(
          (blueprintInGame) => blueprintInGame.blueprintId === blueprint.id,
        ),
    );

    const randomBlueprint =
      availableBlueprints[
        Math.floor(Math.random() * availableBlueprints.length)
      ];

    await this.prismaService.blueprintInGame.create({
      data: {
        gameId: game.id,
        blueprintId: randomBlueprint.id,
        expirationDay: game.day + randomBlueprint.deliveryTime,
      },
    });

    const updatedBlueprintsInGame =
      await this.prismaService.blueprintInGame.findMany();

    return {
      updatedBlueprintsInGame,
    };
  }
}
