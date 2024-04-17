import { Table, Link, TableColumnConfig } from "@gravity-ui/uikit";
import { useState, useEffect } from "react";


interface FrReq {
  id: number;
  timestamp: string | Date;
  client_brand: string;
  freighter_name: string;
  phone: string;
  comment?: string;
  status: string;
  ati: string;
}

export default function FrReqMainContent() {
  const [frRegs, setFrRegs] = useState<FrReq[]>([]);

  const columns:TableColumnConfig<any>[] = [
    { id: "id", name: "Номер заявки", align: "center" },
    { id: "timestamp", name: "Дата", align: "center" },
    { id: "client_brand", name: "Название фирмы клиента", align: "center" },
    { id: "freighter_name", name: "ФИО перевозчика", align: "center" },
    { id: "phone", name: "Контактный телефон", align: "center" },
    { id: "comment", name: "Комментарий", align: "center" },
    { id: "status", name: "Статус", align: "center" },
    { id: "ati", name: "ATI", align: "center" },
  ];

  useEffect(() => {
    async function getFrReqs() {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/fr_req`);

        if (response.ok) {
          const json = await response.json();
          setFrRegs([...json]);
          console.log("json === ", json);
        } else {
          console.error("HTTP Error: " + response.status);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log("useEffect error.message === ", error.message);
        }
      }
    }

    getFrReqs();
  }, []);

  return (
    <section>
      <Table data={frRegs} columns={columns}></Table>
    </section>
  );
}
