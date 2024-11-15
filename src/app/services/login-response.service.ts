import { Injectable } from '@angular/core';

export interface LoginResponse {
  success: boolean;
  token?: string;
  username?: string;
  userId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoginResponseService {
  constructor() {}
}
