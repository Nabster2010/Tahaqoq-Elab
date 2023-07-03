export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  // JEDDAH
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
    {
      title: "Broker",
      href: "/brokers",
    },
  ],
  links: {
    twitter: "#",
    github: "#",
  },

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
  pageSize: 10,
};
