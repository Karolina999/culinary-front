import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPdf = ({ products, list }: any) => {
  const test = products.map((p: any) => {
    const t = {
      name: p?.ingredient?.name,
      amount: p.amount + " " + p.unit,
      category: p.ingredient?.ingredientCategory,
    };
    return t;
  });
  const doc = new jsPDF();
  // doc.addFont("Montserrat.ttf", "Montserrat", "normal");
  // doc.setFont("Montserrat");
  autoTable(doc, {
    head: [["Produkt", "Ilosc", "Kategoria"]],
    body: test.map((p: any) => {
      return [p.name, p.amount, p.category];
    }),
    // styles: { font: "courier" },
    theme: "plain",
  });
  doc.save(`${list?.title}.pdf`);
};
