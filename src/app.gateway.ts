import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { AppService } from './app.service';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly appService: AppService) {}

  @SubscribeMessage('resetGame')
  async resetGame() {
    const { updatedGame } = await this.appService.resetGame();

    this.server.emit('dayUpdated', updatedGame.day);
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
}
