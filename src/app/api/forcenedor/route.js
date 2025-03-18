import { NextResponse } from "next/server";

const API_URL = "http://ceteia.guanambi.ifbaiano.edu.br:15050/api";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/fornecedores`);
    if (!response.ok) {
      return NextResponse.json({ error: "Erro ao buscar fornecedor." }, { status: 500 });
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao conectar à API." }, { status: 500 });
  }
}
