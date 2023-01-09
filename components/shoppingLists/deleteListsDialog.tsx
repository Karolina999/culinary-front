import React from "react";
import { Dialog } from "primereact/dialog";

interface DeleteListsDialogProps {
  deleteListsDialog: boolean;
  deleteListsDialogFooter: React.ReactElement<any, any>;
  hideDeleteListsDialog: () => void;
  list: { id: number; title: string };
}

const DeleteListsDialog = ({
  deleteListsDialog,
  deleteListsDialogFooter,
  hideDeleteListsDialog,
  list,
}: DeleteListsDialogProps) => {
  return (
    <div>
      <Dialog
        visible={deleteListsDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteListsDialogFooter}
        onHide={hideDeleteListsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {list && (
            <span className="ps-2">
              Jesteś pewien że chcesz usunąć zaznaczone listy?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteListsDialog;
