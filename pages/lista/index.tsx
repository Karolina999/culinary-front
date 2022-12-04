import { Row, Col, Spinner } from "react-bootstrap";
import { Button as BButton } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { getUserShoppingLists } from "../../services/user";
import {
  deleteShoppingList,
  deleteShoppingLists,
  postShoppingList,
  putShoppingList,
} from "../../services/shoppingList";
import DeleteListsDialog from "../../components/shoppingLists/deleteListsDialog";
import DeleteListDialog from "../../components/shoppingLists/deleteListDialog";
import AddOrEditListDialog from "../../components/shoppingLists/addOrEditListDialog";
import ListsDataTable from "../../components/shoppingLists/listsDataTable";
import router from "next/router";
import { ShoppingListDto } from "../../types";
import { BreadCrumb } from "primereact/breadcrumb";

const Listy = () => {
  let emptyList = {
    id: 0,
    title: "",
  };
  const [lists, setLists] = useState<ShoppingListDto[] | undefined>([]);
  const [filterLists, setFilterLists] = useState<ShoppingListDto[] | undefined>(
    []
  );
  const [listDialog, setListDialog] = useState(false);
  const [deleteListDialog, setDeleteListDialog] = useState(false);
  const [deleteListsDialog, setDeleteListsDialog] = useState(false);
  const [list, setList] = useState(emptyList);
  const [selectedLists, setSelectedLists] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useRef<any>(null);
  const dt = useRef(null);
  const [loading, setLoading] = useState(true);

  const fetchLists = async () => {
    await getUserShoppingLists()
      .then((res) => {
        setLists(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLists();
  }, []);

  useEffect(() => {
    lists &&
      setFilterLists(
        lists.filter((l) =>
          l.title?.toLowerCase().includes(globalFilter.toLowerCase())
        )
      );
  }, [globalFilter, lists]);

  const openNew = () => {
    setList(emptyList);
    setSubmitted(false);
    setListDialog(true);
  };

  const confirmDeleteSelected = () => {
    setDeleteListsDialog(true);
  };

  const editList = (list: any) => {
    setList({ ...list });
    setListDialog(true);
  };

  const confirmDeleteList = (list: any) => {
    setList(list);
    setDeleteListDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setListDialog(false);
  };

  const saveList = async () => {
    setSubmitted(true);
    if (list.title.length > 50) return;

    if (list.title.trim()) {
      let _list = { ...list };
      if (list.id) {
        // Edytowanie listy
        await putShoppingList(_list)
          .then((res) => {
            toast.current.show({
              severity: "success",
              summary: "Powodzenie",
              detail: "Lista została pomyślnie zaktualizowana",
              life: 3000,
            });
          })
          .catch((err) => {
            toast.current.show({
              severity: "error",
              summary: "Błąd",
              detail: "Lista nie została pomyślnie zaktualizowana",
              life: 3000,
            });
          });
        await fetchLists();
      } else {
        await postShoppingList({ title: _list.title })
          .then((res) => {
            toast.current.show({
              severity: "success",
              summary: "Powodzenie",
              detail: "Lista została pomyślnie utworzona",
              life: 3000,
            });
          })
          .catch((err) => {
            toast.current.show({
              severity: "error",
              summary: "Błąd",
              detail: "Lista nie została pomyślnie utworzona",
              life: 3000,
            });
          });
        await fetchLists();
      }

      setListDialog(false);
      setList(emptyList);
    }
  };

  const onInputChange = (e: any, title: any) => {
    const val = (e.target && e.target.value) || "";
    let _list = { ...list };
    _list[`${title}`] = val;

    setList(_list);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h3>Twoje listy zakupów</h3>
      </React.Fragment>
    );
  };

  const hideDeleteListDialog = () => {
    setDeleteListDialog(false);
  };

  const hideDeleteListsDialog = () => {
    setDeleteListsDialog(false);
  };

  const deleteList = async () => {
    await deleteShoppingList(list.id)
      .then((res) => {
        toast.current.show({
          severity: "success",
          summary: "Powodzenie",
          detail: "Lista została pomyślnie usunięta",
          life: 3000,
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Błąd",
          detail: "Lista nie została pomyślnie usunięta",
          life: 3000,
        });
      });
    await fetchLists();
    setDeleteListDialog(false);
    setList(emptyList);
  };

  const deleteSelectedLists = async () => {
    const listsId = selectedLists.map((l: any) => l.id);
    await deleteShoppingLists(listsId)
      .then((res) => {
        toast.current.show({
          severity: "success",
          summary: "Powodzenie",
          detail: "Listy zostały pomyślnie usunięte",
          life: 3000,
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Błąd",
          detail: "Listy nie zostały pomyślnie usunięte",
          life: 3000,
        });
      });
    await fetchLists();
    setDeleteListsDialog(false);
    setSelectedLists(null);
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Row>
          <Col className="pe-0">
            <Button
              label="Dodaj"
              icon="pi pi-plus"
              className="p-button-success bg-success border-success mr-2"
              onClick={openNew}
            />
          </Col>
          <Col>
            <Button
              label="Usuń"
              icon="pi pi-trash"
              className="p-button-danger bg-danger border-danger"
              onClick={confirmDeleteSelected}
              disabled={!selectedLists || !selectedLists.length}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left" style={{ width: "100%" }}>
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGlobalFilter(e.target.value ? e.target.value : "")
          }
          placeholder="Wyszukaj..."
          style={{ width: "100%" }}
        />
      </span>
    </div>
  );

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-between">
          <div className="px-2">
            <Button
              icon="pi pi-file-edit"
              className="p-button-rounded p-button-success bg-success border-success mr-2"
              onClick={() =>
                router.push(`/lista/${rowData.id}`, "", { scroll: true })
              }
            />
          </div>
          <div>
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger bg-danger border-danger"
              onClick={() => confirmDeleteList(rowData)}
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  const editTitleBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <BButton
          variant="link"
          className="px-0 mx-0"
          onClick={() => editList(rowData)}
        >
          <i className="pi pi-pencil"></i>
        </BButton>
      </React.Fragment>
    );
  };

  const listDialogFooter = (
    <React.Fragment>
      <Button
        label="Anuluj"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Zapisz"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveList}
      />
    </React.Fragment>
  );

  const deleteListDialogFooter = (
    <React.Fragment>
      <Button
        label="Nie"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteListDialog}
      />
      <Button
        label="Tak"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteList}
      />
    </React.Fragment>
  );

  const deleteListsDialogFooter = (
    <React.Fragment>
      <Button
        label="Nie"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteListsDialog}
      />
      <Button
        label="Tak"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedLists}
      />
    </React.Fragment>
  );

  return (
    <div>
      <Row className="py-md-4 mx-0 justify-content-center spicesBg">
        <Col xs={12} md={10} lg={8} className="px-0">
          <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card p-3 h93">
              <BreadCrumb
                model={[{ label: "Listy zakupów", url: "" }]}
                home={{ icon: "pi pi-home", url: "/" }}
                className="px-1 mb-2"
                style={{ border: "none" }}
              />
              {/* Dodaj, usuń */}
              <Toolbar
                className="mb-3"
                left={leftToolbarTemplate}
                right={rightToolbarTemplate}
              ></Toolbar>
              {/* Listy zakupów */}
              {loading ? (
                <Spinner
                  animation="border"
                  variant="success"
                  className="mx-auto my-5"
                />
              ) : lists && lists.length > 0 ? (
                <ListsDataTable
                  dt={dt}
                  lists={filterLists}
                  selectedLists={selectedLists}
                  setSelectedLists={setSelectedLists}
                  header={header}
                  actionBodyTemplate={actionBodyTemplate}
                  editTitleBodyTemplate={editTitleBodyTemplate}
                />
              ) : (
                <h5 className="py-5 my-5 text-center w-75 mx-auto">
                  Nie masz żadnych list zakupów.
                  <br />
                  Wciśnij w przycisk dodaj aby stworzyć nową listę.
                </h5>
              )}
            </div>
          </div>
          {/* Dodawanie i edytowanie nowej listy */}
          <AddOrEditListDialog
            listDialog={listDialog}
            listDialogFooter={listDialogFooter}
            hideDialog={hideDialog}
            onInputChange={onInputChange}
            list={list}
            submitted={submitted}
          />
          {/* Usuwanie pojedynczej listy */}
          <DeleteListDialog
            deleteListDialog={deleteListDialog}
            deleteListDialogFooter={deleteListDialogFooter}
            hideDeleteListDialog={hideDeleteListDialog}
            list={list}
          />
          {/* Usuwanie kilku list */}
          <DeleteListsDialog
            deleteListsDialog={deleteListsDialog}
            deleteListsDialogFooter={deleteListsDialogFooter}
            hideDeleteListsDialog={hideDeleteListsDialog}
            list={list}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Listy;
