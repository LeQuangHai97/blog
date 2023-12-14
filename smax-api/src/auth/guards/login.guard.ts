// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class LoginGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return !!request.user; // Kiểm tra xem có thông tin người dùng trong request không
//   }
// }