import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (token) {
      // Kiểm tra tính hợp lệ của token và đặt thông tin user vào req
      // Nếu token hợp lệ, bạn có thể đặt thông tin user vào req để sử dụng ở các controller sau
      req.user = { username: 'example_user' };
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}