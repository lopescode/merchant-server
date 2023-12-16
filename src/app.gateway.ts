import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { AppService } from './app.service';

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly appService: AppService) {}

  @SubscribeMessage('connectPlayer')
  async connectPlayer() {
    const { game } = await this.appService.connectPlayer();

    this.server.emit('dayUpdated', game.day);
    this.server.emit('blueprintsInGameUpdated', game.blueprintsInGame);
  }

  @SubscribeMessage('resetGame')
  async resetGame() {
    const { updatedGame } = await this.appService.resetGame();

    this.server.emit('dayUpdated', updatedGame.day);
    this.server.emit('blueprintsInGameUpdated', updatedGame.blueprintsInGame);
  }

  @SubscribeMessage('nextDay')
  async nextDay() {
    const { updatedGame, updatedBlueprintsInGame } =
      await this.appService.nextDay();

    this.server.emit('dayUpdated', updatedGame.day);
    this.server.emit('blueprintsInGameUpdated', updatedBlueprintsInGame);
  }

  @SubscribeMessage('generateBlueprint')
  async generateBlueprint() {
    const { updatedBlueprintsInGame } =
      await this.appService.generateBlueprint();

    this.server.emit('blueprintsInGameUpdated', updatedBlueprintsInGame);
  }

  @SubscribeMessage('deleteBlueprint')
  async deleteBlueprint(@MessageBody() blueprintId: string) {
    const { updatedBlueprintsInGame } =
      await this.appService.deleteBlueprint(blueprintId);

    this.server.emit('blueprintsInGameUpdated', updatedBlueprintsInGame);
  }
}
