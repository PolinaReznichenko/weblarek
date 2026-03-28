import { IProduct } from '../../../types/index';

export class Cart {
    private _cartProducts: IProduct[] = [];  //поле для хранения массива товаров, выбранных покупателем для покупки

    //Получение массива товаров, которые находятся в корзине
    get cartProducts(): IProduct[] {
        return [...this._cartProducts]
    }

    //Добавление товара, который был получен в параметре, в массив корзины
    addProductToCart(product: IProduct): void {
        if(!product) {
            throw new Error("Не выбран товар, который нужно добавить в корзину");
        }
        this._cartProducts.push(product)
    }

    //Удаление товара, полученного в параметре, из массива корзины
    deleteCartProduct(product: IProduct): void {
        if(!product) {
            throw new Error("Нечего удалять");
        }
        this._cartProducts = this._cartProducts.filter(item => item.id !== product.id);
    }

    //Очистка корзины
    clearCart(): void {
        this._cartProducts = [];
    }

    //Получение стоимости всех товаров в корзине
    getTotalCost(): number {
        if(this._cartProducts.length === 0) {
            throw new Error("В корзине нет товаров");
        }
        const totalCost = this._cartProducts.reduce((acc, product) => acc + (product.price ?? 0), 0)
        return totalCost
    }

    //Получение количества товаров в корзине
    getTotalQuantity(): number {
        if(this._cartProducts.length === 0) {
            return 0
        } 
        return this._cartProducts.length
    }

    //Проверка наличия товара в корзине по его id, полученного в параметре
    checkProductById(id: string): IProduct | undefined {
        const product = this._cartProducts.find(product => product.id === id);
        return product
    }
}