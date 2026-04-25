import "./scss/styles.scss";
import { Products } from "./components/Models/Products";
import { Cart } from "./components/Models/Cart";
import { Buyer } from "./components/Models/Buyer";
import { ApiCommunication } from "./components/Communication/ApiCommunication";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";
import { EventEmitter } from './components/base/Events';
import {  ensureElement } from './utils/utils';
import {  cloneTemplate } from './utils/utils';
import { IProduct } from "./types/index";
import { NonEmptyPayment } from "./types/index";
import { IOrderData } from "./types/index";
import { IOrderConfirm } from "./types/index";

import { Header } from './components/Views/Header';
import { Gallery } from './components/Views/Gallery';
import { Modal } from './components/Views/Modal';
import { Basket } from './components/Views/Basket';
import { OrderSuccess } from './components/Views/OrderSuccess';
import { BasketCard } from './components/Views/Card/BasketCard';
import { GalleryCard } from './components/Views/Card/GalleryCard';
import { PreviewCard } from './components/Views/Card/PreviewCard';
import { OrderForm } from './components/Views/Form/OrderForm';
import { ContactsForm } from './components/Views/Form/ContactsForm';

// ------------------------Создание экземпляров классов----------

const events = new EventEmitter(); //Объект - экземпляр класса EventEmitter - брокера событий

const productsModel = new Products(events); //Объект - экземпляр класса Products
const cartModel = new Cart(events); //Объект - экземпляр класса Cart
const buyerModel = new Buyer(events); //Объект - экземпляр класса Buyer

//Получаем шаблон блока разметки
const orderSuccessTemplate = ensureElement<HTMLTemplateElement>('#success');
const galleryCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const previewCardTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketCardTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');

//Создаем экземпляр класса, в параметре ищем контейнер (DOM-элемент) по селектору или клонируем шаблон
const header = new Header(ensureElement<HTMLElement>('.header'), events);
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'));
const modal = new Modal(ensureElement<HTMLElement>('.modal'));

