import { deleteVehicle, getVehicleById, updateVehicle } from "@/lib/db/vehicle";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const vehicle = await getVehicleById(parseInt(params.id));
  return NextResponse.json({ vehicle });
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const vehicle = await updateVehicle(data, parseInt(params.id));
  return NextResponse.json({ vehicle });
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const vehicle = await deleteVehicle(parseInt(params.id));
  return NextResponse.json({ vehicle });
}
