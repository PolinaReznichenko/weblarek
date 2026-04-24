import { IProduct } from "../../types/index";
import {  IEvents } from '../../components/base/Events';

export class Products {
  private products: IProduct[] = []; //поле для хранения массива всех товаров
  private product: IProduct | null = null; //поле для хранения товара, выбранного для подробного отображения

  constructor(protected events: IEvents) {}

  //Сохранение массива товаров, полученного в параметрах
  set productsSet(products: IProduct[]) {
    this.products = products;
    this.events.emit('products:changed')
  }

  //Получение массива товаров из модели
  get productsGet(): IProduct[] {
    return [...this.products];
  }

  //Получение одного товара по его id
  getProductById(id: string): IProduct | undefined {
    const product = this.products.find((product) => product.id === id);
    return product;
  }

  //Cохранение выбранного товара, полученного в параметре, для подробного отображения
  set productSet(product: IProduct) {
    this.product = product;
    this.events.emit('selectProduct:changed')
  }

  //Получение выбранного товара для подробного отображения
  get productGet(): IProduct | null {
    return this.product ? { ...this.product } : null;
  }
}
