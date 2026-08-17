export type CategoryId =
  | "pieczywo"
  | "nabial"
  | "mieso"
  | "warzywa"
  | "wlasne"
  | "napoje"
  | "chemia"
  | "spozywcze"
  | "mrozonki"
  | "slodycze";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  unit: string;
  weight: string;
  image: string;
  isOwnBrand: boolean;
  isPromo: boolean;
  oldPrice?: number;
  promoPrice?: number;
  badge?: string;
  groupIds?: string[];
  description: string;
  origin?: string;
  barcode: string;
};

export type Category = {
  id: CategoryId;
  name: string;
  description: string;
  emoji: string;
  tint: string;
};

export type Weekday =
  | "poniedzialek"
  | "wtorek"
  | "sroda"
  | "czwartek"
  | "piatek"
  | "sobota"
  | "niedziela";

export type StoreType = "store" | "bar";

export type Store = {
  id: string;
  name: string;
  type: StoreType;
  address: string;
  city: string;
  district: string;
  lat: number;
  lng: number;
  phone: string;
  hours: Record<Weekday, string>;
  features: string[];
  hasClickCollect: boolean;
  hasDelivery: boolean;
  image: string;
};

export type PromotionGroup = {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
};

export type Promotion = {
  id: string;
  productId?: string;
  title: string;
  subtitle: string;
  discountPercent?: number;
  validUntil: string;
  image: string;
  tag: string;
};

export type FlyerPage = {
  id: string;
  title: string;
  subtitle: string;
  productIds: string[];
  accent: string;
};

export type ShoppingListItem = {
  id: string;
  productId?: string;
  name: string;
  qty: number;
  unit: string;
  checked: boolean;
  price?: number;
};

export type CartItem = {
  productId: string;
  qty: number;
};

export type OrderStatus = "nowe" | "w-realizacji" | "do-odbioru" | "odebrane" | "anulowane";

export type Order = {
  id: string;
  storeId: string;
  createdAt: string;
  pickupAt: string;
  status: OrderStatus;
  items: { productId: string; qty: number; price: number }[];
  total: number;
  type: "click-collect" | "dostawa";
};

export type LoyaltyTxn = {
  id: string;
  date: string;
  label: string;
  points: number;
  storeName?: string;
};

export type Reward = {
  id: string;
  name: string;
  points: number;
  description: string;
};

export type LoyaltyTxType = "earn" | "spend";

export type LoyaltyTransaction = {
  id: string;
  date: string;
  description: string;
  points: number;
  type: LoyaltyTxType;
};

export type LoyaltyReward = {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
};

export type VoucherStatus = "aktywny" | "wykorzystany";

export type LoyaltyVoucher = {
  id: string;
  rewardId: string;
  title: string;
  pointsCost: number;
  code: string;
  status: VoucherStatus;
  expiresAt: string;
};

export type HomeBanner = {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  link: string;
  order: number;
};

export type HomeSectionType =
  | "category-shortcuts"
  | "horizontal-products"
  | "grid-products"
  | "banner";

export type HomeShortcut = {
  id: string;
  label: string;
  emoji: string;
  href: string;
};

export type HomeSection = {
  id: string;
  type: HomeSectionType;
  title?: string;
  href?: string;
  order: number;
  items: string[];
};

export type GastroCategoryId =
  | "sniadania"
  | "zupy"
  | "dania-glowne"
  | "nalesniki"
  | "zestawy"
  | "dodatki"
  | "desery"
  | "napoje-gastro";

export type GastroCategory = {
  id: GastroCategoryId;
  name: string;
  emoji: string;
};

export type DishAddon = {
  id: string;
  name: string;
  price: number;
  group: string;
  type: "checkbox" | "radio";
};

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: GastroCategoryId;
  isDaily: boolean;
  addons: DishAddon[];
};

export type GastroCartItem = {
  lineId: string;
  dishId: string;
  qty: number;
  addonIds: string[];
  notes: string;
  unitPrice: number;
};

export type DeliveryAddress = {
  id: string;
  label: string;
  street: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
};

export type GastroPayment = "blik" | "karta" | "przy-odbiorze";

export type GastroOrderStatus =
  | "przyjete"
  | "przygotowywane"
  | "w-drodze"
  | "dostarczone";

export type GastroOrder = {
  id: string;
  createdAt: string;
  eta: string;
  status: GastroOrderStatus;
  items: GastroCartItem[];
  total: number;
  addressId: string;
  addressLabel: string;
  slot: string;
  payment: GastroPayment;
};

export type AuthUser = {
  id: string;
  phone: string;
  name: string;
  loyaltyCardNumber: string;
  pointsBalance: number;
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  points: number;
  memberSince: string;
  favoriteStoreId: string;
  notifications: {
    promotions: boolean;
    flyer: boolean;
    loyalty: boolean;
    orders: boolean;
  };
};