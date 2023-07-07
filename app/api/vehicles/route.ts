import { authOptions } from "@/lib/auth";
import { getPaginatedVehicles, createVehicle } from "@/lib/db/vehicle";
import { SearchParamsType } from "@/types";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = Object.fromEntries(req.nextUrl.searchParams);

  const { vehicles, currentPage, error, totalPages } =
    await getPaginatedVehicles(searchParams as SearchParamsType);
  if (error) return NextResponse.json({ error }, { status: 400 });
  return NextResponse.json({ vehicles, currentPage, totalPages });
}
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const data = await req.json();
  if (!session) return NextResponse.json({ error: "Unauthorized" });
  const vehicle = await createVehicle(data, session.user.id);
  return NextResponse.json({ vehicle });
}
