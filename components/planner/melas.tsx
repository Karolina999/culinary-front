import React from "react";
import { Recipe } from "../../types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row } from "react-bootstrap";
import { Button } from "primereact/button";
import router from "next/router";

interface MealsProps {
  recipes: Recipe[] | undefined;
}

const Melas = ({ recipes }: MealsProps) => {
  const titleBodyTemplate = (rowData: Recipe) => {
    return (
      <React.Fragment>
        <Row>
          <span
            className="cursor-pointer"
            style={{ width: "fit-content" }}
            onClick={() =>
              router.push(`/przepisy/${rowData.id}`, "", { scroll: true })
            }
          >
            {rowData.title}
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
          />
        </Row>
      </React.Fragment>
    );
  };
  return (
    <>
      <DataTable value={recipes} responsiveLayout="scroll">
        <Column
          field="title"
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
