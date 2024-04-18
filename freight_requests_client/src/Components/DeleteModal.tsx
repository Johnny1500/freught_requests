import { Button, Modal, Text } from "@gravity-ui/uikit";

import "../App.css";
import { FrReqUpdate } from "../interfaces";
import { MutableRefObject } from "react";

import { forwardRef } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getFrReqs: () => Promise<void>;
}

export default forwardRef(function DeleteModal(
  { open, setOpen, getFrReqs }: Props,
  ref: React.ForwardedRef<FrReqUpdate>
): JSX.Element {
  const frReqCurrent = ref as MutableRefObject<FrReqUpdate>;

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            await fetch(
              `http://localhost:3000/api/v1/fr_req/${frReqCurrent.current["id"]}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json;charset=utf-8",
                },
              }
            );

            await getFrReqs();

            setOpen(false);
          } catch (error) {
            if (error instanceof Error) {
              console.log("error during fetch === ", error.message);
            }
          }
        }}
      >
        <div
          style={{
            textAlign: "center",
            paddingTop: "20px",
            marginBottom: "10px",
          }}
        >
          <Text variant="display-1">Удаление заявки</Text>
        </div>

        <Text variant="body-1" style={{ padding: "20px", marginTop: "10px" }}>
          Удалить заявку? Это действие нельзя отменить
        </Text>

        <div className="modal-btn-container">
          <Button view="action" type="submit">
            Удалить
          </Button>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
        </div>
      </form>
    </Modal>
  );
});
