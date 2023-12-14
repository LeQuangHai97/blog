import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Smax } from './smax';
import { CreateOrUpdateSmax } from './create-or-update-smax';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root',
})
export class SmaxService {
  private apiUrl = 'http://localhost:3000';

  currentUser: { id: string; access_token: string } | null = null;

  constructor(private http: HttpClient, private userService: UserService) {
    // Khởi tạo currentUser từ localStorage khi service được tạo
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser !== null) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  get() {
    return this.http.get<Smax[]>(`${this.apiUrl}/smax-api/show`);
  }

  create(smax: CreateOrUpdateSmax) {
    return this.http.post('http://localhost:3000/smax-api/create', smax);
  }

  // create(smax: CreateOrUpdateSmax) {
  //   // Lấy id từ currentUser
  //   const id = this.currentUser?.id;

  //   // Kiểm tra xem có currentUser và id không rỗng
  //   if (!this.currentUser || !id) {
  //     console.error(
  //       'No user information found in localStorage or missing user id.'
  //     );
  //     return;
  //   }

  //   // Tạo header với Authorization Bearer token
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.currentUser.access_token}`,
  //   });

  //   // Gửi yêu cầu POST đến backend với smax và id
  //   return this.http.post('http://localhost:3000/smax-api/create', smax, {
  //     headers,
  //     params: { id },
  //   });
  // }

  getById(id: string) {
    return this.http.get<Smax>(`http://localhost:3000/smax-api/${id}`);
  }

  update(id: string, smax: CreateOrUpdateSmax) {
    return this.http.put<Smax>(`http://localhost:3000/smax-api/${id}`, smax);
  }

  delete(id: string) {
    return this.http.delete<Smax>(`http://localhost:3000/smax-api/${id}`);
  }
}
