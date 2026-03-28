import { IProduct } from '../../../types/index';

export class Products {
    private _products: IProduct[] = [];          //поле для хранения массива всех товаров
    private _product: IProduct | null = null;    //поле для хранения товара, выбранного для подробного отображения

    //Сохранение массива товаров, полученного в параметрах
    set products(products: IProduct[]) {
        if(!products || !Array.isArray(products)) {
            throw new Error("Данные о товарах не были получены");
        }
        this._products = products;
    }

    //Получение массива товаров из модели
    get products(): IProduct[] {
        return [...this._products]
    }

    //Получение одного товара по его id
    getProductById(id: string): IProduct | undefined {
        const product = this._products.find(product => product.id === id);
        return product
    }

    //Cохранение товара, полученного в параметре, для подробного отображения
    set product(product: IProduct | null) {
        this._product = product;
    }

    //Получение товара для подробного отображения
    get product(): IProduct | null {
        return this._product ? {...this._product} : null
    }
}