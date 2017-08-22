import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { ListUser } from './users.model';

@Injectable()
export class UsersService {

    constructor(
        private _http: Http,
    ) { }

    public getUsers(): Observable<ListUser[]> {
        let url = '//api.github.com/users';
        return this._http.get(url)
            .map((response: Response) => { 
                return response.json() });
    }
}