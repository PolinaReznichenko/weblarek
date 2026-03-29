import "./scss/styles.scss";
import { apiProducts } from "./utils/data";
import { Products } from "./components/Models/Products";
import { Cart } from "./components/Models/Cart";
import { Buyer } from "./components/Models/Buyer";
import { ApiCommunication } from "./components/Communication/ApiCommunication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";

const productsModel = new Products(); //Объект - экземпляр класса Products
const cartModel = new Cart(); //Объект - экземпляр класса Cart
const buyerModel = new Buyer(); //Объект - экземпляр класса Buyer

//Проверка работы классов с локальными данными
function checkMethods() {
  // Методы класса Products
  //Сохранение массива товаров
  productsModel.productsSet = apiProducts.items;
  //Получение массива товаров
  console.log("Массив товаров из каталога: ", productsModel.productsGet);
  //Получение одного товара по его id
  const productById = productsModel.getProductById("b06cde61-912f-4663-9751-09956c0eed67");
  console.log("Получение одного товара по его id: ", productById);
  //Cохранение и получение выбранного товара для подробного отображения
  productsModel.productSet = apiProducts.items[3];
  console.log("Выбранный товар из каталога: ", productsModel.productGet);

  //Методы класса Cart
  //Добавление товара в массив корзины
  cartModel.addProductToCart(apiProducts.items[1]);
  cartModel.addProductToCart(apiProducts.items[3]);
  //Получение массива товаров, которые находятся в корзине
  console.log("Массив товаров из корзины: ", cartModel.cartProductsGet);
  //Получение стоимости всех товаров в корзине
  console.log("Стоимость всех товаров в корзине: ", cartModel.getTotalCost());
  //Получение количества товаров в корзине
  console.log("Общее количество товаров в корзине: ", cartModel.getTotalQuantity());
  //Удаление товара из массива корзины
  cartModel.deleteCartProduct(apiProducts.items[1]);
  console.log("Удаление товара из массива корзины: ", cartModel.cartProductsGet);
  //Проверка наличия товара в корзине по его id
  const checkId = cartModel.checkProductById("412bcf81-7e75-4e70-bdb9-d3c73c9803b7");
  console.log("Проверка наличия искомого товара в корзине: ", checkId);
  //Очистка корзины
  cartModel.clearCart();
  console.log("Очистка корзины: ", cartModel.cartProductsGet);

  //Методы класса Buyer
  //Сохранение данных о виде оплаты
  buyerModel.paymentSet = "cash";
  //Сохранение данных о email
  buyerModel.emailSet = "dog@mail.ru";
  //Сохранение данных  о номере телефона
  buyerModel.phoneSet = "35-36-37";
  //Сохранение данных об адреcе
  buyerModel.addressSet = "Milan";
  //Получение всех данных покупателя
  console.log("Данные покупателя: ", buyerModel.buyerData);
  //Проверка данных покупателя на валидность
  buyerModel.paymentSet = "";
  buyerModel.addressSet = "";
  const validate = buyerModel.validateBuyerData();
  console.log("Проверка введенных данных: ", validate);
  //Очистка данных покупателя
  buyerModel.clearBuyerData();
  console.log("Очистка данных покупателя: ", buyerModel.buyerData);
}

checkMethods();

//Загрузка данных с сервера
const api = new Api(API_URL);              // объект - экземпляр класса Api, который принимает адрес нужного сервера без эндпоинта
const appApi = new ApiCommunication(api);  // объект - экземпляр класса ApiCommunication, который принимает объект api для более конкретного обращения к серверу

async function loadProductsByApi() {       // функция для загрузки данных о товарах с сервера и сохранения полученного массива товаров
  try {
    const response = await appApi.getProducts();
    if (response && Array.isArray(response.items)) {
      const productsArr = response.items;
      productsModel.productsSet = productsArr;  //cохранение массива товаров от сервера
      console.log("Каталог товаров, полученный с сервера: ", productsModel.productsGet);  //получение массива товаров
    }
  } catch (error) {
    console.error("Произошла ошибка загрузки данных", error);
  }
}

await loadProductsByApi(); //дожидаемся выполнения функции,чтобы можно было применять методы классов
