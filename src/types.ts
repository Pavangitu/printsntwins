export type ProductCategory = 
  | 'all'
  | 'bill-books'
  | 'photo-cards'
  | 'customized-stickers'
  | 'pipe-cleaner-crafts'
  | 'tshirts-printing'
  | 'visiting-cards';

export type OccasionTag = 
  | 'Birthday'
  | 'Anniversary'
  | 'Wedding'
  | 'Twins & Besties'
  | 'New Baby'
  | 'Love & Romance'
  | 'Just Because'
  | 'Housewarming';

export type RecipientTag = 
  | 'For Her'
  | 'For Him'
  | 'For Couples'
  | 'For Twins & Besties'
  | 'For Kids & Babies'
  | 'For Parents';

export interface DimensionOption {
  id: string;
  name: string;
  measurements: string;
  description?: string;
  badge?: string;
  priceDelta?: number;
}

export interface MaterialOption {
  id: string;
  name: string;
  spec: string;
  description?: string;
  badge?: string;
  priceDelta?: number;
}

export interface CustomizationOptions {
  requiresName?: boolean;
  nameLabel?: string;
  namePlaceholder?: string;
  
  requiresMessage?: boolean;
  messageLabel?: string;
  messagePlaceholder?: string;
  
  requiresDate?: boolean;
  dateLabel?: string;
  
  requiresPhoto?: boolean;
  photoLabel?: string;

  availableSizes?: string[];
  availableFabrics?: { id: string; name: string; description?: string; badge?: string; priceDelta?: number }[];
  availablePrintTypes?: { id: string; name: string; description?: string; badge?: string; priceDelta?: number }[];

  availableDimensions?: DimensionOption[];
  availableMaterials?: MaterialOption[];

  availableFonts?: { id: string; name: string; cssFamily: string }[];
  availableColors?: { id: string; name: string; hex: string; foilEffect?: boolean }[];
  availableStyles?: { id: string; name: string; previewThumb?: string }[];
  boxStyles?: { id: string; name: string; color: string; ribbon: string }[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  hoverImage?: string;
  badge?: 'Bestseller' | 'New' | 'Twin Favorite' | 'Handcrafted' | 'Popular';
  description: string;
  craftDetails: string[];
  dimensions?: string;
  leadTime: string;
  isPersonalizable: boolean;
  customizationOptions: CustomizationOptions;
  occasionTags: OccasionTag[];
  recipientTags: RecipientTag[];
  mockupType: 'billbook' | 'photocard' | 'stickers' | 'craft' | 'tshirt' | 'card' | 'frame' | 'mug' | 'plaque' | 'apparel' | 'notebook' | 'box' | 'tote';
}

export interface CustomizationState {
  recipientName: string;
  customMessage: string;
  specialDate: string;
  selectedFont: string;
  selectedColor: string;
  selectedStyle?: string;
  selectedSize?: string;
  selectedFabric?: string;
  selectedPrintType?: string;
  selectedDimension?: string;
  selectedMaterial?: string;
  photoUrl?: string;
  giftWrap: boolean;
  giftCardMessage: string;
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  quantity: number;
  customization: CustomizationState;
  unitPrice: number;
}

export interface BoxBuilderItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  productName: string;
  verified: boolean;
  customerPhoto?: string;
  occasion?: string;
}

export interface OrderTrackState {
  orderId: string;
  recipientName: string;
  placedDate: string;
  status: 'confirmed' | 'crafting' | 'packaging' | 'dispatched' | 'delivered';
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  items: { name: string; customizationText: string; image: string }[];
}
