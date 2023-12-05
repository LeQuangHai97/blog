import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BlacklistService } from '../blacklist.service';

@Injectable()
export class BlacklistMiddleware implements NestMiddleware {
  constructor(private readonly blacklistService: BlacklistService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token && this.blacklistService.isTokenBlacklisted(token)) {
      return res.status(401).json({ message: 'Token has been blacklisted.' });
    }
    next();
  }
}