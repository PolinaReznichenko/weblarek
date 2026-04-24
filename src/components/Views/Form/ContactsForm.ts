import {  ensureElement } from '../../../utils/utils';
import {  Form } from '../../Views/Form/Form';
import {  IBuyer } from '../../../types/index';
import {  IEvents } from '../../base/Events';

type TContactsForm = Pick<IBuyer, 'email' | 'phone'>;

export class ContactsForm extends Form<TContactsForm> {
    protected emailInput: HTMLInputElement;  //элемент инпута формы, отвечающего за емэйл покупателя
    protected phoneInput: HTMLInputElement;  //элемент инпута формы, отвечающего за номере телефона покупателя

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);  //вызов родительского конструктора

        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
    }

    //Устанавливает емэйл покупателя в инпут
    set email(value: string) {
        this.emailInput.value = value;
    }

    //Устанавливает номер телефона покупателя в инпут
    set phone(value: string) {
        this.phoneInput.value = value;
    }

    //Очищает все поля формы
    resetForm(): void {
        this.emailInput.value = '';
        this.phoneInput.value = '';
        this.disabledButton = true;
        this.error = '';
    }
}