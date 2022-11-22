export interface ICar {
  id?: string;
  brand: string;
  model: string;
  year: string;
  engineDisplacement: string;
  transmission: string;
  fuel: string;
  vehicleClass: string;
  bodyType: string;
  price: string;
  imageURL: string;
}

export interface ICarResponse extends ICar {
  _id: string;
  message?: string;
}
