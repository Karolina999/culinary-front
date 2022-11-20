export const Unit = [
  "gram",
  "kilogram",
  "sztuka",
  "szczypta",
  "łyżka",
  "szklanka",
  "dekagram",
  "litr",
  "pęczek",
  "opakowaie",
  "mililitr",
  "łyżeczka",
  "ziarno",
  "plaster",
  "słoik",
  "puszka",
  "listek",
  "garść",
  "cm",
];

const UnitPluarArray = [
  {
    singularNominativ: "gram",
    pluralNominativ: "gramy",
    pluralGenitive: "gramów",
  },
  {
    singularNominativ: "kilogram",
    pluralNominativ: "kilogramy",
    pluralGenitive: "kilogramów",
  },
  {
    singularNominativ: "sztuka",
    pluralNominativ: "sztuki",
    pluralGenitive: "sztuk",
  },
  {
    singularNominativ: "szczypta",
    pluralNominativ: "szczypty",
    pluralGenitive: "szczypt",
  },
  {
    singularNominativ: "łyżka",
    pluralNominativ: "łyżki",
    pluralGenitive: "łyżek",
  },
  {
    singularNominativ: "szklanka",
    pluralNominativ: "szklanki",
    pluralGenitive: "szklanek",
  },
  {
    singularNominativ: "dekagram",
    pluralNominativ: "dekagramy",
    pluralGenitive: "dekagramów",
  },
  {
    singularNominativ: "litr",
    pluralNominativ: "litry",
    pluralGenitive: "litrów",
  },
  {
    singularNominativ: "pęczek",
    pluralNominativ: "pęczeki",
    pluralGenitive: "pęczków",
  },
  {
    singularNominativ: "opakowaie",
    pluralNominativ: "opakowania",
    pluralGenitive: "opakowań",
  },
  {
    singularNominativ: "mililitr",
    pluralNominativ: "mililitry",
    pluralGenitive: "mililitrów",
  },
  {
    singularNominativ: "łyżeczka",
    pluralNominativ: "łyżeczeki",
    pluralGenitive: "łyżeczek",
  },
  {
    singularNominativ: "ziarno",
    pluralNominativ: "ziarna",
    pluralGenitive: "ziarn",
  },
  {
    singularNominativ: "plaster",
    pluralNominativ: "plastry",
    pluralGenitive: "plastrów",
  },
  {
    singularNominativ: "słoik",
    pluralNominativ: "słoiki",
    pluralGenitive: "słoików",
  },
  {
    singularNominativ: "puszka",
    pluralNominativ: "puszki",
    pluralGenitive: "puszek",
  },
  {
    singularNominativ: "listek",
    pluralNominativ: "listki",
    pluralGenitive: "listków",
  },
  {
    singularNominativ: "garść",
    pluralNominativ: "garście",
    pluralGenitive: "garści",
  },
  { singularNominativ: "cm", pluralNominativ: "cm", pluralGenitive: "cm" },
];

export function UnitPluar(amount: number, unit: number) {
  return polishPlural(
    UnitPluarArray[unit].singularNominativ,
    UnitPluarArray[unit].pluralNominativ,
    UnitPluarArray[unit].pluralGenitive,
    amount
  );
}

function polishPlural(
  singularNominativ: string,
  pluralNominativ: string,
  pluralGenitive: string,
  value: number
) {
  if (value === 1) {
    return singularNominativ;
  } else if (
    value % 10 >= 2 &&
    value % 10 <= 4 &&
    (value % 100 < 10 || value % 100 >= 20)
  ) {
    return pluralNominativ;
  } else {
    return pluralGenitive;
  }
}
