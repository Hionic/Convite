import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// Formatação padrão: 02/03/2025
export const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, "dd/MM/yyyy");
};

const capitalize = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Formatação longa: 2 de Mar. de 2025
export const formatDateLong = (dateString) => {
  const date = parseISO(dateString);
  const formatted = format(date, "d 'de' MMM. 'de' yyyy", { locale: ptBR });
  return capitalize(formatted);
};
