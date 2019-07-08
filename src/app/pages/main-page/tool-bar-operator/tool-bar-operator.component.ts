import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SideBarService } from '../../../services/side-bar.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'app-tool-bar-operator',
    templateUrl: './tool-bar-operator.component.html',
    styleUrls: ['./tool-bar-operator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolBarOperatorComponent implements OnInit {
    public sideWorks = false;

    constructor(private sideBarService: SideBarService) {}

    ngOnInit() {}

    sideBarToggle(): void {
        this.sideWorks = !this.sideWorks;
        this.sideBarService.sideWorks$.next(this.sideWorks);
    }
}