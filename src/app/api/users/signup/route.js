import { NextRequest, NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/db";
import User from "../../../models/3dshop";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../../helpers/mailer";

connectMongoDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { name, email, password } = reqBody;
    // validation
    console.log(reqBody);

    // Check if the user is already exists or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json(
        { error: "Email Already Registered" },
        { status: 400 }
      );
    }
    // Generate a salt for Password hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user
    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send varification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({
      message: "User Registered Successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
