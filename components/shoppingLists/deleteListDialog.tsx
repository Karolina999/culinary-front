import React from "react";
import { Dialog } from "primereact/dialog";

interface DeleteListDialogProps {
  deleteListDialog: boolean;
  deleteListDialogFooter: React.ReactElement<any, any>;
  hideDeleteListDialog: () => void;
  list: { id: number; title: string };
}

const DeleteListDialog = ({
  deleteListDialog,
  deleteListDialogFooter,
  hideDeleteListDialog,
  list,
}: DeleteListDialogProps) => {
  return (
    <Dialog
      visible={deleteListDialog}
      style={{ width: "450px" }}
      header="Potwierdź"
      modal
      footer={deleteListDialogFooter}
      onHide={hideDeleteListDialog}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />
        {list && (
          <span className="ps-2">
            Jesteś pewien że chcesz usunąć listę: <b>{list.title}</b>?
          </span>
        )}
      </div>
    </Dialog>
  );
};

export default DeleteListDialog;
