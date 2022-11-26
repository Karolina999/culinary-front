import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";

const ListDataTable = ({
  dt,
  products,
  selectedProducts,
  setSelectedProducts,
  globalFilter,
  header,
  unitBodyTemplate,
  categoryBodyTemplate,
  actionBodyTemplate,
}: any) => {
  return (
    <DataTable
      ref={dt}
      value={products}
      selection={selectedProducts}
      onSelectionChange={(e: any) => setSelectedProducts(e.value)}
      dataKey="id"
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25]}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="{first}-{last} z {totalRecords} produktów"
      globalFilter={globalFilter}
      header={header}
      responsiveLayout="scroll"
      emptyMessage="Nie znaleziono produktów."
    >
      <Column
        selectionMode="multiple"
        headerStyle={{ width: "3rem" }}
        exportable={false}
      ></Column>
      <Column
        field="ingredient.name"
        header="Produkt"
        sortable
        style={{ width: "100%" }}
      ></Column>
      <Column
        field="amount"
        header=""
        sortable
        className="text-end"
        style={{ width: "10px" }}
      ></Column>
      <Column
        body={unitBodyTemplate}
        header=""
        sortable
        style={{ width: "10px" }}
      ></Column>
      <Column body={categoryBodyTemplate} header="Kategoria" sortable></Column>
      <Column
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "150px" }}
      ></Column>
    </DataTable>
  );
};

export default ListDataTable;
