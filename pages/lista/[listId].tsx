import { Toast } from "primereact/toast";
import React, { useRef, useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import {
  getShoppingList,
  getShoppingListProducts,
} from "../../services/shoppingList";
import { getIngredients } from "../../services/ingredients";
import { Col, Row, Spinner } from "react-bootstrap";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { ProductFromList, ShoppingList, ShoppingListDto } from "../../types";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { UnitPluar } from "../../frontType/unit";
import { IngredientCategory } from "../../frontType/ingredientCategory";
import { exportPdf } from "../../pdf/exportPdf";
import ListDataTable from "../../components/shoppingList/listDataTable";
import { Dialog } from "primereact/dialog";
import AddOrEditProductDialog from "../../components/shoppingList/addOrEditProductDialog";
import { postProductFromList } from "../../services/productFromList";

interface ListaProps {
  listId: string;
}

const Lista = ({ listId }: ListaProps) => {
  const title = "Zakupy na urodziny";
  let emptyProduct = {
    id: null,
    unit: "",
    amount: "",
    ingredientId: 0,
    shoppingListId: listId,
  };
  const [list, setList] = useState<ShoppingList | undefined>(undefined);
  const [products, setProducts] = useState<ProductFromList[]>([]);
  const [ingredients, setIngredients] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState<ShoppingListDto[]>(
    []
  );
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useRef<any>(null);
  const dt = useRef(null);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    await getShoppingList(listId)
      .then((res) => {
        setList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchProducts = async () => {
    await getShoppingListProducts(listId)
      .then((res) => {
        setProducts(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchIngredients = async () => {
    await getIngredients()
      .then((res) => {
        setIngredients(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchList();
    fetchProducts();
    fetchIngredients();
  }, []);

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);
    let _product = { ...product };
    if (
      !(
        _product.ingredientId > 0 &&
        _product.unit.length > 0 &&
        Number(_product.amount) > 0
      )
    ) {
      return;
    }
    if (_product.id) {
      console.log("edytuj");
    } else {
      //postProductFromList
      await postProductFromList(_product.ingredientId, listId, {
        unit: Number(_product.unit),
        amount: Number(_product.amount),
      })
        .then((res) => {
          toast.current.show({
            severity: "success",
            summary: "Powodzenie",
            detail: "Produkt został dodany",
            life: 3000,
          });
        })
        .catch((err) => {
          toast.current.show({
            severity: "error",
            summary: "Błąd",
            detail: "Produkt nie zostałdodany",
            life: 3000,
          });
        });
      await fetchProducts();
    }
    setProductDialog(false);
    setProduct(emptyProduct);
  };

  const onInputChange = (value: any, name: any) => {
    const val = value || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const productDialogFooter = (
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
        onClick={saveProduct}
      />
    </React.Fragment>
  );

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h3>{list?.title}</h3>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <Button
              label="Dodaj"
              icon="pi pi-plus"
              className="p-button-success bg-success border-succes"
              onClick={openNew}
            />
          </Col>
          <Col className="px-0">
            <Button
              label="Usuń"
              icon="pi pi-trash"
              className="p-button-danger bg-danger border-danger"
              // onClick={confirmDeleteSelected}
              disabled={!selectedProducts || !selectedProducts.length}
            />
          </Col>
          <Col>
            <Button
              label="PDF"
              icon="pi pi-file-pdf"
              onClick={() => exportPdf(products, list)}
              className="p-button-warning mr-2"
              data-pr-tooltip="PDF"
              disabled={products.length < 1}
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
            setGlobalFilter(e.target.value)
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
              // onClick={() => editProduct(rowData)}
            />
          </Col>
          <Col xs={6} className="ps-0 ms-0">
            <Button
              icon="pi pi-trash"
              className="p-button-rounded p-button-danger bg-danger border-danger"
              // onClick={() => confirmDeleteProduct(rowData)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  };

  const unitBodyTemplate = (rowData: ProductFromList) => {
    const pluar = UnitPluar(rowData.amount!, rowData.unit!);
    return pluar;
  };

  const categoryBodyTemplate = (rowData: ProductFromList) => {
    const category =
      IngredientCategory[rowData?.ingredient?.ingredientCategory!];
    return category;
  };

  return (
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
            {loading ? (
              <Spinner
                animation="border"
                variant="success"
                className="mx-auto my-5"
              />
            ) : (
              <ListDataTable
                dt={dt}
                products={products}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
                globalFilter={globalFilter}
                header={header}
                unitBodyTemplate={unitBodyTemplate}
                categoryBodyTemplate={categoryBodyTemplate}
                actionBodyTemplate={actionBodyTemplate}
              />
            )}
          </div>
          {/* Dodawanie i edytowanie */}
          <AddOrEditProductDialog
            productDialog={productDialog}
            productDialogFooter={productDialogFooter}
            hideDialog={hideDialog}
            product={product}
            onInputChange={onInputChange}
            submitted={submitted}
            ingredients={ingredients}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Lista;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params,
}: {
  params: { listId: string };
}) {
  const listId = params.listId;

  return {
    props: {
      listId: listId,
    },
  };
}
