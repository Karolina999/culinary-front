import { Toast } from "primereact/toast";
import React, { useRef, useState, useEffect } from "react";
import {
  getShoppingList,
  getShoppingListProducts,
} from "../../services/shoppingList";
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

interface ListaProps {
  listId: string;
}

const Lista = ({ listId }: ListaProps) => {
  const title = "Zakupy na urodziny";
  let emptyProduct = {
    amount: "",
    id: null,
    unit: "",
  };
  let ingredientId = null;
  const [list, setList] = useState<ShoppingList | undefined>(undefined);
  const [products, setProducts] = useState<ProductFromList[]>([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState<ShoppingListDto[]>(
    []
  );
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const toast = useRef(null);
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

  useEffect(() => {
    fetchList();
    fetchProducts();
  }, []);

  // const exportPdf = () => {
  //   const test = products.map((p) => {
  //     const t = {
  //       name: p?.ingredient?.name,
  //       amount: p.amount + " " + p.unit,
  //       category: p.ingredient?.ingredientCategory,
  //     };
  //     return t;
  //   });
  //   const doc = new jsPDF();
  //   // doc.addFont("Montserrat.ttf", "Montserrat", "normal");
  //   // doc.setFont("Montserrat");
  //   autoTable(doc, {
  //     head: [["Produkt", "Ilosc", "Kategoria"]],
  //     body: test.map((p) => {
  //       return [p.name, p.amount, p.category];
  //     }),
  //     // styles: { font: "courier" },
  //     theme: "plain",
  //   });
  //   doc.save(`${list?.title}.pdf`);
  // };

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
              className="p-button-success bg-success border-success mr-2"
              // onClick={openNew}
            />
          </Col>
          <Col className="px-0">
            <Button
              label="Usuń"
              icon="pi pi-trash"
              className="p-button-danger bg-danger border-danger"
              // onClick={confirmDeleteSelected}
            />
          </Col>
          <Col>
            <Button
              label="PDF"
              icon="pi pi-file-pdf"
              onClick={() => exportPdf(products, list)}
              className="p-button-warning mr-2"
              data-pr-tooltip="PDF"
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
    console.log(rowData);
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
                <Column
                  body={categoryBodyTemplate}
                  header="Kategoria"
                  sortable
                ></Column>
                <Column
                  body={actionBodyTemplate}
                  exportable={false}
                  style={{ minWidth: "150px" }}
                ></Column>
              </DataTable>
            )}
          </div>
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
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

  // const resList = await fetch(
  //   `https://localhost:7193/api/ShoppingList/${params.listId}`
  // );
  // const list = await resList.json();

  // if (!list || list.status) {
  //   return {
  //     notFound: true,
  //   };
  // }

  const listId = params.listId;

  return {
    props: {
      listId: listId,
    },
  };
}
