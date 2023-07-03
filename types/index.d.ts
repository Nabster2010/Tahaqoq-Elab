import { z } from "zod";
import { VehicleSchema } from "@/lib/validations/vehicle";
import { CustomerSchema } from "@/lib/validations/customer";
import { ColorSchema } from "@/lib/validations/colors";
import { ManufacturerSchema } from "@/lib/validations/manufacturer";
import { VehicleInfoSchema } from "@/lib/validations/vehicleInfo";
import { BrakeSchema } from "@/lib/validations/brake";
import { SideSlipSchema } from "@/lib/validations/sideSlip";
import { SuspensionSchema } from "@/lib/validations/suspension";
import { EmissionSchema } from "@/lib/validations/emission";
import { HighBeamLevelSchema } from "@/lib/validations/highBeamLevel";
import { VehicleTypeSchema } from "@/lib/validations/vehicleType";
import { VisualInspectionSchema } from "@/lib/validations/visualInspection";
import {
  Brake,
  Broker,
  Color,
  Customer,
  Emission,
  HighBeamLevel,
  Prisma,
  SideSlip,
  Suspension,
  Vehicle,
  VehicleInfo,
  VehicleManufacturer,
  VehicleType,
  VisualInspection,
} from "@prisma/client";

export type VehicleSchemaType = z.infer<typeof VehicleSchema>;
export type CustomerSchemaType = z.infer<typeof CustomerSchema>;
export type BrokerSchemaType = z.infer<typeof BrokerSchema>;
export type ColorSchemaType = z.infer<typeof ColorSchema>;
export type ManufacturerSchemaType = z.infer<typeof ManufacturerSchema>;
export type VehicleInfoSchemaType = z.infer<typeof VehicleInfoSchema>;
export type BrakeSchemaType = z.infer<typeof BrakeSchema>;
export type SideSlipSchemaType = z.infer<typeof SideSlipSchema>;
export type SuspensionSchemaType = z.infer<typeof SuspensionSchema>;
export type EmissionSchemaType = z.infer<typeof EmissionSchema>;
export type HighBeamLevelSchemaType = z.infer<typeof HighBeamLevelSchema>;
export type VehicleTypeSchemaType = z.infer<typeof VehicleTypeSchema>;
export type VisualInspectionSchemaType = z.infer<typeof VisualInspectionSchema>;

export type ExtendedVehicle = Vehicle & {
  visualInspection: VisualInspection;
  vehicleInfo: VehicleInfo & {
    vehicleType: VehicleType & {
      manufacturer: VehicleManufacturer;
    };
    color: Color;
  };
  emissionTest: Emission;
  highBeamLevel: HighBeamLevel;
  brakeTest: Brake;
  sideSlip: SideSlip;
  suspensionTest: Suspension;
  customer: {
    name: string;
    phone?: string;
  };
  broker: Broker;
};

export type ExtendedVehicleType = VehicleType & {
  manufacturer: {
    name: string;
  };
};

import { User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/icons";
import { BrokerSchema } from "@/lib/validations/broker";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };
