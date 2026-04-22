export type ApiPostMethods = "POST" | "PUT" | "DELETE";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

//Данные о товаре (основной интерфейс)
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

//Тип данных способа оплаты товара
export type TPayment = "card" | "cash" | "";

//Данные о покупателе (основной интерфейс)
export interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

//Валидация данных. Ключи - поля класса Buyer, значения - текст ошибки
export interface IBuyerValidateErr {
  payment?: string;
  email?: string;
  phone?: string;
  address?: string;
}

//Данные о товарах, получаемые при ответе от сервера (GET)
export interface IProductsResponse {
  total: number;
  items: IProduct[];
}

//Данные о покупателе, выбранных товарах и итоговой смоимости, отправляемые на сервер (POST)
export interface IOrderData extends IBuyer {
  total: number;
  items: string[];
}

//Данные - ответ от сервера на отправленные нами данные о покупателе и товарах
export interface IOrderConfirm {
  id: string; //id заказа
  total: number; //покупка на сумму
}

export interface ICardActions {
  onClick: () => void;
}
