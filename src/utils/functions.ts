export const handleUnitOfMeasure = (
  value: number | undefined,
  format: "C" | "F"
) => {
  return format === "C" ? value : ((value || 0) * 9) / 5 + 32;
};
