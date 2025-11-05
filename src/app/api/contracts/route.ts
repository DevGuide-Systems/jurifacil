import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import api from "@/api/apiConfig";

export async function POST(req: Request) {
  try {
    const { template, customerId } = await req.json();

    if (!template || !customerId) {
      return NextResponse.json(
        { error: "Template e customerId são obrigatórios" },
        { status: 400 }
      );
    }

    const response = await api.get(`/customers/${customerId}`);
    const customer = response.data;

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

    doc.setData({
      name: customer.name || " {{name}} ",
      identification: customer.identification || " {{identification}} ",
      document: customer.document || " {{document}} ",
      cellphone: customer.cellphone || " {{cellphone}} ",
      gender: customer.gender || " {{gender}} ",
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

    doc.render();

    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    const outputName = `Contrato-${customer.name.toLowerCase()}-${new Date(Date.now())
      .toLocaleDateString("pt-BR")
      .replace(/\//g, "-")}.docx`;
    const outputPath = path.join(process.cwd(), "public", outputName);
    fs.writeFileSync(outputPath, buffer);
    

    return NextResponse.json({ url: `/${outputName}`, fileName: outputName });
  } catch (err: unknown) {
    console.error("Erro ao gerar contrato:", err);
    return NextResponse.json(
      { error: "Erro ao gerar contrato" },
      { status: 500 }
    );
  }
}
