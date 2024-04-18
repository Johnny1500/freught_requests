export interface FrReqCreate {
  client_brand: string;
  freighter_name: string;
  phone: string;
  ati: string;
  comment?: string;  
}

export interface FrReqRender extends FrReqCreate {
  id: number;
  timestamp: string | Date; 
  status: string;  
  updateBtn: JSX.Element;
  deleteBtn: JSX.Element; 
}
