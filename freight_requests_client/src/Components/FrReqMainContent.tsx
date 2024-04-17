import {
  Table,
  Link,
  Button,
  Text,
  Icon,
  TableColumnConfig,
} from "@gravity-ui/uikit";
import { useState, useEffect } from "react";

import { Gear, TrashBin, Plus } from "@gravity-ui/icons";

import "../App.css";
import CreateModal from "./CreateModal";

interface FrReq {
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

export default function FrReqMainContent(): JSX.Element {
  const [frRegs, setFrRegs] = useState<FrReq[]>([]);
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const columns: TableColumnConfig<unknown>[] = [
    { id: "id", name: "Номер заявки", align: "center" },
    { id: "timestamp", name: "Дата", align: "center" },
    { id: "client_brand", name: "Название фирмы клиента", align: "center" },
    { id: "freighter_name", name: "ФИО перевозчика", align: "center" },
    { id: "phone", name: "Контактный телефон", align: "center" },
    { id: "comment", name: "Комментарий", align: "center" },
    { id: "status", name: "Статус", align: "center" },
    { id: "ati", name: "ATI", align: "center" },
  ];

  if (isEditMode) {
    columns.push({ id: "updateBtn", name: "Редактировать", align: "center" });
    columns.push({ id: "deleteBtn", name: "Удалить", align: "center" });
  }

  useEffect(() => {
    async function getFrReqs() {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/fr_req`);

        if (response.ok) {
          const json = await response.json();

          const formattedArr = [...json].map((item) => {
            const formattedItem = { ...item };

            const formatter = new Intl.DateTimeFormat("ru", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            });

            formattedItem["timestamp"] = formatter.format(
              new Date(formattedItem["timestamp"])
            );

            formattedItem["ati"] = (
              <Link href={formattedItem["ati"]}>{formattedItem["ati"]}</Link>
            );

            formattedItem["updateBtn"] = (
              <Button view="outlined-action">
                <Icon data={Gear} size={18} />
              </Button>
            );

            formattedItem["deleteBtn"] = (
              <Button view="outlined-danger">
                <Icon data={TrashBin} size={18} />
              </Button>
            );

            return formattedItem;
          });

          setFrRegs([...formattedArr]);
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
      <h1>Заявки на перевозку</h1>
      <div className="edit-container">
        <Text>Количество {frRegs.length}</Text>
        <div className="edit-btn-container">
          <Button view="action" onClick={() => setEditMode(!isEditMode)}>
            {isEditMode ? "Просматривать" : "Редактировать"}
          </Button>
          {isEditMode ? (
            <Button view="action" onClick={() => setOpenCreateModal(true)}>
              <Icon data={Plus} size={18} />
              Создать
            </Button>
          ) : null}
        </div>
      </div>
      <Table data={frRegs} columns={columns}></Table>
      <CreateModal open={openCreateModal} setOpen={setOpenCreateModal} />
    </section>
  );
}
