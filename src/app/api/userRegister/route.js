import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/db";
import User from "../../../models/3dShop";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { name, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    return NextResponse.json(
      {
        message: "User Registerd",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error Occurred while Registering the User",
      },
      {
        status: 500,
      }
    );
  }
}
