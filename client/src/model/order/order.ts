export interface IOrderedCar {
  car: string;
  totalDays: number;
  totalPrice: number;
}

export interface IOrder {
  email: string;
  phone: string;
  comment: string | null;
  dateStart: string;
  dateEnd: string;
  orderedCar: IOrderedCar;
}

export interface IOrderResponse extends IOrder {
  _id: string;
  owner: string;
  message?: string;
}
