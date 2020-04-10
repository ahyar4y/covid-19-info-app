import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class PostProvider {
    server: string = 'http://localhost/Mobile%20Programming/server_api/';

    constructor(private httpClient: HttpClient) {

    }

    postData(body, file): Observable<any> {
        const type = 'application/json; charset=utf-8';
        const headers = new HttpHeaders({'Content-Type': type});

        return this.httpClient.post(this.server + file, JSON.stringify(body), {headers});
    }
}
