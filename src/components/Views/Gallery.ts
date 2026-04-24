import {  Component } from '../base/Component';

interface IGalleryData {
    catalog: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> {
    protected catalogElement: HTMLElement;  //элемент, который представляет блок каталога с карточками товаров

    constructor(container: HTMLElement) {
        super(container);  //вызов родительского конструктора

        this.catalogElement = this.container;
    }

    //Добавляет массив карточек товаров в галерею
    set catalog(items: HTMLElement[]) {
        this.catalogElement.replaceChildren(...items);
    }
}