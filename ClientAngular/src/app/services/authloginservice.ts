import {Injectable} from '@angular/core';
import{ HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import * as moment from "moment";

@Injectable()
export class AuthLoginService {
     
    constructor(private http: HttpClient) {
    }
      
    login(email:string, password:string ) {
        let options = {
            headers : new HttpHeaders().set("Content-Type","application/x-www-form-unrlencoded"),
            params : new HttpParams().set('email',email).set('pass',password)
        }
        return this.http.post('/api/login',options);
    }
    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}