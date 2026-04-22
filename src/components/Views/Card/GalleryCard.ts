import { ICardActions } from '../../../types/index';
import {  FullCard } from '../../Views/Card/FullCard';
import {  IFullCard } from '../../Views/Card/FullCard';

export class GalleryCard extends FullCard<IFullCard> {
    constructor(container: HTMLElement, actions?: ICardActions) {  //передается обработчик (функция) с эмитом события с данными
        super(container);  //вызов родительского конструктора

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick); //вызывается обработчик после клика
        }
    }
}