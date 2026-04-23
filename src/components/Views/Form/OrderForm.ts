import {  ensureElement, ensureAllElements } from '../../../utils/utils';
import {  Form } from '../../Views/Form/Form';
import {  TPayment } from '../../../types/index';
import {  IEvents } from '../../base/Events';

interface IOrderForm {  
  selectedButton: TPayment;
}

export class OrderForm extends Form<IOrderForm> {
    protected addressInput: HTMLInputElement;  //элемент инпута формы, отвечающего за адрес доставки
    protected orderButtons: HTMLButtonElement [];  //элемент кнопок, которые отвечают за вид оплаты

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);  //вызов родительского конструктора

        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
        this.orderButtons = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);

        this.orderButtons.forEach(button => {
            button.addEventListener('click', () => {
            this.events.emit('orderButton:click', { method: button.getAttribute('name') as TPayment });
            })
        })
    }

    //Устанавливает модификатор для выделения кнопки с выбранным видом оплаты
    set selectedButton(method: TPayment) {
        this.orderButtons.forEach(button => button.classList.remove('button_alt-active'));
        switch(method) {
            case '':
                break;
            case 'card':
                const cardButton = this.orderButtons.find(button => button.getAttribute('name') === 'card' );
                cardButton!.classList.add('button_alt-active');
                break;
            case 'cash':
                const cashButton = this.orderButtons.find(button => button.getAttribute('name') === 'cash' );
                cashButton!.classList.add('button_alt-active');
                break;
        }
    }

    //Очищает все поля формы
    resetForm(): void {
        this.orderButtons.forEach(button => button.classList.remove('button_alt-active'));
        this.addressInput.value = '';
        this.disabledButton = true;
        this.error = '';
    }
}