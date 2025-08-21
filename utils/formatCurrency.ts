export const formatCurrency = (value: number) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const transformToNumber = (value: string | number | undefined) => {
  if (!value) return 0;
  if (value === "") return 0;
  if (typeof value === "string")
    return Number(value.replace(/\./g, "").replace(",", "."));
  if (value <= 0) return 0;
  return Number(value);
};
