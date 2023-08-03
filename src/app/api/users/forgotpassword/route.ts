import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.log("No user found");
      return NextResponse.json(
        { Error: "Invalid user token" },
        { status: 400 }
      );
    }

    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified",
      success: true,
      password: user.password,
    });
  } catch (error: any) {
    return NextResponse.json({ Error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { newPassword, oldPassword } = await req.json();

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(newPassword, salt);

    await User.findOneAndUpdate(
      { password: oldPassword },
      { password: hashPassword }
    );

    return NextResponse.json({ message: "Password Updates", success: true });
  } catch (error: any) {
    return NextResponse.json({ Error: error.message }, { status: 500 });
  }
}
