import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ msg: "User does not exists", status: 400 });

    console.log(user);

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword)
      return NextResponse.json({ msg: "Invalid pass", status: 400 });

    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
   
    const token = await jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      msg: "user login successful",
      status: 200,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
