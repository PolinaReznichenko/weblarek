import {  ensureElement } from '../../../utils/utils';
import {  FullCard } from '../../Views/Card/FullCard';
import {  IEvents } from '../../base/Events';
import { IProduct } from '../../../types/index';

type TPreviewCard = Pick<IProduct, 'description' | 'price'>;

export class PreviewCard extends FullCard<TPreviewCard> {
    protected descriptionElement: HTMLElement;  //элемент, содержащий подробное описание товара в карточке
    protected cardButton: HTMLButtonElement;  //элемент кнопки, которая либо добавляет товар в корзину, либо удаляет его из корзины, или указывает на невозможность покупки

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);  //вызов родительского конструктора

        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.cardButton.addEventListener('click', () => {
            this.events.emit('card:add');
        })
    }

    //Добавляет детальное описание товара для карточки
    set description(value: string) {
        this.descriptionElement.textContent = value;
    }

    //Если у товара нет цены, кнопка в карточке блокируется и меняет название
    set price(value: number | null) {
        if (value && typeof value === "number") {
            this.priceElement.textContent = `${String(value)} синапсов`;
        } else {
            this.priceElement.textContent = `Бесценно`;
            this.cardButton.disabled = true;
            this.cardButton.textContent = 'Недоступно';
        }
    }
}