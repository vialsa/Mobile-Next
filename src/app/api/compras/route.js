// app/api/compras/route.js
const API_URL = "http://ceteia.guanambi.ifbaiano.edu.br:15050/api";

export async function GET() {
  try {
    console.log("Fazendo requisição para:", `${API_URL}/compras`);
    const response = await fetch(`${API_URL}/compras`);
    
    if (!response.ok) {
      console.error("Erro na resposta da API:", response.status, response.statusText);
      return new Response(JSON.stringify({ error: "Erro ao buscar compras." }), { status: 500 });
    }

    const data = await response.json();
    console.log("Dados recebidos da API:", data);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Erro ao conectar à API:", error);
    return new Response(JSON.stringify({ error: "Erro ao conectar à API." }), { status: 500 });
  }
}