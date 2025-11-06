"use client";

import { useState } from "react";
import { templates } from "@/templates/templates";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface ContractSelectorProps {
  customerId: string;
}

export default function ContractSelector({
  customerId,
}: ContractSelectorProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateDocx = async () => {
    if (selected.length === 0) return;

    setLoading(true);
    try {
      for (const id of selected) {
        const template = templates.find((t) => t.id === id);
        const res = await fetch("/api/contracts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ template: template?.file, customerId }),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Erro ao gerar contrato");
        }
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const disposition = res.headers.get("Content-Disposition");
        const match = disposition?.match(/filename="(.+)"/);
        const fileName = match ? match[1] : "contrato.docx";
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // const handleGeneratePdf = async () => {
  //   if (selected.length === 0) return;

  //   setLoading(true);
  //   try {
  //     const selectedTemplates = templates
  //       .filter((t) => selected.includes(t.id))
  //       .map((t) => t.file);

  //     const res = await fetch("/api/pdfs", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ customerId, templates: selectedTemplates }),
  //     });

  //     const data = await res.json();
  //     if (!res.ok) throw new Error(data.error || "Erro ao gerar PDF");

  //     window.open(data.pdfUrls[0], "_blank");
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex flex-col gap-6 space-y-2 md:mx-20 lg:mx-60">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            onClick={() =>
              setSelected((prev) =>
                prev.includes(template.id)
                  ? prev.filter((id) => id !== template.id)
                  : [...prev, template.id]
              )
            }
            className={`cursor-pointer transition-all ${
              selected.includes(template.id)
                ? "border-blue-500 ring-2 ring-blue-300"
                : "hover:border-blue-200"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {template.name}
                {selected.includes(template.id) && (
                  <CheckCircle2 className="text-blue-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Modelo padrão de {template.name.toLowerCase()}.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button
          disabled={selected.length === 0 || loading}
          onClick={handleGenerateDocx}
          className="cursor-pointer bg-[var(--blue-secondary)] hover:bg-[var(--blue-primary)]"
        >
          {loading ? "Gerando..." : "Gerar DOCX(s)"}
        </Button>

        {/* <Button
          disabled={selected.length === 0 || loading}
          onClick={handleGeneratePdf}
          className="cursor-pointer bg-green-600 hover:bg-green-700"
        >
          {loading ? "Gerando..." : "Gerar PDF Completo"}
        </Button> */}
      </div>
    </div>
  );
}
