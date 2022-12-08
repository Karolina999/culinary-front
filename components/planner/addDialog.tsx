import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Dialog } from "primereact/dialog";
import { TbSoup } from "react-icons/tb";
import { FaCarrot } from "react-icons/fa";
import AddRecipe from "./addRecipe";
import "primereact/resources/themes/lara-light-teal/theme.css";

interface AddDialogProps {
  isOpen: boolean;
  setIsOpen: any;
  plannerId: number;
  mealType: number;
  addMeal: any;
}

const AddDialog = ({
  isOpen,
  setIsOpen,
  plannerId,
  mealType,
  addMeal,
}: AddDialogProps) => {
  return (
    <Dialog
      visible={isOpen}
      onHide={() => setIsOpen(false)}
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
              <TbSoup /> Potrawy
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,.</p>
        </TabPanel>
      </TabView>
    </Dialog>
  );
};

export default AddDialog;
