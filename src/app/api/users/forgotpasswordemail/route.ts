import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    
    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json(
        { error: "User does not exists", ok: false },
        { status: 400 }
      );

    await sendEmail({ email, emailType: "FORGOT", userId: user._id });

    return NextResponse.json({ message: "Email sent", ok: true });
  } catch (error: any) {
    return NextResponse.json({ Error: error.message }, { status: 500 });
  }
}
