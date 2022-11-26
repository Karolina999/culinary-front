import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPdf(products: any, list: any) {
  const test = products.map((p: any) => {
    const t = {
      name: p?.ingredient?.name,
      amount: p.amount + " " + p.unit,
      category: p.ingredient?.ingredientCategory,
    };
    return t;
  });
  const doc = new jsPDF();

  autoTable(doc, {
    head: [["Produkt", "Ilosc", "Kategoria"]],
    body: test.map((p: any) => {
      return [p.name, p.amount, p.category];
    }),
    theme: "plain",
  });
  doc.save(`${list?.title}.pdf`);
}