const orderSuccess = new OrderSuccess(cloneTemplate(orderSuccessTemplate), events);
const previewCard = new PreviewCard(cloneTemplate(previewCardTemplate), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const orderForm = new OrderForm(cloneTemplate(orderFormTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsFormTemplate), events);

// ------------------------Загрузка данных с сервера----------

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

// ------------------------Презентер----------

//---обработчик события (подписка на событие) при изменении/загрузке данных, который перерисовывает галерею карточек. Внутри него при клике на карточку эмитится событие card:selected
events.on('products:changed', () => {
  // При каждом изменении товаров пересоздаются карточки каталога
  const itemCards = productsModel.productsGet.map((item) => {
    const card = new GalleryCard(cloneTemplate(galleryCardTemplate), {
      onClick: () => events.emit('card:selected', item)
    })
    return card.render(item);
  })

  gallery.render({ catalog: itemCards})
});

//Дожидаемся выполнения функции загрузки данных с сервера,чтобы можно было применять методы классов
await loadProductsByApi();

//---обработчик нажатия на кнопку открытия корзины
events.on('basket:open', () => {
    modal.open(basket.render());
    if(cartModel.getTotalQuantity() === 0) {
      basket.disabledProcessButton = true;
      basket.cardList = [];  //проверить, нужно ли
    }
});

//---обработчик изменения содержимого корзины. Внутри него при клике на кнопку удаления товара из корзины эмитится событие basket:cardDeleted
events.on('basket:changed', () => {
  // При каждом изменении содержимого корзины пересоздаются карточки
  const basketCardsArray = cartModel.cartProductsGet.map((item, index) => {
    const basketCard = new BasketCard(cloneTemplate(basketCardTemplate), {
      onClick: () => events.emit('basket:cardDeleted', item)
    });
    basketCard.index = index + 1;  //порядковый номер товара
    return basketCard.render(item)
  });
  if (cartModel.getTotalQuantity() === 0) {  //если нет товаров, то блокируем кнопку и вместо списка товаров выводится надпись «Корзина пуста»
    basket.disabledProcessButton = true;
    basket.cardList = [];
  } else {
    basket.disabledProcessButton = false;
    basket.cardList = basketCardsArray;  //добавляем массив карточек в блок корзины
  };
  header.counter = cartModel.getTotalQuantity();  //меняем значение счетчика товаров в шапке
  basket.basketTotal = cartModel.getTotalCost();  //меняем общую стоимость товаров
});

//---обработчик нажатия на кнопку удаления товара из корзины
events.on('basket:cardDeleted', (item: IProduct) => {
  cartModel.deleteCartProduct(item);
});

//---обработчик нажатия на карточку товара для детального просмотра
events.on('card:selected', (item: IProduct) => {
  productsModel.productSet = item;
});

//---произошло изменение выбранного для просмотра товара
events.on('selectProduct:changed', () => {
  const selectedProduct = productsModel.productGet;
  if(selectedProduct) {
    if (cartModel.checkProductById(selectedProduct.id) === true) {
      previewCard.buttonText = 'Удалить из корзины';
    } else {
      previewCard.buttonText = 'Купить';
    };
    const previewProduct = previewCard.render(selectedProduct);
    modal.open(previewProduct);
  };
});

//---обработчик нажатия на кнопку покупки/удаления товара в превью
events.on('card:add', () => {
  const selectedProduct = productsModel.productGet;
  if(selectedProduct) {
    if(cartModel.checkProductById(selectedProduct.id) === true) { //проверяем, есть ли выбранный товар в корзине
      cartModel.deleteCartProduct(selectedProduct);
    } else {
      cartModel.addProductToCart(selectedProduct);
    };
  };
  modal.close();
});

//---произошло изменение данных покупателя
events.on('buyerData:changed', () => {
  //устанавливаем модификатор выделения кнопки вида оплаты
  if(buyerModel.buyerData.payment !== '') {
    orderForm.selectedButton = buyerModel.buyerData.payment;
  };
  //устанавливаем адрес доставки товара в инпут
  orderForm.address = buyerModel.buyerData.address;
  //устанавливаем емэйл в инпут
  contactsForm.email = buyerModel.buyerData.email;
  //устанавливаем номер телефона в инпут
  contactsForm.phone = buyerModel.buyerData.phone;

  //если нет ошибок, выбран способ оплаты и поле адреса доставки непустое, то активируем кнопку
  if (buyerModel.validateBuyerData.length === 0 && buyerModel.buyerData.payment !== '' && buyerModel.buyerData.address !== '') {
    orderForm.disabledButton = false;
  } else {
    orderForm.disabledButton = true;
  };
  //если нет ошибок и поля почты и телефона непустые, то активируем кнопку
  if (buyerModel.validateBuyerData.length === 0 && buyerModel.buyerData.email !== '' && buyerModel.buyerData.phone !== '') {
    contactsForm.disabledButton = false;
  } else {
    contactsForm.disabledButton = true;
  };

  //если какое-то поле не заполнено, то появляется сообщение об ошибке
  orderForm.error = '';
  contactsForm.error = '';
  const errorMessages = buyerModel.validateBuyerData();
  if (errorMessages.payment) {
    orderForm.error = errorMessages.payment;
  } else if (errorMessages.address) {
    orderForm.error = errorMessages.address;
  } else if (errorMessages.email) {
    contactsForm.error = errorMessages.email;
  } else if (errorMessages.phone) {
    contactsForm.error = errorMessages.phone;
  };
});

//---обработчик нажатия на кнопку в корзине для перехода к оформлению заказа
events.on('basket:makeOrder', () => {
  modal.open(orderForm.render());
  orderForm.error = '';
});

//---обработчик нажатия на кнопку способа оплаты товар(а/ов)
events.on('orderButton:click', (data: { method: NonEmptyPayment }) => {
  buyerModel.paymentSet = data.method;
});

//---обработчик ввода данных в инпут адреса в форме Order
events.on('order:input', (data: {value: string}) => {
  buyerModel.addressSet = data.value;
});

//---обработчик нажатия на кнопку перехода ко второй форме оформления заказа
events.on('order:submit', () => {
  modal.open(contactsForm.render());
  contactsForm.error = '';
});

//---обработчик ввода данных в инпут емэйл или телефон в форме Contacts
events.on('contacts:input', (data: {field: string, value: string}) => {
  if (data.field === "phone") {
    buyerModel.phoneSet = data.value;
  };
  if (data.field === "email") {
    buyerModel.emailSet = data.value;
  }
});

//---обработчик нажатия на кнопку оплаты (завершение оформления заказа). Переход к окну подтверждения покупки
events.on('contacts:submit', async () => {
  //объект c данными о покупателе, выбранных товарах и итоговой стоимости
  const orderData: IOrderData = {
    ...buyerModel.buyerData,   // все поля из объекта с данными покупателя
    total: cartModel.getTotalCost(),   //общая стоимость всех товаров
    items: cartModel.cartProductsGet.map(product => product.id)  //массив id товаров из корзины
  };
  //отправляем данные заказа на сервер
    try {
      const sendOrder: IOrderConfirm = await appApi.sendOrder(orderData); //успешный ответ от сервера 
      //очищаем корзину
      cartModel.clearCart();
      //очищаем данные покупателя
      buyerModel.clearBuyerData();
      //устанавливаем сумму заказа, полученную от сервера, в окно с подтверждением
      orderSuccess.totalPrice = sendOrder.total;
      //переход в окно с подтверждением заказа
      modal.open(orderSuccess.render());
    } catch (error) {
      console.error("Произошла ошибка отправки данных", error);
      contactsForm.error = 'Произошла ошибка при оформлении заказа. Повторите попытку позже'
    }
});

//---обработчик нажатия на кнопку в окне подтверждения успешного оформления заказа и переход к каталогу товаров на главной странице сайта
events.on('orderSuccess:close', () => {
  modal.close();
});

