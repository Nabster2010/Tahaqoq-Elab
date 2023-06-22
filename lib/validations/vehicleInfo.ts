import { z } from "zod";

export const VehicleInfoSchema = z.object({
  vehicleId: z.number(),
  colorId: z.string().nonempty("Color is required"),
  year: z.string().nonempty("Model Year  is required"),
  vehicleTypeId: z.string().nonempty("Model Type is required"),
  category: z.string().default("PASSENGER"),
  condition: z.string().default("USED"),
  fuelType: z.string().default("PETROL"),
  engine: z.string(),
  engineSize: z.string(),
  gear: z.string().default("AUTOMATIC"),
  mileage: z.string().nonempty("Mileage is required"),
  seats: z.string().nonempty("Seats is required"),
  remarks: z.string(),
});
