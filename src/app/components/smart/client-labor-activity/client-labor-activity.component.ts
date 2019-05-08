import { Component, OnInit } from '@angular/core';
import { ClientInfoService } from 'src/app/services/clientInfoService/client-info.service';
import { Observable } from 'rxjs';
import { ILabor } from 'src/app/interfaces/labor.interface';

@Component({
    selector: 'app-client-labor-activity',
    templateUrl: './client-labor-activity.component.html',
    styleUrls: ['./client-labor-activity.component.scss'],
})
export class ClientLaborActivityComponent implements OnInit {
    client$: Observable<ILabor>;
    clientId: string;

    constructor(private clientInfoService: ClientInfoService) {}
    ngOnInit() {
        this.clientId = '2';
        this.client$ = this.clientInfoService.getLaborById$(this.clientId);
    }
}