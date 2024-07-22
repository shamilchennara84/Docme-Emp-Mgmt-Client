export interface IDesignation {
  title: string;
  description: string;
}

export interface ILocation {
  address: string;
  city: string;
  country: string;
}

export interface IEmployee {
  _id: string;
  name: string;
  age: number;
  phone: string;
  employeeId: string;
  email: string;
  address: string;
  designationTitle: string;
  city: string;
}

export interface IEmployeesResponse {
  success: boolean;
  message: string;
  data: IEmployee[];
}
export interface IEmployeeResponse {
  success: boolean;
  message: string;
  data: IEmployee;
}


// -------------------------------------------------

export interface IDeleteEmployeeResponse {
  success: boolean;
  message: string;
  data?:IEmployee;

}

export interface ICreateEmployeeResponse {
  success: boolean;
  message: string;
  data?: IEmployee;
}