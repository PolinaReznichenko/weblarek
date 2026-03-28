import "./scss/styles.scss";
import { apiProducts } from "./utils/data";
import { Products } from "./components/base/Models/Products";
import { Cart } from "./components/base/Models/Cart";
import { Buyer } from "./components/base/Models/Buyer";

const productsModel = new Products();

productsModel.products = apiProducts.items;
console.log("Массив товаров из каталога: ", productsModel.products);

const productById = productsModel.getProductById(
  "b06cde61-912f-4663-9751-09956c0eed67",
);
console.log("Получение одного товара по его id: ", productById);

productsModel.product = apiProducts.items[3];
console.log("Товар из каталога: ", productsModel.product);

const cartModel = new Cart();

cartModel.addProductToCart(apiProducts.items[1]);
cartModel.addProductToCart(apiProducts.items[3]);
console.log("Массив товаров из корзины: ", cartModel.cartProducts);

console.log("Стоимость всех товаров в корзине: ", cartModel.getTotalCost());

console.log("Общее количества товаров в корзине: ", cartModel.getTotalQuantity());

cartModel.deleteCartProduct(apiProducts.items[1]);
console.log("Удаление товара из массива корзины: ", cartModel.cartProducts);

const checkId = cartModel.checkProductById(
  "412bcf81-7e75-4e70-bdb9-d3c73c9803b7",
);
console.log("Проверка наличия искомого товара в корзине: ", checkId);

cartModel.clearCart();
console.log("Очистка корзины: ", cartModel.cartProducts);

const buyerModel = new Buyer("cash", "dog@mail.ru", "35-36-37", "Milan");

buyerModel.payment = "card";
buyerModel.email = "";
buyerModel.phone = "35-36-37";
buyerModel.address = "";

console.log("Данные покупателя: ", buyerModel.buyerData);

const validate = buyerModel.validateBuyerData();
console.log("Проверка данных: ", validate);

buyerModel.clearBuyerData();
console.log("Очистка данных покупателя: ", buyerModel.buyerData);
