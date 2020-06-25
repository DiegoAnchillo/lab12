import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  uploadedFiles: Array < File > ;
  title = 'angular11';
  lista = null;
  user = {
    user_id: null,
    user_name: null,
    user_password: null,
    user_real_name: null,
    user_last_name: null,
    user_birthday: null
  }
  state = 1;

  constructor(private usersService: UsersService) {}

  fileChange(element) {
    console.log('fileChangexx');
    this.uploadedFiles = element.target.files;
  }
  upload() {
    console.log('uploadxxx');
    let formData = new FormData();
    console.log('uploadedFiles:');
    console.log(this.uploadedFiles);
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      console.log('Inicio FOR');
      // formData.append("file[]",this.uploadedFiles[0]);
      formData.append("file",
	    this.uploadedFiles[i],
      this.uploadedFiles[i].name);

    }
    console.log('formData:');
    console.log(formData);
    this.usersService.uploadFile(formData).subscribe((res)=> {
      console.log('response received is ', res);
    });
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersService.listar().subscribe(result => {
      this.lista = null;
      this.lista = result;
    });
  }

  new() {
    this.usersService.new(this.user).subscribe(result => {
      if (result == 'ok') {
        this.limpiar();
        this.getUsers();
      }
    });
  }

  update() {
    this.usersService.update(this.user).subscribe(result => {
      if (result) {
        this.limpiar();
        this.getUsers();
        this.state = 1;
      }
    })
  }

  delete(user_id) {
    if (!confirm("¿Está seguro de eliminar este registro?"))
      return;
    console.log(user_id);
    this.usersService.delete(user_id).subscribe(result => {
      if (result == 'ok') {
        this.getUsers();
      }
    });
  }

  editProfilePicture(user_id) {
    this.state = 2;
    this.user = {
      user_id: null,
      user_name: null,
      user_password: null,
      user_real_name: null,
      user_last_name: null,
      user_birthday: null
    }
    this.user.user_id = user_id;
  }

  createState() {
    this.state = 1;
    this.user = {
      user_id: null,
      user_name: null,
      user_password: null,
      user_real_name: null,
      user_last_name: null,
      user_birthday: null
    }
  }

  limpiar() {
    this.user = {
      user_id: null,
      user_name: null,
      user_password: null,
      user_real_name: null,
      user_last_name: null,
      user_birthday: null
    }
  }
}
