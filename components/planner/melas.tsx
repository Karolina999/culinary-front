import React from "react";
import { Recipe } from "../../types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "react-bootstrap";
import { Button } from "primereact/button";
import router from "next/router";

interface MealsProps {
  plannerRecipes: any;
  delMeal: any;
}

const Melas = ({ plannerRecipes, delMeal }: MealsProps) => {
  const titleBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Row>
          <span
            className="cursor-pointer"
            style={{ width: "fit-content" }}
            onClick={() =>
              router.push(`/przepisy/${rowData.recipe.id}`, "", {
                scroll: true,
              })
            }
          >
            {rowData.recipe.title}
          </span>
        </Row>
      </React.Fragment>
    );
  };
  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Row className="justify-content-end px-2">
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-text p-button-plain"
            onClick={() => delMeal(rowData.id)}
          />
        </Row>
      </React.Fragment>
    );
  };
  console.log(plannerRecipes);
  return (
    <>
      <DataTable value={plannerRecipes} responsiveLayout="scroll">
        <Column
          field="recipe.title"
          body={titleBodyTemplate}
          header="Przepis"
          sortable
          style={{ width: "100%" }}
        ></Column>
        <Column body={actionBodyTemplate} exportable={false}></Column>
      </DataTable>
    </>
  );
};

export default Melas;
