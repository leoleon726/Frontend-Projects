import { NextResponse } from "next/server";
import classes from "./data.json";

export async function GET(request) {
  return NextResponse.json(classes);
}
