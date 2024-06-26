import jwt from "jsonwebtoken";

import { NextRequest } from "next/server";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken: any = await jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    );
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
