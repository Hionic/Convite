export const servicesOptions = ref([
  "Estética automotiva",
  "Mecânica geral",
  "Elétrica",
  "Retífica",
  "Preparação",
  "Reparo especialista",
  "Funilaria",
  "Alinhamento e balanceamento",
  "Borracharia",
]);

export const productsList = [
  {
    id: 1,
    name: "Amortecedor Dianteiro Turbogás",
    brand: "Cofap",
    code: "GP32986",
    isPromotion: true,
    price: 330.3,
    oldPrice: 350.9,
    paymentMethods: "Pix",

    imagens: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
    ],
    description: "Amortecedor Dianteiro Turbogás",
    deliveryTime: "30 min",
    deliveryTimeOld: "1h",
    technicalSpecifications: {
      type: "Pressurizado a gás",
      position: "Dianteiro",
      side: "Direito",
      material: "Aço",
      weight: "4,2 kg",
      dimensions: "55 cm (C) x 12 cm (L) x 12 cm (A)",
      guarantee: "6 meses contra defeitos de fabricação",
      application: "Gol 2015-2020, Voyage 2016-2019",
    },
  },
  {
    id: 2,
    name: "Amortecedor Traseiro",
    brand: "Cofap",
    code: "GP32986",
    isPromotion: false,
    price: 368.9,
    paymentMethods: "5x R$73,78 sem juros",

    imagens: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
    ],
    technicalSpecifications: {
      type: "Pressurizado a gás",
      position: "Dianteiro",
      side: "Direito",
      material: "Aço",
      weight: "4,2 kg",
      dimensions: "55 cm (C) x 12 cm (L) x 12 cm (A)",
      guarantee: "6 meses contra defeitos de fabricação",
      application: "Gol 2015-2020, Voyage 2016-2019",
    },
  },
  {
    id: 3,
    name: "Amortecedor Traseiro",
    brand: "Cofap",
    code: "GP32986",
    isPromotion: false,
    price: 370.9,
    paymentMethods: "5x R$74,18 sem juros",

    imagens: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
    ],
    technicalSpecifications: {
      type: "Pressurizado a gás",
      position: "Dianteiro",
      side: "Direito",
      material: "Aço",
      weight: "4,2 kg",
      dimensions: "55 cm (C) x 12 cm (L) x 12 cm (A)",
      guarantee: "6 meses contra defeitos de fabricação",
      application: "Gol 2015-2020, Voyage 2016-2019",
    },
  },
  {
    id: 4,
    name: "Amortecedor Dianteiro Turbogás",
    brand: "Cofap",
    code: "GP32986",
    isPromotion: true,
    price: 375.9,
    oldPrice: 380.9,
    paymentMethods: "Pix",

    imagens: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
    ],
    description: "Amortecedor Dianteiro Turbogás",
    deliveryTime: "2hs",
    deliveryTimeOld: "58 min",
    technicalSpecifications: {
      type: "Pressurizado a gás",
      position: "Dianteiro",
      side: "Direito",
      material: "Aço",
      weight: "4,2 kg",
      dimensions: "55 cm (C) x 12 cm (L) x 12 cm (A)",
      guarantee: "6 meses contra defeitos de fabricação",
      application: "Gol 2015-2020, Voyage 2016-2019",
    },
  },
];

