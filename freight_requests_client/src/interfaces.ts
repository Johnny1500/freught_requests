export interface FrReqRender {
    id: number;
    timestamp: string | Date;
    client_brand: string;
    freighter_name: string;
    phone: string;
    comment?: string;
    status: string;
    ati: string;
    updateBtn: JSX.Element;
    deleteBtn: JSX.Element;   
  }