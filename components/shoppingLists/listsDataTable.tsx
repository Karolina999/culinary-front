import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ShoppingListDto } from "../../types";

interface ListsDataTableProps {
  dt: React.MutableRefObject<null>;
  lists: ShoppingListDto[] | undefined;
  selectedLists: { id: number; title: string }[];
  setSelectedLists: React.Dispatch<any>;
  header: React.ReactElement<any, any>;
  actionBodyTemplate: (rowData: any) => JSX.Element;
  editTitleBodyTemplate: (rowData: any) => JSX.Element;
}

const ListsDataTable = ({
  dt,
  lists,
  selectedLists,
  setSelectedLists,
  header,
  actionBodyTemplate,
  editTitleBodyTemplate,
}: ListsDataTableProps) => {
  return (
    <DataTable
      ref={dt}
      value={lists}
      selection={selectedLists}
      onSelectionChange={(e) => setSelectedLists(e.value)}
      dataKey="id"
      paginator
      rows={10}
      rowsPerPageOptions={[5, 10, 25]}
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      currentPageReportTemplate="{first} - {last} z {totalRecords} list zakupów"
      header={header}
      responsiveLayout="scroll"
      emptyMessage="Nie znaleziono list zakupów."
    >
      <Column
        selectionMode="multiple"
        headerStyle={{ width: "3rem" }}
        exportable={false}
      ></Column>
      <Column
        body={editTitleBodyTemplate}
        style={{ maxWidth: "30px" }}
      ></Column>
      <Column
        field="title"
        header="Lista"
        sortable
        style={{ width: "100%" }}
      ></Column>
      <Column
        body={actionBodyTemplate}
        exportable={false}
        style={{ minWidth: "150px" }}
      ></Column>
    </DataTable>
  );
};

export default ListsDataTable;
