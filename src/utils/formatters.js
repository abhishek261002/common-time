/**
 * Price formatter: paise to INR display
 */
export function formatPrice(paise) {
  if (paise == null || isNaN(paise)) return "₹0";
  const rupees = paise / 100;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rupees);
}
