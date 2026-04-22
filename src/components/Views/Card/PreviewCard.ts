import {  ensureElement } from '../../../utils/utils';
import {  FullCard } from '../../Views/Card/FullCard';
import {  IEvents } from '../../base/Events';

interface IPreviewCard {
    description: string;
}

export class PreviewCard extends FullCard<IPreviewCard> {
    protected descriptionElement: HTMLElement;  //элемент, содержащий подробное описание товара в карточке
    protected cardButton: HTMLButtonElement;  //элемент кнопки, которая либо добавляет товар в корзину, либо удаляет его из корзины, или указывает на невозможность покупки

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);  //вызов родительского конструктора

        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        this.cardButton.addEventListener('click', () => {
            this.events.emit('basketCards:changed');
        })
    }

    //Добавляет детальное описание товара для карточки
    set description(value: string) {
        this.descriptionElement.textContent = value;
    }
}