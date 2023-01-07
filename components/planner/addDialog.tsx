import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
import { TbSoup } from "react-icons/tb";
import { FaCarrot } from "react-icons/fa";
import AddRecipe from "./addRecipe";
import "primereact/resources/themes/lara-light-teal/theme.css";
import AddProduct from "./addProduct";
import { BsHeartFill } from "react-icons/bs";
import AddWatchedRecipe from "./addWatchedRecipe";

interface AddDialogProps {
  isOpen: boolean;
  setIsOpen: any;
  plannerId: number;
  mealType: number;
  addMeal: any;
  addProduct: any;
}

const AddDialog = ({
  isOpen,
  setIsOpen,
  plannerId,
  mealType,
  addMeal,
  addProduct,
}: AddDialogProps) => {
  return (
    <Dialog
      visible={isOpen}
      onHide={() => setIsOpen(false)}
      closable={false}
      headerStyle={{ paddingBottom: "5px" }}
      contentStyle={{
        paddingTop: "0",
        width: "450px",
        maxWidth: "90vw",
        height: "50vh",
      }}
    >
      <TabView>
        <TabPanel
          header={
            <>
              <TbSoup /> Posiłek
            </>
          }
        >
          <AddRecipe
            plannerId={plannerId}
            mealType={mealType}
            setIsOpen={setIsOpen}
            addMeal={addMeal}
          />
        </TabPanel>
        <TabPanel
          header={
            <>
              <FaCarrot /> Produkty
            </>
          }
        >
          <AddProduct
            setIsOpen={setIsOpen}
            plannerId={plannerId}
            mealType={mealType}
            addProduct={addProduct}
          />
        </TabPanel>
        <TabPanel
          header={
            <>
              <BsHeartFill /> Ulubione
            </>
          }
        >
          <AddWatchedRecipe
            plannerId={plannerId}
            mealType={mealType}
            setIsOpen={setIsOpen}
            addMeal={addMeal}
          />
        </TabPanel>
      </TabView>
    </Dialog>
  );
};

export default AddDialog;
