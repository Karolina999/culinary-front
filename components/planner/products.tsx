import React from "react";
import { GetProductFromPlannerDto } from "../../types";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { UnitPluar } from "../../frontType/unit";
import { IngredientCategory } from "../../frontType/ingredientCategory";
import { Row } from "react-bootstrap";
import { Button } from "primereact/button";

interface ProductsProps {
  products: GetProductFromPlannerDto[] | undefined;
}

const Products = ({ products }: ProductsProps) => {
  const unitBodyTemplate = (rowData: GetProductFromPlannerDto) => {
    const pluar = UnitPluar(rowData.amount!, rowData.unit!);
    return pluar;
  };
  const categoryBodyTemplate = (rowData: GetProductFromPlannerDto) => {
    const category =
      IngredientCategory[rowData?.ingredient?.ingredientCategory!];
    console.log(category);
    return category;
  };
  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Row className="justify-content-end px-2">
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-button-text text-success"
            aria-label="Search"
          />
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
      <DataTable value={products} responsiveLayout="scroll">
        <Column field="ingredient.name" header="Produkt" sortable></Column>
        <Column
          field="amount"
          header=""
          sortable
          className="text-end"
          style={{ width: "10px" }}
        ></Column>
        <Column
          field="unit"
          body={unitBodyTemplate}
          header=""
          sortable
          style={{ width: "10px" }}
        ></Column>
        <Column
          field="ingredient.ingredientCategory"
          body={categoryBodyTemplate}
          header="Kategoria"
          sortable
        ></Column>
        <Column
          body={actionBodyTemplate}
          exportable={false}
          style={{ width: "100%" }}
        ></Column>
      </DataTable>
    </>
  );
};

export default Products;
