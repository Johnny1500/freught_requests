import {
  Table,
  Link,
  Button,
  Text,
  Icon,
  TableColumnConfig,
} from "@gravity-ui/uikit";
import { useState, useEffect, useRef } from "react";

import { Gear, TrashBin, Plus } from "@gravity-ui/icons";

import "../App.css";

import CreateModal from "./CreateModal";
import UpdateModal from "./UpdateModal";
import DeleteModal from "./DeleteModal";

import { FrReqRender, FrReqUpdate } from "../interfaces";

export default function FrReqMainContent(): JSX.Element {
  const [frRegs, setFrRegs] = useState<FrReqRender[]>([]);
  const [filteredFrRegs, setFilteredFrReqs] = useState<FrReqRender[]>([]);
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [hideCompletedReq, setHideCompletedReq] = useState<boolean>(false);

  const frReqCurrent = useRef<FrReqUpdate>({
    id: 1,
    status: "новая",
    client_brand: "",
    freighter_name: "",
    phone: "",
    ati: "",
    comment: "",
  });

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

  async function getFrReqs() {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/fr_req`);

      if (response.ok) {
        const json = await response.json();

        const formattedArr = [...json].map((item) => {
          const formattedItem = { ...item };
          const {
            status,
            client_brand,
            freighter_name,
            phone,
            ati,
            comment,
            id,
          } = item;
          const intermediateItem = {
            id,
            status,
            client_brand,
            freighter_name,
            phone,
            ati,
            comment,
          };

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
            <Button
              view="outlined-action"
              onClick={() => {
                frReqCurrent.current = intermediateItem;
                setOpenUpdateModal(true);
              }}
            >
              <Icon data={Gear} size={18} />
            </Button>
          );

          formattedItem["deleteBtn"] = (
            <Button
              view="outlined-danger"
              onClick={() => {
                frReqCurrent.current = intermediateItem;
                setOpenDeleteModal(true);
              }}
            >
              <Icon data={TrashBin} size={18} />
            </Button>
          );

          return formattedItem;
        });

        setFrRegs([...formattedArr]);

        if (hideCompletedReq) {
          const intermediateRegs = [...formattedArr].filter(
            (item) => item["status"] !== "завершено"
          );

          setFilteredFrReqs([...intermediateRegs]);
        } else {
          setFilteredFrReqs([...formattedArr]);
        }
      } else {
        console.error("HTTP Error: " + response.status);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("useEffect error.message === ", error.message);
      }
    }
  }

  function handleHideCompetedReq() {
    if (!hideCompletedReq) {
      const intermediateRegs = [...frRegs].filter(
        (item) => item["status"] !== "завершено"
      );

      setFilteredFrReqs([...intermediateRegs]);
    } else {
      setFilteredFrReqs([...frRegs]);
    }
  }

  useEffect(() => {
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
            <>
              <Button view="action" onClick={() => setOpenCreateModal(true)}>
                <Icon data={Plus} size={18} />
                Создать
              </Button>
              <Button
                view="action"
                onClick={() => {
                  setHideCompletedReq(!hideCompletedReq);
                  handleHideCompetedReq();
                }}
              >
                {hideCompletedReq
                  ? "Показать завершенные"
                  : "Скрыть завершенные"}
              </Button>
            </>
          ) : null}
        </div>
      </div>
      <Table data={filteredFrRegs} columns={columns}></Table>
      <CreateModal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        getFrReqs={getFrReqs}
      />
      <UpdateModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        getFrReqs={getFrReqs}
        ref={frReqCurrent}
      />
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        getFrReqs={getFrReqs}
        ref={frReqCurrent}
      />
    </section>
  );
}
