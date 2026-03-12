/**
 * Formata uma string de data para o formato "dd/mm/yyyy".
 * @param dateStr 
 * @returns A data formatada como string.
 */
export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}