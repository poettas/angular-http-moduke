import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { User } from '../interface/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private readonly defaultImage: string = 'https://robohash.org';
  constructor(private http: HttpClient) {}

  //the obserables are important to perform the actual api call

  //get an array of users with headers
  //normally, you would add the headers as asecond argument behind the url, but for some reason, it doesnt work
  //the same goes for the params, these are used to add specitif values to the url, to set stuff like below
  //getUsers(): Observable<User[]> {
  //const myHeaders = new HttpHeaders({ 'my header': 'testheader' });
  //let myParams = new HttpParams().set('page', '5').set('sort', 'true');
  //return this.http.get<User[]>(`${this.apiUrl}/users`, {
  //reportProgress: true,
  //  });
  //}

  //get Users with the combination of rxjs, to use them you have to "pipe" them to get a specific operator
  // you can do method chaining within the pipe
  //tap-operator + map-operator
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      //tap((users) => console.log(users)),
      map((users) =>
        users.map((user) => ({
          ...user,
          name: user.name.toUpperCase(),
          isAdmin: user.id === 10 ? 'admin' : 'not admin',
          image: `${this.defaultImage}/${user.username.toLowerCase()}`,
        }))
      )
    );
  }

  // get a single user
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/1`);
  }

  // create a new user and send it to the api with the payload
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  //put: all data have to be sent; patch: only the data, that is changing have to be sent
  //update a user by using put
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  //update a user by using patch
  updateSingleLineUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  //delete a user; unknown because we dont know what we are getting back from the api
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
