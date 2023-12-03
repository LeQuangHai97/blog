import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Smax } from './smax';
import { CreateOrUpdateSmax } from './create-or-update-smax';

@Injectable({
  providedIn: 'root'
})
export class SmaxService {

  constructor(private http:HttpClient) {}

  get(){
    return this.http.get<Smax[]>('http://localhost:3000/smax-api');
  }

  create(smax:CreateOrUpdateSmax) {
    return this.http.post("http://localhost:3000/smax-api",smax);
  }

  getById(id:string) {
    return this.http.get<Smax>(
      `http://localhost:3000/smax-api/${id}`
      );
  }

  update(id:string, smax:CreateOrUpdateSmax) {
    return this.http.put<Smax>(`http://localhost:3000/smax-api/${id}`,smax);
  }

  delete(id:string) {
    return this.http.delete<Smax>(`http://localhost:3000/smax-api/${id}`);
  }
}
