import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClientInterface } from '../interfaces/client.interface';
import { NotificationErrorService } from './notification-error.service';
import { Observable, EMPTY, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    isShowButton$ = new BehaviorSubject(true);

    constructor(private http: HttpClient, private notificationErrorService: NotificationErrorService) {}

    getTask$(id: string): Observable<ClientInterface> {
        const url = `https://5bfff0a00296210013dc7e82.mockapi.io/test/user-info/${id}`;

        return this.http.get<ClientInterface>(url).pipe(
            catchError((error: HttpErrorResponse) => {
                this.notificationErrorService.openSnackBarError(error.message);
                this.setIsShowButton(true);

                return EMPTY;
            }),
        );
    }

    setIsShowButton(flag: boolean): void {
        this.isShowButton$.next(flag);
    }
}
