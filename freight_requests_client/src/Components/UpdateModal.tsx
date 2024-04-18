import { Button, Modal, TextInput, Text, Select } from "@gravity-ui/uikit";

import "../App.css";
import { FrReqUpdate } from "../interfaces";
import { useRef } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getFrReqs: () => Promise<void>; 
}

export default function UpdateModal({
  open,
  setOpen,
  getFrReqs,
}: Props): JSX.Element {
  const frReqRef = useRef<FrReqUpdate>({
    status: "новая",
    client_brand: "",
    freighter_name: "",
    phone: "",
    ati: "",
    comment: "",
  });

  function handleInputChange(e: React.FormEvent<HTMLDivElement>) {
    const target = e.target as HTMLInputElement;
    const targetInput = target.closest("input");

    if (!targetInput) return;

    const targetInputName = targetInput.name as string;

    // eslint-disable-next-line
    // @ts-ignore
    frReqRef.current[targetInputName] = targetInput.value;
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            await fetch("http://localhost:3000/api/v1/fr_req", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json;charset=utf-8",
              },
              body: JSON.stringify(frReqRef.current),
            });

            await getFrReqs();

            setOpen(false);
          } catch (error) {
            if (error instanceof Error) {
              console.log("error during fetch === ", error.message);
            }
          }
        }}
      >
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <Text variant="display-1">Редактирование заявки</Text>
        </div>

        <div
          className="modal-input-container"
          onChange={(e) => handleInputChange(e)}
        >
          <TextInput
            placeholder="Магнит"
            label="Название фирмы клиента"
            name="client_brand"
          />
          <TextInput
            placeholder="Иванов Иван Иванович"
            label="ФИО перевозчика"
            name="freighter_name"
          />
          <TextInput
            type="tel"
            placeholder="+79999999998"
            label="Контактный телефон"
            name="phone"
          />
          <TextInput label="Комментарий" name="comment" />
          <TextInput
            type="url"
            placeholder="https://ati.su/firms/29056/info"
            label="ATI"
            name="ati"
          />
          <Select>
            <Select.Option value="новая">новая</Select.Option>
            <Select.Option value="в работе">в работе</Select.Option>
            <Select.Option value="завершено">завершено</Select.Option>
          </Select>
        </div>
        <div className="modal-btn-container">
          <Button view="action" type="submit">
            Создать
          </Button>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
        </div>
      </form>
    </Modal>
  );
}
