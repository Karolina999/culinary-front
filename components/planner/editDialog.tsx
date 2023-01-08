import { Dialog } from "primereact/dialog";
import React from "react";
import AddProduct from "./addProduct";

interface EditDialogProps {
  isOpen: boolean;
  setIsOpen: any;
  plannerId: number;
  editProduct: any;
  product: any;
}

const EditDialog = ({
  isOpen,
  setIsOpen,
  plannerId,
  editProduct,
  product,
}: EditDialogProps) => {
  return (
    <Dialog
      visible={isOpen}
      onHide={() => setIsOpen(false)}
      contentStyle={{
        paddingTop: "0",
        width: "450px",
      }}
    >
      {product && (
        <AddProduct
          setIsOpen={setIsOpen}
          mealType={product.mealType}
          editProduct={editProduct}
          product={product}
        />
      )}
    </Dialog>
  );
};

export default EditDialog;
