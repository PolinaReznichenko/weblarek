import {  ensureElement } from '../../utils/utils';
import {  Component } from '../base/Component';
import {  IEvents } from '../base/Events';

interface IOrderSuccess {
    totalPrice: number;
}

export class OrderSuccess extends Component<IOrderSuccess> {
    protected totalElement: HTMLElement;  //элемент, содержащий информацию о списанной сумме
    protected successButton: HTMLButtonElement;  //элемент кнопки, которая возвращает к галерее товаров

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);  //вызов родительского конструктора

        this.totalElement = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.successButton.addEventListener('click', () => {
            this.events.emit('orderSuccess:close');
        })
    }

    //Устанавливает итоговую сумму покупки
    set totalPrice(value: number) {
        const total = String(value);  //нужно ли или можно число?
        this.totalElement.textContent = `Списано ${total} синапсов`;
    }
}