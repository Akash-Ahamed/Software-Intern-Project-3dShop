import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/db";
import User from "../../../models/3dShop";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectMongoDB();
    const { name, email, password } = await request.json();

    // Check if the user is already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse(
        {
          message: "Email Already Registered",
        },
        {
          status: 400,
        }
      );
    }

    // If user not exist, than create a new user
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
        message: "Email Already Registered",
      },
      {
        status: 500,
      }
    );
  }
}
