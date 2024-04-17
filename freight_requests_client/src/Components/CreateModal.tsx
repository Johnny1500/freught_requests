import { Button, Modal, TextInput, Text } from "@gravity-ui/uikit";

import "../App.css";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateModal({ open, setOpen }: Props): JSX.Element {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div style={{textAlign: "center", paddingTop: "20px"}}>
      <Text variant="display-1">
        Создание заявки
      </Text>
      </div>
      <div className="modal-input-container">
        <TextInput placeholder="Магнит" label="Название фирмы клиента" />
        <TextInput placeholder="Иванов Иван Иванович" label="ФИО перевозчика" />
        <TextInput placeholder="+79999999998" label="Контактный телефон" />
        <TextInput label="Комментарий" />
        <TextInput placeholder="https://ati.su/firms/29056/info" label="ATI" />
      </div>
      <div className="modal-btn-container">
        <Button view="action" onClick={() => setOpen(false)}>
          Создать
        </Button>
        <Button onClick={() => setOpen(false)}>Отмена</Button>
      </div>
    </Modal>
  );
}
