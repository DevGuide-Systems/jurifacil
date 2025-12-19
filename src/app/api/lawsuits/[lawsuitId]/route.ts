import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lawsuitId: string }> }
) {
  const { lawsuitId } = await params;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ADVBOX_API_URL}/lawsuits/${lawsuitId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ADVBOX_API_KEY}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
