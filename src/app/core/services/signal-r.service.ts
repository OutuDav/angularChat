import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { Log, ServerMessage, ServerNotification } from '../models/interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignalRService {
  #connection: HubConnection;
  #logs$: Subject<Log> = new Subject<Log>();

  constructor() {
    this.#connection = new HubConnectionBuilder()
      .withUrl('http://localhost:8090/chatHub')
      .build();

    this.#startEventHandlers();

    this.#startConnection();
  }

  #startEventHandlers(): void {
    this.#connection.on('ReceiveMessage', (rawMessage) =>
      this.#receiveMessage(rawMessage)
    );

    this.#connection.on('ReceiveNotification', (rawNotification) =>
      this.#receiveNotification(rawNotification)
    );
  }

  #startConnection(): void {
    this.#connection
      .start()
      .then((_) => {
        console.log('Connection set');
      })
      .catch((error) => {
        return console.error(error);
      });
  }

  #receiveMessage(message: ServerMessage): void {
    const [room = 'internal', name = 'Admin'] = message.user.split('/');

    const log: Log = {
      type: 'message',
      user: { room, name },
      content: message.message,
      time: new Date(message.timestamp),
    };

    this.#logs$.next(log);
  }

  #receiveNotification(notification: ServerNotification): void {
    const [room = 'internal', name = 'Admin'] = notification.title.split('/');

    const log: Log = {
      type: 'notification',
      user: { room, name },
      content: notification.content,
      time: new Date(notification.timestamp),
    };

    this.#logs$.next(log);
  }

  sendMessage(plainRoomUser: string, message: string) {
    this.#connection
      .invoke('SendMessage', plainRoomUser, message)
      .catch((err) => {
        return console.error(err.toString());
      });
  }

  sendNotification(plainRoomUser: string, content: string) {
    this.#connection
      .invoke('SendNotification', plainRoomUser, content)
      .catch((err) => {
        return console.error(err.toString());
      });
  }

  getLogs$(): Observable<Log> {
    return this.#logs$.asObservable();
  }
}
