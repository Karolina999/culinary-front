import React, { useEffect, useState } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Ripple } from "primereact/ripple";
import { GetPlannerDto, GetProductFromPlannerDto, Recipe } from "../../types";
import { getPlanner } from "../../services/planner";
import Products from "../../components/planner/products";
import Meals from "../../components/planner/melas";
import { Toolbar } from "primereact/toolbar";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { Dialog } from "primereact/dialog";

const Index = () => {
  const mealType = [
    "Śniadanie",
    "II śniadanie",
    "Obiad",
    "Przekąska",
    "Kolacja",
  ];
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [planner, setPlanner] = useState<GetPlannerDto | undefined | null>(
    undefined
  );
  const [plannerMeals, setPlannerMeals] = useState<
    { type: number; recipes: any[] | undefined }[]
  >([]);
  const [plannerProducts, setPlannerProducts] = useState<
    { type: number; products: GetProductFromPlannerDto[] | undefined }[]
  >([]);

  const fetchPlanner = async () => {
    await getPlanner(date.toJSON().slice(0, 10))
      .then((res) => {
        console.log("res");
        console.log(res);
        setPlanner(res);
      })
      .catch((err) => {
        setPlanner(undefined);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchPlanner();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchPlanner();
    setLoading(false);
  }, [date]);

  useEffect(() => {
    setLoading(true);
    console.log("ue");
    if (planner) {
      const filtrMeals = mealType.map((mealType, index) => {
        const type = index;
        const recipes = planner?.plannerRecipes
          ?.filter((pr) => pr.mealType === index)
          .map((pr) => pr.recipe);
        return { type, recipes };
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

  const template = (
    options: any,
    mealName: string,
    toggle: boolean,
    mealsLength: number | undefined,
    productsLength: number | undefined
  ) => {
    const toggleIcon = options.collapsed
      ? "pi pi-chevron-down text-dark"
      : "pi pi-chevron-up text-dark";
    const className = `${options.className} justify-content-between`;
    const titleClassName = `${options.titleClassName} pl-1`;

    return (
      <div className={className}>
        <div onClick={options.onTogglerClick} className="cursor-pointer w-100">
          <div onClick={options.onTogglerClick} className="d-flex">
            <span className={`${titleClassName} my-2`}>{mealName}</span>
            <div className={options.togglerClassName}>
              {toggle && <span className={toggleIcon}></span>}
              <Ripple />
            </div>
          </div>
          <small className="text-secondary d-flex">
            <div className="pe-2">przepisy: {mealsLength}</div>
            <div>produtkty: {productsLength}</div>
          </small>
        </div>
        <div>
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-success bg-success border-success"
            style={{ width: "40px", height: "40px" }}
          />
        </div>
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="d-flex">
          <div className="pe-2">
            <Button
              icon="pi pi-calendar"
              className="p-button-warning"
              onClick={() => setIsOpen(true)}
            />
          </div>
          <div>
            <Button
              icon="pi pi-trash"
              className="p-button-danger bg-danger border-danger"
              disabled={!planner}
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
    <Container className="py-5" style={{ minHeight: "92vh" }}>
      <Toolbar
        className="mb-3"
        left={
          <div className="d-flex align-items-center">
            <Button
              icon="pi pi-chevron-left"
              className="p-button-rounded p-button-text p-button-plain p-button-sm"
              onClick={() => changeDate(-1)}
            />
            <span className="mx-2 bold">
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
                    plannerMeals[index].recipes?.length !== 0 ||
                      plannerProducts[index].products?.length !== 0,
                    plannerMeals[index].recipes?.length,
                    plannerProducts[index].products?.length
                  )
                }
                collapsed={true}
                toggleable
                className={`py-1 mypanel2 ${
                  plannerMeals[index].recipes?.length === 0 &&
                  plannerProducts[index].products?.length === 0 &&
                  "mypanel"
                }`}
              >
                {plannerProducts[index].products?.length !== 0 && (
                  <Products products={plannerProducts[index].products} />
                )}
                {plannerMeals[index].recipes?.length !== 0 && (
                  <Meals recipes={plannerMeals[index].recipes} />
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
              />
            </>
          }
        ></Toolbar>
      )}
      <Dialog
        visible={isOpen}
        onHide={() => setIsOpen(false)}
        closable={false}
        dismissableMask
        headerStyle={{ backgroundColor: "transparent", padding: "0" }}
        contentStyle={{ backgroundColor: "transparent", padding: "0" }}
      >
        <Calendar
          value={date}
          onChange={(e) => {
            let calendarDate = new Date(e.value);
            calendarDate.setMinutes(e.value.getMinutes() + 90);
            setDate(calendarDate);
            setIsOpen(false);
          }}
          inline
          locale="pl"
        />
      </Dialog>
    </Container>
  );
};

export default Index;
