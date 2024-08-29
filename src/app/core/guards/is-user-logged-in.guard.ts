import { inject } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CanActivateFn, Router } from '@angular/router';

export const IsUserLoggedIn: CanActivateFn = async () => {
  const chatService = inject(ChatService);
  const router = inject(Router);

  const isUserLoggedIn = chatService.getUser();

  if (isUserLoggedIn) {
    // Allow access
    return true;
  } else {
    // Redirect to login
    return router.createUrlTree(['/login']);
  }
};
