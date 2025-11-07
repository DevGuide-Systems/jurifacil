export interface TemplateType {
  id: number;
  name: string;
  file: string;
  description?: string;
  category?: string;
}

export const templates: TemplateType[] = [
  { id: 1, name: "BEN. CONT 6", file: "ben-cont-6.docx" },
  { id: 2, name: "Aceite de Acordo", file: "aceite-acordo.docx" },
  { id: 3, name: "Adesão Individual", file: "adesao-individual.docx" },
  { id: 4, name: "BB para BB Pessoa Física", file: "bb-pessoa-fisica.docx" },
  { id: 5, name: "Direção de Prazo", file: "direcao-prazo.docx" },
  { id: 6, name: "Expedição de RPV", file: "expedicao-rpv.docx" },
];