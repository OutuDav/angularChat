import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SignalRService } from './signal-r.service';
import { ChatState, Log, User } from '../models/interfaces';
import { ENTER_MESSAGE, LEAVE_MESSAGE } from '../models/const';

@Injectable({ providedIn: 'root' })
export class ChatService extends ComponentStore<ChatState> {
  constructor(private signalRService: SignalRService) {
    super({ user: null, logs: [] });

    this.signalRService.getLogs$().subscribe((newLog) => {
      this.#addLog(newLog);
    });
  }

  #unfilteredLogs$: Observable<Log[]> = this.select((state) => state.logs);

  #getPlainRoomUser(): string {
    const user = this.getUser();
    const plainRoomUser = user.room.concat('/', user.name);

    return plainRoomUser;
  }

  //#region User
  getUser(): User {
    return this.get().user!;
  }

  setUser = this.updater((state, user: User) => ({
    ...state,
    user: user,
  }));
  //#endregion

  //#region Logs
  #addLog = this.updater((state, log: Log) => ({
    ...state,
    logs: [...state.logs, log],
  }));

  getRoomLogs(roomName: string, fromDate: Date): Observable<Log[]> {
    return this.#unfilteredLogs$.pipe(
      map((logs) =>
        logs.filter(
          (log) =>
            log.user?.room.toLowerCase().trim() ===
              roomName.toLowerCase().trim() && log.time >= fromDate
        )
      )
    );
  }

  sendMessage(message: string): void {
    const plainRoomUser = this.#getPlainRoomUser();

    this.signalRService.sendMessage(plainRoomUser, message);
  }

  enterOrLeaveRoom(action: 'enter' | 'leave'): void {
    const userName = this.getUser().name;
    const plainRoomUser = this.#getPlainRoomUser();

    const content = `${userName} ${
      action === 'enter' ? ENTER_MESSAGE : LEAVE_MESSAGE
    }`;

    this.signalRService.sendNotification(plainRoomUser, content);
  }
  //#endregion
}
