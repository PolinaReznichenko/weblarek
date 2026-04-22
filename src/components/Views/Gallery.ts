import {  ensureElement } from '../../utils/utils';
import {  Component } from '../base/Component';

interface IGalleryData {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> {
    protected catalogElement: HTMLElement;  //элемент, который представляет блок каталога с карточками товаров

    constructor(container: HTMLElement) {
        super(container);  //вызов родительского конструктора

        this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container);
    }

    //Добавляет массив карточек товаров в галерею
    set catalog(items: HTMLElement[]) {
        items.forEach(item => {
            this.catalogElement.appendChild(item);
        })
    }
}