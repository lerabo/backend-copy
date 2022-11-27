import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Message } from './entities/message.entity';
import { MessageDto } from './modules/message/dto/message.dto';
import { MessageService } from './modules/message/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private messageService: MessageService) {}

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: MessageDto): Promise<void> {
    await this.messageService.createMessage(payload);
    this.server.emit('recMessage', payload);
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
  }
}
