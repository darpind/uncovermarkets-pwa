export const TIERS = {
  VISITOR: "visitor",
  FREE: "free",
  PAID: "paid"
};
export const ADMIN_EMAIL = "darpan.pmp@gmail.com";

export const canAccess = (userRole, itemTier) => {
  if (itemTier === TIERS.VISITOR) return true;
  if (!userRole) return false;
  if (itemTier === TIERS.FREE && (userRole === TIERS.FREE || userRole === TIERS.PAID)) return true;
  if (itemTier === TIERS.PAID && userRole === TIERS.PAID) return true;
  return false;
};
