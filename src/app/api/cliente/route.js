const API_URL = "http://ceteia.guanambi.ifbaiano.edu.br:15050/api";

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/clientes`);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Erro ao buscar clientes." }), { status: 500 });
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Erro ao conectar à API." }), { status: 500 });
  }
}