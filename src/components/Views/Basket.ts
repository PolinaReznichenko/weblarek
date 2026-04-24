import {  ensureElement } from '../../utils/utils';
import {  Component } from '../base/Component';
import {  IEvents } from '../base/Events';

interface IBasket {
    cardList: HTMLElement[];
    basketTotal: number;
}

export class Basket extends Component<IBasket> {
    protected cardListElement: HTMLUListElement;  //элемент списка товаров в корзине
    protected processButton: HTMLButtonElement;  //элемент кнопки, которая открывает модальное окно с формой оформления товара
    protected basketPriceElement: HTMLElement;  //элемент, содержащий информацию об итоговой стоимости всех товаров в корзине

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);  //вызов родительского конструктора

        this.cardListElement = ensureElement<HTMLUListElement>('.basket__list', this.container);
        this.processButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
        this.basketPriceElement = ensureElement<HTMLElement>('.basket__price', this.container);

        this.processButton.addEventListener('click', () => {
            this.events.emit('basket:makeOrder');
        })
    }

    //Добавляет массив карточек товаров в корзину
    set cardList(items: HTMLElement[]) {
        this.cardListElement.replaceChildren(...items);
    }

    //Устанавливает итоговую стоимость всех выбранных товаров
    set basketTotal(value: number) {
        const total = String(value);  //нужно ли или можно число?
        this.basketPriceElement.textContent = `${total} синапсов`;
    }
}