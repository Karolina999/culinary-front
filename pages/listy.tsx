import { Row, Col, Spinner } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { getUserShoppingLists } from "../services/user";
import {
  deleteShoppingList,
  deleteShoppingLists,
  postShoppingList,
  putShoppingList,
} from "../services/shoppingList";

const Listy = () => {
  let emptyList = {
    id: 0,
    title: "",
  };
  const [lists, setLists] = useState([]);
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

  const findIndexById = (id: any) => {
    let index = -1;
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const saveList = async () => {
    setSubmitted(true);

    if (list.title.trim()) {
      let _lists = [...lists];
      let _list = { ...list };
      if (list.id) {
        // Edytowanie listy
        // const index = findIndexById(list.id);

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

        // _lists[index] = _list;
        // toast.current.show({
        //   severity: "success",
        //   summary: "Powodzenie",
        //   detail: "Lista została pomyślnie zaktualizowana",
        //   life: 3000,
        // });
        // setLists(_lists);
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
        <Row>
          <Col xs={6} className="pe-0 me-0">
            <Button
              icon="pi pi-pencil"
              className="p-button-rounded p-button-success bg-success border-success mr-2"
              onClick={() => editList(rowData)}
            />
          </Col>
          <Col xs={6} className="ps-0 ms-0">
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger bg-danger border-danger"
              onClick={() => confirmDeleteList(rowData)}
            />
          </Col>
        </Row>
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
              ) : (
                <>
                  {lists.length > 0 ? (
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
                  ) : (
                    <h5 className="py-5 my-5 text-center w-75 mx-auto">
                      Nie masz żadnych list zakupów.
                      <br />
                      Wciśnij w przycisk dodaj aby stworzyć nową listę.
                    </h5>
                  )}
                </>
              )}
            </div>
          </div>
          {/* Dodawanie i edytowanie nowej listy */}
          <Dialog
            visible={listDialog}
            style={{ width: "450px" }}
            header="Szczegóły listy"
            modal
            className="p-fluid"
            footer={listDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label htmlFor="title" className="pb-2">
                Tytuł
              </label>
              <InputText
                id="title"
                value={list.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onInputChange(e, "title")
                }
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !list.title,
                })}
              />
              {submitted && !list.title && (
                <small className="p-error">To pole jest wymagane</small>
              )}
            </div>
          </Dialog>
          {/* Usuwanie pojedynczej listy */}
          <Dialog
            visible={deleteListDialog}
            style={{ width: "450px" }}
            header="Potwierdź"
            modal
            footer={deleteListDialogFooter}
            onHide={hideDeleteListDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {list && (
                <span className="ps-2">
                  Jesteś pewien że chcesz usunąć listę: <b>{list.title}</b>?
                </span>
              )}
            </div>
          </Dialog>
          {/* Usuwanie kilku list */}
          <Dialog
            visible={deleteListsDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteListsDialogFooter}
            onHide={hideDeleteListsDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {list && (
                <span className="ps-2">
                  Jesteś pewien że chcesz usunąć zaznaczone listy?
                </span>
              )}
            </div>
          </Dialog>
        </Col>
      </Row>
    </div>
  );
};

export default Listy;
