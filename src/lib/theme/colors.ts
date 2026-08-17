export const colors = {
  primary: "#0055A4",
  primaryDark: "#003366",
  background: "#FFFFFF",
  accentLight: "#E8F1FA",
  textPrimary: "#1A1A2E",
  textSecondary: "#5A5A7A",
  success: "#28A745",
  error: "#DC3545",
  warning: "#FFC107",
  white: "#FFFFFF",
  border: "#D5E4F2",
} as const;

export type BrandColor = keyof typeof colors;
