import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const id = await getDataFromToken(request);
    const user = await User.findOne({ _id: id }).select("-password");
    if (!user)
      return NextResponse.json({
        msg: "User does not exists ",
        status: 400,
      });
    return NextResponse.json({
      msg: "User found ",
      status: 200,
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
