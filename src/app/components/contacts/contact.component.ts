import { Component, ChangeDetectionStrategy, OnInit, Input, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactInterface } from 'src/app/interfaces/contact.interface';
import { ContactsFormControlEnum } from './form-contact-enum';
import { PHONE_TYPES } from './phone-types';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit, AfterViewInit {
    public clientContactsForm: FormGroup;
    public phoneTypes = PHONE_TYPES;
    public contactsFormControlEnum: typeof ContactsFormControlEnum = ContactsFormControlEnum;
    el: ElementRef;
    @Input() contact: ContactInterface;

    constructor(private readonly formBuilder: FormBuilder, el: ElementRef) {
        this.el = el;
    }

    ngOnInit(): void {
        this.initContactsForm();
    }

    ngAfterViewInit(): void {
        const style1 = {
            borderRadius: '0px 4px 4px 0px',
        };
         let elem = this.el.nativeElement.querySelector('.phone-field').lastChild.children[0];
        
         elem.style.borderRadius = style1.borderRadius ;
    }

    public makeCall(): void {
        // console.log(`Звонок на номер ${this.contact.phone}`);
    }

    private initContactsForm(): void {
        const form = {
            [this.contactsFormControlEnum.PHONE]: [this.contact.phone, [Validators.required]],
            [this.contactsFormControlEnum.CLIENT_NAME]: [
                `${this.contact.firstName} ${this.contact.lastName}`,
                [Validators.required],
            ],
            [this.contactsFormControlEnum.PHONE_TYPE]: [this.contact.phoneType, [Validators.required]],
            [this.contactsFormControlEnum.CONTACTS_TYPE]: [this.contact.departament, [Validators.required]],
            [this.contactsFormControlEnum.COMMENT]: [this.contact.description, [Validators.required]],
        };

        this.clientContactsForm = this.formBuilder.group(form);
    }
}