import {  Card } from '../../Views/Card/Card';
import {  ensureElement } from '../../../utils/utils';
import { categoryMap } from '../../../utils/constants'

type CategoryKey = keyof typeof categoryMap;

export interface IFullCard {
    category: string;
    image: string;
};

export abstract class FullCard<T> extends Card<IFullCard & T> {
    protected categoryElement: HTMLElement;  //элемент, содержащий название категории, к которой относится товар
    protected imageElement: HTMLImageElement;  //элемент изображения, в котором находятся данные об этом изображении

    constructor(container: HTMLElement) {
        super(container);  //вызов родительского конструктора
        
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    }

    //Устанавливает название категории товара и добавляет модификаторы для корректного отображения фона категорий
    set category(value: string) {
        this.categoryElement.textContent = value;

        for (const key in categoryMap) {
            this.categoryElement.classList.toggle(  //метод, который добавляет класс (первый параметр) к элементу, если второй параметр true. Если false, то удаляет класс, если был
                categoryMap[key as CategoryKey],    //получаем CSS-класс, соответствующий текущему ключу key
                key === value                       //проверяем, совпадает ли название категории со значением, которое хотим установить
            )
        }
    }

    //Устанавливает адрес изображения для отображения картинки в карточке
    set image(value: string) {
        this.setImage(this.imageElement, value, this.title);
    }
}