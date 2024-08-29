export interface ChatState {
  user: User | null;
  logs: Log[];
}

export interface User {
  name: string;
  room: string;
}

export interface Log {
  type: 'message' | 'notification';
  user: User | null;
  content: string;
  time: Date;
}

export interface ServerMessage {
  user: string;
  message: string;
  timestamp: Date;
}

export interface ServerNotification {
  title: string;
  content: string;
  timestamp: Date;
}
