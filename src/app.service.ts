import { Injectable } from '@nestjs/common';
import { GAME_SESSION_ID } from 'src/infra/constants/game-session';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  async connectPlayer() {
    const game = await this.prismaService.game.findUnique({
      where: {
        id: GAME_SESSION_ID,
      },
      include: {
        blueprintsInGame: {
          include: {
            blueprint: true,
          },
        },
      },
    });

    return {
      game,
    };
  }

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
      include: {
        blueprintsInGame: {
          include: {
            blueprint: true,
          },
        },
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

    const blueprintsInGame = await this.prismaService.blueprintInGame.findMany({
      include: {
        blueprint: true,
      },
    });

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
      await this.prismaService.blueprintInGame.findMany({
        include: {
          blueprint: true,
        },
      });

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

    const usedIndexes = game.blueprintsInGame.map((bp) => bp.indexInGame);
    const availableIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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

    const getRandomAvailableIndex = () => {
      let tryCount = 0;
      let index = 999;
      while (index === 999 && tryCount < 25) {
        const newIndex =
          availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
        if (newIndex && !usedIndexes.includes(newIndex)) {
          index = newIndex;
        }
        console.log({ newIndex });
        tryCount++;
      }
      return index;
    };

    const indexInGame = getRandomAvailableIndex();
    if (indexInGame === 999) return {};

    await this.prismaService.blueprintInGame.create({
      data: {
        gameId: game.id,
        blueprintId: randomBlueprint.id,
        expirationDay: game.day + randomBlueprint.deliveryTime,
        indexInGame,
      },
    });

    const updatedBlueprintsInGame =
      await this.prismaService.blueprintInGame.findMany({
        include: {
          blueprint: true,
        },
      });

    return {
      updatedBlueprintsInGame,
    };
  }

  async deleteBlueprint(blueprintId: string) {
    await this.prismaService.blueprintInGame.delete({
      where: {
        gameId_blueprintId: {
          blueprintId: Number(blueprintId),
          gameId: GAME_SESSION_ID,
        },
      },
    });

    const updatedBlueprintsInGame =
      await this.prismaService.blueprintInGame.findMany({
        include: {
          blueprint: true,
        },
      });

    return {
      updatedBlueprintsInGame,
    };
  }

  async getCurrentBlueprints() {
    return await this.prismaService.blueprintInGame.findMany({
      where: {
        gameId: GAME_SESSION_ID,
      },
      include: {
        blueprint: true,
      },
    });
  }
}
