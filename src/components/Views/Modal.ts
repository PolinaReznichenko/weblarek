import {  ensureElement } from '../../utils/utils';
import {  Component } from '../base/Component';
import {  IEvents } from '../base/Events';

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    protected modalButton: HTMLButtonElement;  //элемент кнопки, отвечающей за закрытие модального окна
    protected modalContent: HTMLElement;  //элемент, внутрь которого можно разместить элемент - содержимое блока модального окна

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);  //вызов родительского конструктора

        this.modalButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);

        this.modalButton.addEventListener('click', () => {
            this.events.emit('modal:close');
        })
    }

    //Устанавливает содержимое внутрь модального окна
    set content(value: HTMLElement) {
        this.modalContent.appendChild(value);
    }
}