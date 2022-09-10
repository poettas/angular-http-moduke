import { Component, OnInit } from '@angular/core';
import { User } from './interface/user';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  users: User[] = [];
  title = 'angular-http-module';

  private user: any = {
    id: 3,
    name: 'Osweald Mow',
    username: 'SayWhat',
    email: 'whatever@mail.com',
  };

  constructor(private userServie: UserService) {}

  ngOnInit(): void {
    this.onGetUsers();
    //this.onGetUser();
    //this.onCreateUser();
    //this.onUpdateUser();
    //this.onUpdateSingleLineUser();
    //this.onDeleteUser();
  }
  onGetUsers(): void {
    this.userServie.getUsers().subscribe(
      (response) => {
        console.log(response);
        this.users = response;
      },
      (error: any) => console.log(error),
      () => console.log('Done getting users')
    );
  }

  onGetUser(): void {
    this.userServie.getUser().subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done getting user')
    );
  }

  onCreateUser(): void {
    this.userServie.createUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done creating user')
    );
  }

  onUpdateUser(): void {
    this.userServie.updateUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done updating user')
    );
  }

  onUpdateSingleLineUser(): void {
    this.userServie.updateSingleLineUser(this.user).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done updating single value of user')
    );
  }

  onDeleteUser(): void {
    this.userServie.deleteUser(5).subscribe(
      (response) => console.log(response),
      (error: any) => console.log(error),
      () => console.log('Done deleting user')
    );
  }
}
