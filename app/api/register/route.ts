import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
    };
    const hashed_password = await hash(password, 12);

    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        role: "user",
        active: false,
      },
    });

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active,
      },
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        status: "error",
        message:
          error?.code === "P2002" ? "User already exists" : error.message,
      },
      { status: 500 }
    );
  }
}
