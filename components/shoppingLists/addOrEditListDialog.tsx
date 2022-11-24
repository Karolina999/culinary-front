import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";

interface AddOrEditListDialogProps {
  listDialog: boolean;
  listDialogFooter: React.ReactElement<any, any>;
  hideDialog: () => void;
  onInputChange: (e: any, title: any) => void;
  list: { id: number; title: string };
  submitted: boolean;
}

const AddOrEditListDialog = ({
  listDialog,
  listDialogFooter,
  hideDialog,
  onInputChange,
  list,
  submitted,
}: AddOrEditListDialogProps) => {
  return (
    <Dialog
      visible={listDialog}
      style={{ width: "450px" }}
      header="Szczegóły listy"
      modal
      className="p-fluid"
      footer={listDialogFooter}
      onHide={hideDialog}
    >
      <div className="field">
        <label htmlFor="title" className="pb-2">
          Tytuł
        </label>
        <InputText
          id="title"
          value={list.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange(e, "title")
          }
          required
          autoFocus
          className={classNames({
            "p-invalid": submitted && !list.title,
          })}
        />
        {submitted && !list.title && (
          <small className="p-error">To pole jest wymagane</small>
        )}
      </div>
    </Dialog>
  );
};

export default AddOrEditListDialog;
