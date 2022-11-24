import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

interface ListsDataTableProps {
  dt: React.MutableRefObject<null>;
  lists: { id: number; title: string }[];
  selectedLists: { id: number; title: string }[];
  setSelectedLists: React.Dispatch<any>;
  globalFilter: any;
  header: React.ReactElement<any, any>;
  actionBodyTemplate: (rowData: any) => JSX.Element;
}

const ListsDataTable = ({
  dt,
  lists,
  selectedLists,
  setSelectedLists,
  globalFilter,
  header,
  actionBodyTemplate,
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
      globalFilter={globalFilter}
      header={header}
      responsiveLayout="scroll"
    >
      <Column
        selectionMode="multiple"
        headerStyle={{ width: "3rem" }}
        exportable={false}
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