export const ordersList = [
  {
    id: 73102,
    status: "active",
    codeConfirmationDelivery: 1234,
    statusDeliveryActive: "in transit",
    address: "Av. Santos, 134 - Centro, Salvador - BA, 40390-015",
    company: "Oficina Top10",
    typeDelivery: "Entrega convencional",
    timeDelivery: "até 12h ou 17h",
    statusDelivery: [
      {
        name: "order placed",
        date: "2025-05-01",
        hour: "16:20",
      },
      {
        name: "in separation",
        date: "2025-05-01",
        hour: "17:40",
      },
      {
        name: "in transit",
        date: "2025-05-02",
        hour: "09:00",
      },
    ],
    items: [
      {
        id: 1,
        name: "Amortecedor Dianteiro Turbogás",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIrBN95vl51ljev8WdyglJpWCIrSlbqoGqQ&s",
        code: "GP32986",
        quantity: 1,
        price: 350.9,
      },
      {
        id: 2,
        name: "Kit Coxim do Amortecedor",
        image:
          "https://http2.mlstatic.com/D_NQ_NP_751879-MLB76947432751_062024-O-par-coxim-amortecedor-axios-asx-outlander-lancerkit-batente.webp",
        code: "GP32986",
        quantity: 1,
        price: 144.9,
      },
    ],
    dateOrder: "2025-05-27",
    totalItems: 495.8,
    discount: 10,
    totalDelivery: 50,
    total: 535.8,
    paymentMethod: "Pix",
  },
  {
    id: 72957,
    status: "active",
    codeConfirmationDelivery: 5678,
    statusDeliveryActive: "in separation",
    address: "Av. Santos, 134 - Centro, Salvador - BA, 40390-015",
    company: "Oficina Top10",
    typeDelivery: "Entrega convencional",
    timeDelivery: "até 12h ou 17h",
    statusDelivery: [
      {
        name: "order placed",
        date: "2025-05-01",
        hour: "16:20",
      },
      {
        name: "in separation",
        date: "2025-05-01",
        hour: "17:40",
      },
    ],
    items: [
      {
        id: 1,
        name: "Kit Coxim do Amortecedor",
        image:
          "https://http2.mlstatic.com/D_NQ_NP_751879-MLB76947432751_062024-O-par-coxim-amortecedor-axios-asx-outlander-lancerkit-batente.webp",
        code: "GP32986",
        quantity: 1,
        price: 144.9,
      },
    ],
    dateOrder: "2025-03-20",
    totalItems: 144.9,
    discount: 10,
    totalDelivery: 50,
    total: 184.9,
    paymentMethod: "Pix",
  },
  {
    id: 85957,
    status: "active",
    codeConfirmationDelivery: 1600,
    statusDeliveryActive: "Order placed",
    address: "Av. Santos, 134 - Centro, Salvador - BA, 40390-015",
    company: "Oficina Top10",
    typeDelivery: "Entrega convencional",
    timeDelivery: "até 12h ou 17h",
    statusDelivery: [
      {
        name: "order placed",
        date: "2025-05-01",
        hour: "16:20",
      },
    ],
    items: [
      {
        id: 1,
        name: "Kit Coxim do Amortecedor",
        image:
          "https://http2.mlstatic.com/D_NQ_NP_751879-MLB76947432751_062024-O-par-coxim-amortecedor-axios-asx-outlander-lancerkit-batente.webp",
        code: "GP32986",
        quantity: 1,
        price: 144.9,
      },
    ],
    dateOrder: "2025-05-25",
    totalItems: 144.9,
    discount: 10,
    totalDelivery: 50,
    total: 134.9,
    paymentMethod: "Pix",
  },
  {
    id: 72864,
    status: "closed",
    address: "Av. Santos, 134 - Centro, Salvador - BA, 40390-015",
    company: "Oficina Top10",
    typeDelivery: "Entrega convencional",
    timeDelivery: "até 12h ou 17h",
    statusDeliveryActive: "delivered",
    statusDelivery: [
      {
        name: "order placed",
        date: "2025-05-01",
        hour: "16:20",
      },
      {
        name: "in separation",
        date: "2025-05-01",
        hour: "17:40",
      },
      {
        name: "in transit",
        date: "2025-05-02",
        hour: "09:00",
      },
      {
        name: "delivered",
        date: "2025-05-02",
        hour: "10:00",
      },
    ],
    items: [
      {
        id: 1,
        name: "Mola Helicoidal Dianteira",
        image:
          "https://cdn.shopify.com/s/files/1/0767/8246/9395/files/144747-mola-de-suspensao-dianteira-helicoidal-1_431x431.jpg?v=1748154214",
        code: "GP32986",
        quantity: 1,
        price: 90,
      },
    ],
    dateOrder: "2025-02-13",
    totalItems: 90,
    discount: 10,
    totalDelivery: 50,
    total: 130,
    paymentMethod: "Pix",
  },
];

export const cardList = [
  {
    id: 1,
    number: "5499 3674 0250 8410",
    name: "John Doe",
    expirationDate: "01/2025",
    cvv: "123",
    type: "Credit",
  },
  {
    id: 2,
    number: "4532 9882 6222 6538",
    name: "John Doe",
    expirationDate: "01/2025",
    cvv: "123",
    type: "Debit",
  },
];

export const paymentParcel = [
  "1x R$500,00 sem juros",
  "2x R$250,00 sem juros",
  "3x R$166,66 sem juros",
  "4x R$125,00 sem juros",
  "5x R$100,00 sem juros",
];

export const creditHistory = [
  {
    id: 1,
    date: "2025-03-02",
    amount: 512.9,
    type: "debit",
    idOrder: 72957,
  },
  {
    id: 2,
    date: "2025-02-20",
    amount: 150,
    type: "debit",
    idOrder: 85957,
  },
  {
    id: 3,
    date: "2025-02-13",
    amount: 714.6,
    type: "debit",
    idOrder: 72864,
  },
  {
    id: 4,
    date: "2025-02-01",
    amount: 2000,
    type: "credit",
  },
];
