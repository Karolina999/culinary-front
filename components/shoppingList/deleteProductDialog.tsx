import { Dialog } from "primereact/dialog";
import React from "react";

const DeleteProductDialog = ({
  deleteProductDialog,
  deleteProductDialogFooter,
  hideDeleteProductDialog,
  product,
}: any) => {
  return (
    <Dialog
      visible={deleteProductDialog}
      style={{ width: "450px" }}
      header="Confirm"
      modal
      footer={deleteProductDialogFooter}
      onHide={hideDeleteProductDialog}
    >
      <div className="confirmation-content">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />
        {product && (
          <span className="ps-2">Czy na pewno chcesz usunąc ten produkt?</span>
        )}
      </div>
    </Dialog>
  );
};

export default DeleteProductDialog;
