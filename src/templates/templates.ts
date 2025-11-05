export interface TemplateType {
  id: number;
  name: string;
  file: string;
  description?: string;
  category?: string;
}

export const templates: TemplateType[] = [
  { id: 1, name: "Contrato de Honorários Advocatícios", file: "contrato_honorario_advocaticios.docx" },
  { id: 2, name: "Declaração de Hipossuficiência", file: "declaracao_hipossuficiencia.docx" },
  { id: 3, name: "Declaração de Residência", file: "declaracao_residencia.docx" },
  { id: 4, name: "Procuração", file: "procuracao.docx" },
  { id: 5, name: "Termo de Representação e Autorização de Informações Previdenciárias", file: "termo_representacao_autorizacao_informacao.docx" },
  { id: 6, name: "Tempo de Responsabilidade", file: "termo_responsabilidade.docx" },
  { id: 7, name: "Template Teste", file: "template_teste.docx" }
];