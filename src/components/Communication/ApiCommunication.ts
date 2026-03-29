import { IApi } from "../../types/index";
import {
  IProductsResponse,
  IOrderData,
  IOrderConfirm,
} from "../../types/index";

export class ApiCommunication {
  private api: IApi; //поле для хранения объекта, реализующего интерфейс IApi (для выполнения запросов к серверу)

  constructor(apiObj: IApi) {
    this.api = apiObj;
  }

  //Делает get запрос на эндпоинт /product/ и возвращает объект, полученный от сервера, в котором находится массив товаров
  getProducts(): Promise<IProductsResponse> {
    const getPromise = this.api.get<IProductsResponse>("/product/");
    return getPromise;
  }

  //Делает post запрос  на эндпоинт /order/ и передаёт в него данные, полученные в параметрах метода, а возвращает объект, подтверждающий покупку на определенную сумму
  sendOrder(data: IOrderData): Promise<IOrderConfirm> {
    const postOrder = this.api.post<IOrderConfirm>("/order/", data, "POST");
    return postOrder;
  }
}
