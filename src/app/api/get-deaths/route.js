import { NextResponse } from "next/server";
import { getDeaths } from "@/utils/googleSheets";

export async function GET() {
  try {
    const deaths = await getDeaths();
    return NextResponse.json(deaths, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
