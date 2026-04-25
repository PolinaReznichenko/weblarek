import {  Component } from '../../base/Component';
import {  ensureElement, ensureAllElements } from '../../../utils/utils';
import {  IEvents } from '../../base/Events';

interface IForm {
    disabledButton: boolean;
    error?: string;
}

export abstract class Form<T> extends Component<IForm & T> {
    protected submitButton: HTMLButtonElement;  //элемент кнопки, отправляющей данные о заказе на сервер
    protected errorElement: HTMLElement;  //элемент, содержащий текст ошибки заполения формы
    protected inputElements: HTMLInputElement[]; //массив элементов инпутов, необходимых для установки на каждый из них слушателя событий

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);  //вызов родительского конструктора
    
        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
        this.errorElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.inputElements = ensureAllElements<HTMLInputElement>('.form__input', this.container)

        //Слушатель отправки данных, сабмита формы (order:submit или contacts:submit). Нужно, чтобы переключиться на вторую форму (контакты) или отправлять данные заказа на сервер
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            this.events.emit(`${this.container.getAttribute('name')}:submit`);
        });

        //Слушатель событий на всех полях ввода формы (order:input или contacts:input) с данными о поле ввода и его значении.
        //Нужно, чтобы проверять на пустоту адрес/емэйл/телефон и активировать/блокировать кнопку, показывать ошибки
        this.inputElements.forEach(input => {
            input.addEventListener('input', () => {
                this.events.emit(`${this.container.getAttribute('name')}:input`, {
                    field: (input as HTMLInputElement).name,
                    value: (input as HTMLInputElement).value
                })
            })
        })
    }

    //Делает кнопку активной или блокирует ее
    set disabledButton(disabled: boolean) {
        this.submitButton.disabled = disabled;
    }
    
    //Добавляет текст ошибки, если поле не заполнено
    set error(message: string) {
        this.errorElement.textContent = message;
    }
}