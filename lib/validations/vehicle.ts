import { z } from "zod";

export const VehicleSchema = z.object({
  vin: z
    .string()
    .min(17, { message: "Please enter a valid VIN . min length 17 digits" })
    .max(17, { message: "Please enter a valid VIN . max length 17 digits" }),
  reqNo: z.string().nonempty("Request number is required"),
  reqDate: z.string().nonempty("Request Date is required"),
  bayanNo: z.string().nonempty("Bayan number is required"),
  bayanDate: z.string().nonempty("Bayan Date  is required"),
  port: z.string().nonempty("Custom Port is required"),
  paymentType: z.string().nonempty("Payment Type is required"),
  price: z.number({ required_error: "Price is required" }),
  tax: z.number({ required_error: "VAT amount is required" }),
  customerId: z.string().nonempty("You should select a customer"),
  brokerId: z.string(),
});
