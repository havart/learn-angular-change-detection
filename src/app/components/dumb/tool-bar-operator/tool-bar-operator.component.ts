import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { SideBarService } from '../../../services/side-bar.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { USERNAME } from './tool-bar.constants';
import { Router } from '@angular/router';
import { TASK } from 'src/app/constants/path.constans';
import { CallWidgetService } from '../../../services/call-widget.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-tool-bar-operator',
    templateUrl: './tool-bar-operator.component.html',
    styleUrls: ['./tool-bar-operator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolBarOperatorComponent implements OnInit {
    userName: string;
    sideWorks: boolean;
    isShowUserMenu = false;
    isShowCallWidget$ = new BehaviorSubject<boolean>(false);

    constructor(
        private sideBarService: SideBarService,
        private localStorageService: LocalStorageService,
        private router: Router,
        private callWidgetService: CallWidgetService,
    ) {}

    ngOnInit(): void {
        this.userName = this.localStorageService.getUser()[USERNAME];
        this.callWidgetService.callStatus$.subscribe((value: boolean) => this.isShowCallWidget$.next(value));
    }

    sideBarToggle(): void {
        this.sideWorks = !this.sideWorks;
        this.sideBarService.sideWorks$.next(this.sideWorks);
    }

    redirectToTask(): void {
        this.router.navigate([TASK]);
    }

    showUserMenu(flag: boolean): void {
        this.isShowUserMenu = flag;
    }
}
