import {  ensureElement } from '../../utils/utils';
import {  Component } from '../base/Component';

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    protected modalButton: HTMLButtonElement;  //элемент кнопки, отвечающей за закрытие модального окна
    protected modalContent: HTMLElement;  //элемент, внутрь которого можно разместить элемент - содержимое блока модального окна

    constructor(container: HTMLElement) {
        super(container);  //вызов родительского конструктора

        this.modalButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);

        //Обработчик закрытия модального окна по клику на иконку «Закрыть» (крестик)
        this.modalButton.addEventListener('click', () => this.close());

        //Обработчик закрытия модального окна по клику вне модального окна 
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.close();
            }
        })
    }

    //Устанавливает содержимое внутрь модального окна
    set content(value: HTMLElement) {
        this.modalContent.replaceChildren(value);
    }

    //Открытие модального окна, при котором в него вставляется элемент с содержимым и устанавливается запрет на скролл модалки
    open(content: HTMLElement): void {
        this.content = content;
        this.container.classList.add('modal_active');
    }

    //Закрытие модального окна и очистка содержимого
    close(): void {
        this.modalContent.replaceChildren();
        this.container.classList.remove('modal_active');
    }
}