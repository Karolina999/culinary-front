import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { ProductService } from "../service/ProductService";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Col, Container, Row } from "react-bootstrap";
// import "./DataTableDemo.css";

const Lista = () => {
  const title = "Lista zakupów";
  let emptyProduct = {
    id: null,
    unit: "",
    ingredientName: "",
    ingredientCategory: "",
    quantity: "",
  };

  const [products, setProducts] = useState([
    {
      id: 1,
      unit: "kg",
      ingredientName: "Nam1",
      ingredientCategory: "Category1",
      quantity: "1",
    },
    {
      id: 2,
      unit: "szt.",
      ingredientName: "Nam2",
      ingredientCategory: "Category2",
      quantity: "2",
    },
    {
      id: 3,
      unit: "szczypta",
      ingredientName: "3ing",
      ingredientCategory: "Category3",
      quantity: "2",
    },
    {
      id: 4,
      unit: "szt.",
      ingredientName: "3ing",
      ingredientCategory: "Category3",
      quantity: "2",
    },
    {
      id: 5,
      unit: "ml",
      ingredientName: "4ing",
      ingredientCategory: "Category1",
      quantity: "2",
    },
    {
      id: 6,
      unit: "kg",
      ingredientName: "Nam6",
      ingredientCategory: "Category2",
      quantity: "6",
    },
  ]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  // const productService = new ProductService();

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h3>{title}</h3>
      </React.Fragment>
    );
  };
  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length}
        />
        {/* <FileUpload
          mode="basic"
          name="demo[]"
          auto
          url="https://primefaces.org/primereact/showcase/upload.php"
          accept=".csv"
          chooseLabel="Import"
          className="mr-2 inline-block"
          //   onUpload={importCSV}
        /> */}
        {/* <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          //   onClick={exportCSV}
        /> */}
      </React.Fragment>
    );
  };
  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manage Products</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const editProduct = (product: any) => {
    setProduct({ ...product });
    setProductDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };
  const saveProduct = () => {
    setSubmitted(true);

    if (product.name.trim()) {
      let _products = [...products];
      let _product = { ...product };
      if (product.id) {
        const index = findIndexById(product.id);

        _products[index] = _product;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        _product.id = createId();
        _product.image = "product-placeholder.svg";
        _products.push(_product);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
      }

      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    }
  };
  const productDialogFooter = (
    <React.Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </React.Fragment>
  );

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };
  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);
    setProducts(_products);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Product Deleted",
      life: 3000,
    });
  };
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );
  const confirmDeleteProduct = (product: any) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };
  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts?.includes(val));
    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };
  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );
  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };
  const onInputChange = (e: any, name: any) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  return (
    <Row className="py-4 justify-content-center">
      <Col xs={12} md={8}>
        <div className="datatable-crud-demo">
          <Toast ref={toast} />
          <div className="card">
            <Toolbar
              className="mb-4"
              left={leftToolbarTemplate}
              right={rightToolbarTemplate}
            ></Toolbar>

            <DataTable
              ref={dt}
              value={products}
              selection={selectedProducts}
              onSelectionChange={(e) => setSelectedProducts(e.value)}
              dataKey="id"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
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
                field="ingredientName"
                header="Produkt"
                sortable
                style={{ width: "100%" }}
              ></Column>
              <Column
                field="quantity"
                header=""
                sortable
                className="text-end"
                style={{ width: "10px" }}
              ></Column>
              <Column
                field="unit"
                header=""
                sortable
                style={{ width: "10px" }}
              ></Column>
              <Column
                field="ingredientCategory"
                header="Kategoria"
                sortable
              ></Column>
              <Column
                body={actionBodyTemplate}
                exportable={false}
                style={{ minWidth: "150px" }}
              ></Column>
            </DataTable>
          </div>
          <Dialog
            visible={productDialog}
            style={{ width: "450px" }}
            header="Product Details"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}
          >
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={product.ingredientName}
                onChange={(e) => onInputChange(e, "ingredientName")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": submitted && !product.ingredientName,
                })}
              />
              {submitted && !product.ingredientName && (
                <small className="p-error">Name is required.</small>
              )}
            </div>
            {/* <div className="field">
            <label className="mb-3">Category</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category1"
                  name="category"
                  value="Accessories"
                  onChange={onCategoryChange}
                  checked={product.category === "Accessories"}
                />
                <label htmlFor="category1">Accessories</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category2"
                  name="category"
                  value="Clothing"
                  onChange={onCategoryChange}
                  checked={product.category === "Clothing"}
                />
                <label htmlFor="category2">Clothing</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category3"
                  name="category"
                  value="Electronics"
                  onChange={onCategoryChange}
                  checked={product.category === "Electronics"}
                />
                <label htmlFor="category3">Electronics</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton
                  inputId="category4"
                  name="category"
                  value="Fitness"
                  onChange={onCategoryChange}
                  checked={product.category === "Fitness"}
                />
                <label htmlFor="category4">Fitness</label>
              </div>
            </div>
          </div> */}

            {/* <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="price">Price</label>
              <InputNumber
                id="price"
                value={product.price}
                onValueChange={(e) => onInputNumberChange(e, "price")}
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </div>
            <div className="field col">
              <label htmlFor="quantity">Quantity</label>
              <InputNumber
                id="quantity"
                value={product.quantity}
                onValueChange={(e) => onInputNumberChange(e, "quantity")}
                integeronly
              />
            </div>
          </div> */}
          </Dialog>
          <Dialog
            visible={deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>
                  Are you sure you want to delete{" "}
                  <b>{product.ingredientName}</b>?
                </span>
              )}
            </div>
          </Dialog>
          <Dialog
            visible={deleteProductsDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductsDialogFooter}
            onHide={hideDeleteProductsDialog}
          >
            <div className="confirmation-content">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>
                  Are you sure you want to delete the selected products?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </Col>
    </Row>
  );
};

export default Lista;
