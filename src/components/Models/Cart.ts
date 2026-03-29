import { IProduct } from "../../types/index";

export class Cart {
  private cartProducts: IProduct[] = []; //поле для хранения массива товаров, выбранных покупателем для покупки

  //Получение массива товаров, которые находятся в корзине
  get cartProductsGet(): IProduct[] {
    return [...this.cartProducts];
  }

  //Добавление товара, который был получен в параметре, в массив корзины
  addProductToCart(product: IProduct): void {
    this.cartProducts.push(product);
  }

  //Удаление товара, полученного в параметре, из массива корзины
  deleteCartProduct(product: IProduct): void {
    this.cartProducts = this.cartProducts.filter(
      (item) => item.id !== product.id,
    );
  }

  //Очистка корзины
  clearCart(): void {
    this.cartProducts = [];
  }

  //Получение стоимости всех товаров в корзине
  getTotalCost(): number {
    const totalCost = this.cartProducts.reduce(
      (acc, product) => acc + (product.price ?? 0),
      0,
    );
    return totalCost;
  }

  //Получение количества товаров в корзине
  getTotalQuantity(): number {
    if (this.cartProducts.length === 0) {
      return 0;
    }
    return this.cartProducts.length;
  }

  //Проверка наличия товара в корзине по его id, полученному в параметре
  checkProductById(id: string): boolean {
    const hasProduct = this.cartProducts.some((product) => {
      return product.id === id
    })
    return hasProduct
  }
}
