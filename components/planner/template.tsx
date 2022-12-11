import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";

export const template = (
  options: any,
  mealName: string,
  toggle: boolean,
  mealsLength: number | undefined,
  productsLength: number | undefined,
  setIsOpen: any,
  setMealTypeAdd: any,
  index: number
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
          <div className="pe-2">posiłek: {mealsLength}</div>
          <div>produtkty: {productsLength}</div>
        </small>
      </div>
      <div>
        <Button
          icon="pi pi-plus"
          className="p-button-rounded p-button-success bg-success border-success"
          style={{ width: "40px", height: "40px" }}
          onClick={() => {
            setIsOpen(true);
            setMealTypeAdd(index);
          }}
        />
      </div>
    </div>
  );
};
