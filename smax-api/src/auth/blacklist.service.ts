import { Injectable } from '@nestjs/common';

@Injectable()
export class BlacklistService {
  private blacklist: string[] = [];

  addToBlacklist(token: string) {
    this.blacklist.push(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklist.includes(token);
  }

  
}