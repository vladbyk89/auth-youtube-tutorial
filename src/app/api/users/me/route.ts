import getDataFromToken from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);

    const user = await User.findById(userId).select("-password");

    return NextResponse.json({ message: "User found", user });
  } catch (error: any) {
    return NextResponse.json({ Error: error.message }, { status: 400 });
  }
}
