import { Component } from '@angular/core';
import { RoomComponent } from '../../components/room/room.component';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [RoomComponent],
  templateUrl: './rooms.page.html',
  styleUrl: './rooms.page.css',
})
export class RoomsPage {}
