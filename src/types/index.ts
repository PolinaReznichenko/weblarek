export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
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
export type TPayment = 'card' | 'cash' | '';

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