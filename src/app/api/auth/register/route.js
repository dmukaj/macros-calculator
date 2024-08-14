"use server";

import db from "@/db";
import { connectToDb } from "@/lib/server-helpers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectToDb();
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });
    }

    // const userAlreadyExists = await db.user.findFirst({
    //   where: {
    //     email: email,
    //   },
    // });

    // if (!userAlreadyExists?.id) {
    //   return new NextResponse("user already exists", { status: 500 });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: { email: email, name: name, hashedPassword: hashedPassword },
    });

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.log("oops!!", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
