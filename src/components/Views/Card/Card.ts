import {  Component } from '../../base/Component';
import {  ensureElement } from '../../../utils/utils';

interface ICard {
    title: string;
    price: number;
}

export abstract class Card<T> extends Component<ICard & T> {
    protected titleElement: HTMLElement;  //элемент, содержащий название товара
    protected priceElement: HTMLElement;  //элемент, содержащий стоимость товара

    constructor(container: HTMLElement) {
            super(container);  //вызов родительского конструктора
    
            this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
            this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    //Устанавливает название товара для карточки
    set title(value: string) {
        this.titleElement.textContent = value;
    }

    //Устанавливает стоимость товара для карточки
    set price(value: number) {
        this.priceElement.textContent = value ? `${String(value)} синапсов` : 'Бесценно';
    }
}