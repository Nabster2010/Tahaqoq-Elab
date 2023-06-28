//rename to site.ts to activate jed profile

export type SiteConfig = typeof siteConfig;
export const siteConfig = {
  title: "TAHAQOQ ",
  branch: "JEDDAH",
  ar_branch: "جدة",
  address: "Jawhara , Jeddah ,KSA",
  ar_address: " الجوهرة،معارض السيارات،جدة،السعودية",
  phone: "0502956801",
  email: "info@tahaqoq.com",
  description: "VEHICLE INSPECTION CENTER",
  manager: "عبدالعزيز بانواس",
  url: "https://tahaqoq.com/",
  inspectionCenter: "مختبر التحقق الدولية لفحص السيارات بجدة",
  reportLeadingChars: "TJ",
  ogImage: "",
  mainNav: [
    {
      title: "Vehicles",
      href: "/vehicles",
    },

    {
      title: "Customers",
      href: "/customers",
    },
    {
      title: "Colors",
      href: "/colors",
    },
    {
      title: "Manufacturers",
      href: "/manufacturers",
    },
    {
      title: "Models",
      href: "/vehicleTypes",
    },
  ],
  links: {
    twitter: "#",
    github: "#",
  },
  ports: [
    {
      id: 1,
      name: "salwa",
      description: "سلوي",
      code: 41,
    },
    {
      id: 2,
      name: "khafji",
      description: "الخفجي",
      code: 44,
    },
    {
      id: 3,
      name: "batha",
      description: "البطحاء",
      code: 31,
    },
    {
      id: 4,
      name: "King Abdulaziz Sea port",
      description: "جمرك ميناء الملك عبدالعزيز",
      code: 30,
    },
    {
      id: 5,
      name: "Jeddah Islamic Sea port",
      description: "ميناء جدة الاسلامي",
      code: 10,
    },
    {
      id: 6,
      name: "King Fahad Cause way",
      description: "جمرك جسر الملك فهد",
      code: 83,
    },
    {
      id: 7,
      name: "Al Rukae",
      description: "جمرك الرقعي",
      code: 35,
    },
  ],
  paymentMethods: [
    {
      id: 1,
      name: "cash",
      description: "نقدي",
    },
    {
      id: 2,
      name: "credit",
      description: "اجل",
    },
    {
      id: 3,
      name: "Payment Card",
      description: "نقاط بيع",
    },
    {
      id: 4,
      name: "Bank Transfer",
      description: "تحويل بنكي",
    },
  ],
  categories: [
    {
      id: 1,
      name: "PASSENGER",
    },
    {
      id: 2,
      name: "PICKUP",
    },
    {
      id: 3,
      name: "VAN",
    },
    {
      id: 4,
      name: "TRUCK",
    },
    {
      id: 5,
      name: "BUS",
    },
    {
      id: 6,
      name: "M/TRUK",
    },
    {
      id: 7,
      name: "S/TRUCK",
    },
  ],
  conditions: [
    {
      id: 1,
      name: "NEW",
    },
    {
      id: 2,
      name: "USED",
    },
  ],
  fuelTypes: [
    {
      id: 1,
      name: "PETROL",
    },
    {
      id: 2,
      name: "DIESEL",
    },
  ],
  gearTypes: [
    {
      id: 1,
      name: "AUTOMATIC",
    },
    {
      id: 2,
      name: "MANUAL",
    },
  ],
  pageSize: 5,
};
