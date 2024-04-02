import { connect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/utils/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody)

    const user = await User.findOne({ email });

    if (user)
      return NextResponse.json({ msg: "user already exists", status: 400 });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      msg: "User registered successfully",
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
