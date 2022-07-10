import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { User } from './account';
import { map,tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'http://localhost:1234/users'

  constructor(private httpClient: HttpClient) { }

  // void => Hero[]
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // void => Observable<Hero[]>
  // getHeroes(): Observable<User[]> {
    // return of(HEROES).pipe(delay(500));
    // return throwError(() => ({ status: 404, message: 'Not found' }));
    // return this.httpClient
      // .get<User[]>(this.baseUrl)
  // }

  getHeroes(): Observable<User[]> {
    // return of(HEROES).pipe(delay(500));
    // return throwError(() => ({ status: 404, message: 'Not found' }));
    return this.httpClient.get<User[]>(this.baseUrl).pipe(
      map((data) => {
        console.log("mydata",data)
         //You can perform some transformation here
         return data;
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    )
  }

  // id: number => hero: Observable<Hero>
  getHero(email: string): Observable<User> {
    // const hero = HEROES.find(hero => hero.id === id)!;
    // return of(hero);
    return this.httpClient
      .get<User>(this.baseUrl + '/' + email)
  }

  updateHero(hero: User): Observable<User> {
    return this.httpClient
      .put<User>(this.baseUrl + '/' + hero.Email, hero);  /////////////////////
  }

  addNewHero(hero: User): Observable<User> {
    return this.httpClient
      .post<User>(this.baseUrl, hero);
  }

  deleteHero(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(this.baseUrl + '/' + id);
  }

  searchHero(term: string): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.baseUrl + '?q=' + term)
  }

}