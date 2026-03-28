import { TPayment, IBuyer, IBuyerValidateErr } from '../../../types/index';

export class Buyer {
    private _payment: TPayment = ""  //поле для хранения данных о виде оплаты
    private _email: string = ""      //поле для хранения данных о email
    private _phone: string = ""      //поле для хранения данных о номере телефона
    private _address: string = ""    //поле для хранения данных об адреcе доставки

    constructor(payment: TPayment = "", email: string = "", phone: string = "", address: string = "") {
        this.payment = payment;   // сеттер вид оплаты
        this.email = email;       // сеттер емэйл
        this.phone = phone;       // сеттер телефон
        this.address = address;   // сеттер адрес
    }

    //Сохранение данных о виде оплаты, которые передаются в параметре, в модели
    set payment(value: TPayment) {
        this._payment = value;
    }

    //Сохранение данных о email в модели
    set email(value: string) {
        this._email = value;
    }

    //Сохранение данных  о номере телефона в модели
    set phone(value: string) {
        this._phone = value;
    }

    //Сохранение данных об адреcе в модели
    set address(value: string) {
        this._address = value;
    }

    //Получение всех данных покупателя в виде объекта, соответствующего интерфейсу IBuyer
    get buyerData(): IBuyer {
        return {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this._address
        }
    }

    //Очистка данных покупателя
    clearBuyerData(): void {
        this._payment = ""
        this._email = ""
        this._phone = ""
        this._address = ""
    }

    //Проверка данных покупателя на валидность. Результат - объект, относящийся к интерфейсу IBuyerValidateErr. В объекте присутствуют поля, соответствующие полям класса, значениями у которых является текст ошибки. Если поле не содержит ошибок, то такое свойство в объекте отсутствует
    validateBuyerData(): IBuyerValidateErr {
        const validateBuyer: IBuyerValidateErr = {};
        if(this._payment === "") {
             validateBuyer.payment = "Не выбран вид оплаты";
        }
        if(this._email === "") {
             validateBuyer.email = "Укажите емэйл";
        }
        if(this._phone === "") {
             validateBuyer.phone = "Укажите номер телефона";
        }
        if(this._address === "") {
             validateBuyer.address = "Укажите адрес доставки";
        }
        return validateBuyer
    }
}