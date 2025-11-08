import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { getCustomerById } from "@/api/customers/customers";

export async function POST(req: Request) {
  try {
    const { template, customerId } = await req.json();

    if (!template || !customerId) {
      return NextResponse.json(
        { error: "Template e customerId são obrigatórios" },
        { status: 400 }
      );
    }

    const customer = await getCustomerById(customerId);

    const gender = customer.gender || "";
    let nationality = "BRASILEIRO";
    if (gender.toUpperCase() === "F") {
      nationality = "BRASILEIRA";
    }

    const templatePath = path.join(
      process.cwd(),
      "src",
      "templates",
      "documents",
      template
    );

    const content = fs.readFileSync(templatePath);
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      syntax: {
        allowUnopenedTag: true,
      },
      delimiters: {
        start: "{{",
        end: "}}",
      },
    });

    doc.render({
      name: customer.name || " {{name}} ",
      identification: customer.identification || " {{identification}} ",
      document: customer.document || " {{document}} ",
      cellphone: customer.cellphone || " {{cellphone}} ",
      gender: customer.gender || " {{gender}} ",
      nationality,
      civilstatus: customer.civil_status || " {{civilstatus}} ",
      phone: customer.phone || " {{phone}} ",
      email: customer.email || " {{email}} ",
      occupation: customer.occupation || " {{occupation}} ",
      street: customer.street || " {{street}} ",
      postalcode: customer.postalcode || " {{postalcode}} ",
      region: customer.region || " {{region}} ",
      city: customer.city || " {{city}} ",
      state: customer.state || " {{state}} ",
      country: customer.country || " {{country}} ",
      birthdate: customer.birthdate || " {{birthdate}} ",
      numberctps: customer.number_ctps || " {{numberctps}} ",
      numberpis: customer.number_pis || " {{numberpis}} ",
      numbercid: customer.number_cid || " {{numbercid}} ",
      notes: customer.notes || " {{notes}} ",
      origin: customer.origin || " {{origin}} ",
      created_at: customer.created_at || " {{created_at}} ",
      date: new Date(Date.now()).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });

    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    const templateName = path.basename(template, path.extname(template));
    const customerName = customer.name.replace(/\s+/g, "_").toLowerCase();
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "");

    const fileName = `${templateName}-${customerName}-${date}.docx`;

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      },
    });
  } catch (err: unknown) {
    console.error("Erro ao gerar contrato:", err);
    return NextResponse.json(
      { error: "Erro ao gerar contrato" },
      { status: 500 }
    );
  }
}
