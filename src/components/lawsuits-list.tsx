"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { Lawsuits } from "@/types/lawsuits";
import { LawsuitDetails } from "@/types/lawsuitsDetails";

interface CustomerLawsuitsResponse {
  lawsuits: Lawsuits[];
}

export default function LawsuitsList({ customerId }: { customerId: string }) {
  const [lawsuitsDetails, setLawsuitsDetails] = useState<LawsuitDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLawsuits() {
      try {
        setLoading(true);
        setError(null);

        const customerRes = await fetch(`/api/customers/${customerId}`);
        if (!customerRes.ok) {
          throw new Error("Erro ao buscar processos do cliente");
        }

        const customerData: CustomerLawsuitsResponse = await customerRes.json();

        if (!customerData.lawsuits.length) {
          setLawsuitsDetails([]);
          return;
        }

        const detailsPromises = customerData.lawsuits.map((lawsuit) =>
          fetch(`/api/lawsuits/${lawsuit.lawsuit_id}`).then((res) => {
            if (!res.ok) {
              throw new Error(
                `Erro ao buscar detalhes do processo ${lawsuit.lawsuit_id}`,
              );
            }
            return res.json() as Promise<LawsuitDetails>;
          }),
        );

        const details = await Promise.all(detailsPromises);
        setLawsuitsDetails(details);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os processos.");
        setLawsuitsDetails([]);
      } finally {
        setLoading(false);
      }
    }

    loadLawsuits();
  }, [customerId]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Número do processo</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Área</TableHead>
          <TableHead>Fase Atual</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Carregando...
            </TableCell>
          </TableRow>
        )}

        {!loading && error && (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-destructive">
              {error}
            </TableCell>
          </TableRow>
        )}

        {!loading && !error && lawsuitsDetails.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center text-muted-foreground"
            >
              Nenhum processo encontrado
            </TableCell>
          </TableRow>
        )}

        {!loading &&
          !error &&
          lawsuitsDetails.map((details) => (
            <TableRow key={details.id}>
              <TableCell>{details.process_number ?? "Não informado"}</TableCell>
              <TableCell>{details.type ?? "Não informado"}</TableCell>
              <TableCell>{details.group ?? "Não informado"}</TableCell>
              <TableCell>{details.stage ?? "Não informado"}</TableCell>
              <TableCell>
                <Button className="cursor-pointer">Gerar Documento</Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
