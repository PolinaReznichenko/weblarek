import {  ensureElement } from '../../../utils/utils';
import {  Form } from '../../Views/Form/Form';
import {  IForm } from '../../Views/Form/Form';
import {  IEvents } from '../../base/Events';

export class ContactsForm extends Form<IForm> {
    protected emailInput: HTMLInputElement;  //элемент инпута формы, отвечающего за емэйл покупателя
    protected phoneInput: HTMLInputElement;  //элемент инпута формы, отвечающего за номере телефона покупателя

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);  //вызов родительского конструктора

        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
    }

    //Очищает все поля формы
    resetForm(): void {
        this.emailInput.value = '';
        this.phoneInput.value = '';
        this.disabledButton = true;
        this.error = '';
    }
}