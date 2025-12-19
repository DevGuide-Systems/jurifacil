import { NextResponse } from "next/server";
import axios from "axios";

interface RouteParams {
  customerId: string;
}

export async function GET(
  _req: Request,
  context: { params: Promise<RouteParams> }
) {
  const { customerId } = await context.params;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ADVBOX_API_URL}/customers/${customerId}`,
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
