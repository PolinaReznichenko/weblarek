import { ICardActions } from "../../../types/index";
import { ensureElement } from "../../../utils/utils";
import { Card } from "../../Views/Card/Card";

interface IBasketCard {
  index: number;
}

export class BasketCard extends Card<IBasketCard> {
  protected cardIndexElement: HTMLElement; //элемент, содержащий порядковый номер карточки товара в списке корзины
  protected deleteButton: HTMLButtonElement; //элемент кнопки, которая которая удаляет карточку товара из корзины

  constructor(container: HTMLElement, actions?: ICardActions) {   //передается обработчик (функция) с эмитом события с данными
    super(container); //вызов родительского конструктора

    this.cardIndexElement = ensureElement<HTMLElement>(".basket__item-index", this.container);
    this.deleteButton = ensureElement<HTMLButtonElement>(".basket__item-delete", this.container);

    if (actions?.onClick) {
      this.deleteButton.addEventListener("click", actions.onClick); //вызывается обработчик после клика
    }
  }

  //Устанавливает порядковый номер карточки товара в списке корзины
  set index(value: number) {
    this.cardIndexElement.textContent = String(value);
  }
}
