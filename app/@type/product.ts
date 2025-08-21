export type SearchCarDto = {
  carPlate?: string;
  partName: string;
  car?: string;
  partCode?: string;
};

export type ProductDto = {
  id: number;
  name: string;
  brand: string;
  code: string;
  isPromotion: boolean;
  price: number;
  oldPrice?: number;
  paymentMethods: string;
  imagens: string[];
  quantity: number;
  description?: string;
  deliveryTime?: string;
  deliveryTimeOld?: string;
  subtotal?: number;
  technicalSpecifications?: {
    type?: string;
    position?: string;
    side?: string;
    material?: string;
    weight?: string;
    dimensions?: string;
    guarantee?: string;
    application?: string;
  };
};
