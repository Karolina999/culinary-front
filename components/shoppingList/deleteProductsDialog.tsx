import { Dialog } from "primereact/dialog";
import React from "react";

const DeleteProductsDialog = ({
  deleteProductsDialog,
  deleteProductsDialogFooter,
  hideDeleteProductsDialog,
  product,
}: any) => {
  return (
    <Dialog
      visible={deleteProductsDialog}
      style={{ width: "450px" }}
      header="Confirm"
      modal
      footer={deleteProductsDialogFooter}
      onHide={hideDeleteProductsDialog}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />
        {product && (
          <span className="ps-2">
            Jesteś pewny że chcesz usunąć zaznaczone produkty?
          </span>
        )}
      </div>
    </Dialog>
  );
};

export default DeleteProductsDialog;
