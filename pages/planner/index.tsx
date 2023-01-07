import React, { useEffect, useRef, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { GetPlannerDto, GetProductFromPlannerDto } from "../../types";
import { deletePlanner, getPlanner, postPlanner } from "../../services/planner";
import Products from "../../components/planner/products";
import Meals from "../../components/planner/melas";
import { Toolbar } from "primereact/toolbar";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { Dialog } from "primereact/dialog";
import { template } from "../../components/planner/template";
import { Toast } from "primereact/toast";
import AddDialog from "../../components/planner/addDialog";
import {
  deletePlannerRecipe,
  postPlannerRecipe,
} from "../../services/plannerRecipe";
import {
  deleteProductFromPlanner,
  postProductFromPlanner,
  putProductFromPlanner,
} from "../../services/productFromPlanner";
import EditDialog from "../../components/planner/editDialog";
import styles from "../../styles/planner.module.css";
import { postShoppingList } from "../../services/shoppingList";
import { postProductsFromList } from "../../services/productFromList";
import { getRecipeProducts, getRecipesProducts } from "../../services/recipe";

const Index = () => {
  const mealType = [
    "Śniadanie",
    "II śniadanie",
    "Obiad",
    "Przekąska",
    "Kolacja",
  ];
  const toast = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingAddList, setLoadingAddList] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [mealTypeAdd, setMealTypeAdd] = useState(-1);
  const [planner, setPlanner] = useState<GetPlannerDto | undefined | null>(
    undefined
  );
  const [plannerMeals, setPlannerMeals] = useState<
    { type: number; plannerRecipes: any[] | undefined }[] | undefined
  >(undefined);
  const [plannerProducts, setPlannerProducts] = useState<
    | { type: number; products: GetProductFromPlannerDto[] | undefined }[]
    | undefined
  >(undefined);
  const [productToEdit, setProductToEdit] = useState<any>(null);

  const fetchPlanner = async () => {
    await getPlanner(date.toJSON().slice(0, 10))
      .then((res) => {
        setPlanner(res);
        res || setLoading(false);
      })
      .catch((err) => {
        setPlanner(undefined);
      });
  };

  const addPlanner = async () => {
    setLoading(true);
    const postDate = {
      date: date.toJSON().slice(0, 10),
    };
    await postPlanner(postDate)
      .then(async (res) => {
        await fetchPlanner();
        toast.current.show({
          severity: "success",
          summary: "Powodzenie",
          detail: "Planner został dodany",
          life: 3000,
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Błąd",
          detail: "Planner nie został dodany",
          life: 3000,
        });
      });
    setLoading(false);
  };

  const delPlanner = async () => {
    setLoading(true);
    await deletePlanner(planner?.id!)
      .then(async (res) => {
        await fetchPlanner();
        toast.current.show({
          severity: "success",
          summary: "Powodzenie",
          detail: "Planner został usunięty",
          life: 3000,
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Błąd",
          detail: "Planner nie został usunięty",
          life: 3000,
        });
      });
    setLoading(false);
  };

  const editProduct = async (
    productId: number,
    ingredientId: number,
    data: any
  ) => {
    await putProductFromPlanner(productId, ingredientId, data)
      .then(async (res) => {
        await fetchPlanner();
        toast.current.show({
          severity: "success",
          summary: "Powodzenie",
          detail: "Produkt został zedytowany",
          life: 3000,
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Błąd",
          detail: "Produkt nie został zedytowany",
          life: 3000,
        });
      });
  };

  const addProduct = async (
    ingredientId: number,
    plannerId: number,
    data: any
  ) => {
    await postProductFromPlanner(ingredientId, plannerId, data)
      .then(async (res) => {
        await fetchPlanner();
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
          detail: "Produkt nie został dodany",
          life: 3000,
        });
      });
  };

  const addMeal = async (
    recipeId: number,
    plannerId: number,
    mealType: number
  ) => {
    await postPlannerRecipe(recipeId, plannerId, mealType)
      .then(async (res) => {
        await fetchPlanner();
        toast.current.show({
          severity: "success",
          summary: "Powodzenie",
          detail: "Posiłek został dodany",
          life: 3000,
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Błąd",
          detail: "Posiłek nie został dodany",
          life: 3000,
        });
      });
  };

  const delMeal = async (plannerRecipeId: number) => {
    await deletePlannerRecipe(plannerRecipeId)
      .then(async (res) => {
        await fetchPlanner();
        toast.current.show({
          severity: "success",
          summary: "Powodzenie",
          detail: "Posiłek został usunięty",
          life: 3000,
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Błąd",
          detail: "Posiłek nie został usunięty",
          life: 3000,
        });
      });
  };

  const delProduct = async (productId: number) => {
    await deleteProductFromPlanner(productId)
      .then(async (res) => {
        await fetchPlanner();
        toast.current.show({
          severity: "success",
          summary: "Powodzenie",
          detail: "Produkt został usunięty",
          life: 3000,
        });
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Błąd",
          detail: "Produkt nie został usunięty",
          life: 3000,
        });
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchPlanner();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPlanner();
  }, [date]);

  useEffect(() => {
    setLoading(true);
    if (planner) {
      const filtrMeals = mealType.map((mealType, index) => {
        const type = index;
        const plannerRecipes = planner?.plannerRecipes?.filter(
          (pr) => pr.mealType === index
        );
        return { type, plannerRecipes };
      });
      setPlannerMeals(filtrMeals);

      const filtrProducts = mealType.map((mealType, index) => {
        const type = index;
        const products = planner?.products?.filter((p) => p.mealType == index);
        return { type, products };
      });
      setPlannerProducts(filtrProducts);
    }

    setLoading(false);
  }, [planner]);

  function flatten(arr: any) {
    return arr.reduce(function (flat: any, toFlatten: any) {
      return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
      );
    }, []);
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="d-flex">
          <div className="pe-2">
            <Button
              label={loadingAddList ? "Wczytuje..." : "Stwórz listę"}
              className="p-button-success bg-success border-success"
              disabled={!planner}
              onClick={async () => {
                setLoadingAddList(true);
                const title = `Zakupy ${date.toLocaleDateString("pl-PL", {
                  weekday: "short",
                  year: undefined,
                  month: "long",
                  day: "numeric",
                })}`;
                const meals = flatten(
                  plannerMeals?.map((x) => {
                    return x?.plannerRecipes;
                  })
                );
                const products = flatten(
                  plannerProducts?.map((x) => {
                    return x?.products;
                  })
                );
                const mealsId = meals.map((x: any) => x.recipeId);
                let mealsProducts: any[] = [];
                await getRecipesProducts(mealsId).then(
                  (res) => (mealsProducts = res)
                );
                const protuctsFromMeals = mealsProducts.map((p: any) => {
                  return {
                    unit: p.unit,
                    amount: p.amount,
                    ingredientId: p.ingredientId,
                  };
                });
                const protuctsFromProducts = products.map((p: any) => {
                  return {
                    unit: p.unit,
                    amount: p.amount,
                    ingredientId: p.ingredientId,
                  };
                });
                const protuctsToAdd = [
                  ...protuctsFromMeals,
                  ...protuctsFromProducts,
                ];
                await postShoppingList({ title: title })
                  .then(async (res) => {
                    await postProductsFromList(protuctsToAdd, res.id)
                      .then(() => {
                        toast.current.show({
                          severity: "success",
                          summary: "Powodzenie",
                          detail: "Lista została utworzona",
                          life: 3000,
                        });
                      })
                      .catch(() => {
                        toast.current.show({
                          severity: "error",
                          summary: "Błąd",
                          detail: "Nie udało się stworzyć listy",
                          life: 3000,
                        });
                      });
                  })
                  .catch(() => {
                    toast.current.show({
                      severity: "error",
                      summary: "Błąd",
                      detail: "Nie udało się stworzyć listy",
                      life: 3000,
                    });
                  });
                setLoadingAddList(false);
              }}
            />
          </div>
          <div className="pe-2">
            <Button
              icon="pi pi-calendar"
              className="p-button-warning"
              onClick={() => setIsCalendarOpen(true)}
            />
          </div>
          <div>
            <Button
              icon="pi pi-trash"
              className="p-button-danger bg-danger border-danger"
              disabled={!planner}
              onClick={() => delPlanner()}
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  addLocale("pl", {
    firstDayOfWeek: 1,
    dayNames: [
      "niedziela",
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
    ],
    dayNamesShort: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"],
    dayNamesMin: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "Sb"],
    monthNames: [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ],
    monthNamesShort: [
      "sty",
      "lut",
      "mar",
      "kwi",
      "maj",
      "cze",
      "lip",
      "sie",
      "wrz",
      "paź",
      "lis",
      "gru",
    ],
    today: "dzisiaj",
    clear: "Wyczyść",
  });

  const changeDate = (howManyDay: number) => {
    const dateCopy = new Date(date.getTime());
    dateCopy.setDate(dateCopy.getDate() + howManyDay);
    setDate(dateCopy);
  };

  return (
    <div className={`${styles.background}`}>
      <Container className="py-5" style={{ minHeight: "92vh" }}>
        <div className={`rounded p-4 ${styles.cardColor}`}>
          <Toast ref={toast} />
          <Toolbar
            className="mb-3"
            left={
              <div className="d-flex align-items-center">
                <Button
                  icon="pi pi-chevron-left"
                  className="p-button-rounded p-button-text p-button-plain p-button-sm"
                  onClick={() => changeDate(-1)}
                />
                <span
                  className="mx-2 bold cursor-pointer"
                  onClick={() => setIsCalendarOpen(true)}
                >
                  {date.toLocaleDateString("pl-PL", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <Button
                  icon="pi pi-chevron-right"
                  className="p-button-rounded p-button-text p-button-plain p-button-sm"
                  onClick={() => changeDate(1)}
                />
              </div>
            }
            right={rightToolbarTemplate}
          />
          {loading ? (
            <div className="d-flex">
              <Spinner
                animation="border"
                variant="success"
                className="mx-auto my-5"
              />
            </div>
          ) : planner ? (
            <>
              {mealType.map((mealType, index) => {
                return (
                  <Panel
                    key={index}
                    headerTemplate={(e) =>
                      template(
                        e,
                        mealType,
                        (plannerMeals &&
                          plannerMeals[index].plannerRecipes?.length !== 0) ||
                          (plannerProducts &&
                            plannerProducts[index].products?.length !== 0)
                          ? true
                          : false,
                        plannerMeals
                          ? plannerMeals[index].plannerRecipes?.length
                          : 0,
                        plannerProducts
                          ? plannerProducts[index].products?.length
                          : 0,
                        setIsAddOpen,
                        setMealTypeAdd,
                        index
                      )
                    }
                    collapsed={true}
                    toggleable
                    className={`py-1 mypanel2 ${
                      plannerMeals &&
                      plannerMeals[index].plannerRecipes?.length === 0 &&
                      plannerProducts &&
                      plannerProducts[index].products?.length === 0 &&
                      "mypanel"
                    }`}
                  >
                    {plannerProducts &&
                      plannerProducts[index].products?.length !== 0 && (
                        <Products
                          products={plannerProducts[index].products}
                          setIsOpen={setIsEditOpen}
                          setProductToEdit={setProductToEdit}
                          delProduct={delProduct}
                        />
                      )}
                    {plannerMeals &&
                      plannerMeals[index].plannerRecipes?.length !== 0 && (
                        <Meals
                          plannerRecipes={plannerMeals[index].plannerRecipes}
                          delMeal={delMeal}
                        />
                      )}
                  </Panel>
                );
              })}
            </>
          ) : (
            <Toolbar
              className="p-5 d-flex justify-content-center"
              left={
                <>
                  <Button
                    label="Dodaj planner"
                    icon="pi pi-plus"
                    className="p-button-success bg-success border-success"
                    onClick={() => addPlanner()}
                  />
                </>
              }
            ></Toolbar>
          )}
          <Dialog
            visible={isCalendarOpen}
            onHide={() => setIsCalendarOpen(false)}
            closable={false}
            dismissableMask
            headerStyle={{ backgroundColor: "transparent", padding: "0" }}
            contentStyle={{ backgroundColor: "transparent", padding: "0" }}
          >
            <Calendar
              value={date}
              onChange={(e) => {
                let calendarDate = new Date(e.value);
                calendarDate.setMinutes(calendarDate.getMinutes() + 90);
                setDate(calendarDate);
                setIsCalendarOpen(false);
              }}
              inline
              locale="pl"
            />
          </Dialog>
          <AddDialog
            isOpen={isAddOpen}
            setIsOpen={setIsAddOpen}
            plannerId={planner?.id!}
            mealType={mealTypeAdd}
            addMeal={addMeal}
            addProduct={addProduct}
          />
          <EditDialog
            isOpen={isEditOpen}
            setIsOpen={setIsEditOpen}
            plannerId={planner?.id!}
            editProduct={editProduct}
            product={productToEdit}
          />
        </div>
      </Container>
    </div>
  );
};

export default Index;
