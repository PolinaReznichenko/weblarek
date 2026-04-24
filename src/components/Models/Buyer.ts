import { TPayment, IBuyer, IBuyerValidateErr } from "../../types/index";
import {  IEvents } from '../../components/base/Events';

export class Buyer {
  private payment: TPayment = "";   //поле для хранения данных о виде оплаты
  private email: string = "";       //поле для хранения данных о email
  private phone: string = "";       //поле для хранения данных о номере телефона
  private address: string = "";     //поле для хранения данных об адреcе доставки

 constructor(protected events: IEvents) {}

  //Сохранение данных о виде оплаты, которые передаются в параметре, в модели
  set paymentSet(value: TPayment) {
    this.payment = value;
    this.events.emit('buyerData:changed')
  }

  //Сохранение данных о email в модели
  set emailSet(value: string) {
    this.email = value;
    this.events.emit('buyerData:changed')
  }

  //Сохранение данных  о номере телефона в модели
  set phoneSet(value: string) {
    this.phone = value;
    this.events.emit('buyerData:changed')
  }

  //Сохранение данных об адреcе в модели
  set addressSet(value: string) {
    this.address = value;
    this.events.emit('buyerData:changed')
  }

  //Получение всех данных покупателя в виде объекта, соответствующего интерфейсу IBuyer
  get buyerData(): IBuyer {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
    };
  }

  //Очистка данных покупателя
  clearBuyerData(): void {
    this.payment = "";
    this.email = "";
    this.phone = "";
    this.address = "";
    this.events.emit('buyerData:changed')
  }

  //Проверка данных покупателя на валидность. Результат - объект, относящийся к интерфейсу IBuyerValidateErr. В объекте присутствуют поля, соответствующие полям класса, значениями у которых является текст ошибки. Если поле не содержит ошибок, то такое свойство в объекте отсутствует
  validateBuyerData(): IBuyerValidateErr {
    const validateBuyer: IBuyerValidateErr = {};
    if (this.payment === "") {
      validateBuyer.payment = "Не выбран вид оплаты";
    }
    if (this.email === "") {
      validateBuyer.email = "Укажите емэйл";
    }
    if (this.phone === "") {
      validateBuyer.phone = "Укажите номер телефона";
    }
    if (this.address === "") {
      validateBuyer.address = "Укажите адрес доставки";
    }
    return validateBuyer;
  }
}
