import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ContactTabInterface } from '../../../interfaces/contact-tab.interface';
import { FormGroup } from '@angular/forms';
import { CallWidgetService } from '../../../services/call-widget.service';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
    selector: 'app-phone-number-form',
    templateUrl: './phone-number-form.component.html',
    styleUrls: ['./phone-number-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhoneNumberFormComponent implements OnInit, OnDestroy {
    @Input() contactForm: FormGroup;
    @Input() contact: ContactTabInterface;
    callStatus = false;
    statusOtherButtons = false;

    private contactId: number;
    private widgetSubscription: Subscription;

    constructor(private callWidgetService: CallWidgetService, private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.widgetSubscription = this.callWidgetService.callStatus$.subscribe((value: boolean) => {
            this.callStatus = value;
            this.changeDetectorRef.detectChanges();
        });
    }

    ngOnDestroy(): void {
        this.widgetSubscription.unsubscribe();
    }

    toggleCall(contact: ContactTabInterface): void {
        this.callStatus = !this.callStatus;
        this.callWidgetService.setCallStatus(this.callStatus);
        this.callWidgetService.setUserName(`${contact.firstName} + ${contact.lastName}`);
        this.callWidgetService.setPhoneNumber(this.contact.phone);
    }
}
