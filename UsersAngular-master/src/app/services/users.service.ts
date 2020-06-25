import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = 'http://localhost:3000/users/';
  constructor(private http : HttpClient) { }

  uploadFile(formData) {
    // let urlAPI = 'http://localhost:3000/api/upload';
    let urlAPI = 'http://localhost:3000/uploadFile';
    console.log('uploadFile');
    console.log(formData);
    return this.http.post(urlAPI, formData);
  }

  listar() {
    return this.http.get(this.url + 'listar');
  }

  new(user) {
    return this.http.post(this.url, user);
  }

  update(user) {
    return this.http.put(this.url + 'userProfilePicture', user);
  }

  delete(user_id) {
    return this.http.delete(this.url + user_id);
  }
}
