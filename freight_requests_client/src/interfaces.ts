export interface FrReqCreate {
  client_brand: string;
  freighter_name: string;
  phone: string;
  ati: string;
  comment?: string;  
}

export interface FrReqUpdate extends FrReqCreate {
  status: string;
  id: number;  
}

export interface FrReqRender extends FrReqUpdate {  
  timestamp: string | Date;
  updateBtn: JSX.Element;
  deleteBtn: JSX.Element; 
}
