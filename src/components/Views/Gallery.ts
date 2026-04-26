import { Component } from "../base/Component";

interface IGalleryData {
  catalog: HTMLElement[];
}

export class Gallery extends Component<IGalleryData> {
  constructor(container: HTMLElement) {
    super(container); //вызов родительского конструктора
  }

  //Добавляет массив карточек товаров в галерею
  set catalog(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}
