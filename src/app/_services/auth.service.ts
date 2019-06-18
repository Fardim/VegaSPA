import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _idToken: string;
    private _accessToken: string;
    private _expiresAt: number;
    userProfile: any;

    auth0 = new auth0.WebAuth({
        clientID: 'OhzH9liVelar07cP9pxu0qyFUUlekP2u',
        domain: 'vegafk.auth0.com',
        responseType: 'token id_token',
        redirectUri: 'http://localhost:4200/callback',
        audience: 'https://api.vega.com',
        scope: 'openid profile email',
        additionalSignUpFields: [
            {
                name: 'name',
                placeholder: 'Name'
            }
        ]
    });

    constructor(public router: Router) {
        this._idToken = '';
        this._accessToken = '';
        this._expiresAt = 0;
    }

    get accessToken(): string {
        return this._accessToken;
    }

    get idToken(): string {
        return this._idToken;
    }

    public login(): void {
        this.auth0.authorize();
    }

    public handleAuthentication(): void {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.localLogin(authResult);
                this.router.navigate(['/vehicles']);
            } else if (err) {
                this.router.navigate(['/vehicles']);
                console.log(err);
            }
        });
    }

    private localLogin(authResult): void {
        console.log('authResult', authResult);
        // Set the time that the Access Token will expire at
        const expiresAt = authResult.expiresIn * 1000 + Date.now();
        this._accessToken = authResult.accessToken;
        this._idToken = authResult.idToken;
        this._expiresAt = expiresAt;
        localStorage.setItem('expires_at', JSON.stringify(this._expiresAt));
    }

    public renewTokens(): void {
        this.auth0.checkSession({}, (err, authResult) => {
            console.log('renew', authResult);
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.localLogin(authResult);
            } else if (err) {
                alert(
                    `Could not get a new token (${err.error}: ${
                        err.error_description
                    }).`
                );
                this.logout();
            }
        });
    }

    public logout(): void {
        // Remove tokens and expiry time
        localStorage.removeItem('expires_at');
        this._accessToken = '';
        this._idToken = '';
        this._expiresAt = 0;

        this.auth0.logout({
            returnTo: window.location.origin
        });
    }

    public isAuthenticated(): boolean {
        // Check whether the current time is past the
        // access token's expiry time
        return this._accessToken && Date.now() < this._expiresAt;
    }

    public getProfile(cb): void {
        if (!this._accessToken) {
            throw new Error('Access Token must exist to fetch profile');
        }

        const self = this;
        this.auth0.client.userInfo(this._accessToken, (err, profile) => {
            if (profile) {
                self.userProfile = profile;
            }
            cb(err, profile);
        });
    }
}
