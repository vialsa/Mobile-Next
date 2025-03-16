const API_URL = "http://ceteia.guanambi.ifbaiano.edu.br:15050/api";

// Buscar vendas
export const fetchVendas = async () => {
  const response = await fetch(`${API_URL}/vendas`);
  if (!response.ok) throw new Error("Erro ao buscar vendas.");
  return response.json();
};

// Buscar locais
export const fetchLocais = async () => {
  const response = await fetch(`${API_URL}/locais`);
  if (!response.ok) throw new Error("Erro ao buscar locais.");
  return response.json();
};

// Buscar fornecedores
export const fetchFornecedores = async () => {
  const response = await fetch(`${API_URL}/fornecedores`);
  if (!response.ok) throw new Error("Erro ao buscar fornecedores.");
  return response.json();
};

// Buscar compras
export const fetchCompras = async () => {
  const response = await fetch(`${API_URL}/compras`);
  if (!response.ok) throw new Error("Erro ao buscar compras.");
  return response.json();
};

// Buscar clientes
export const fetchClientes = async () => {
  const response = await fetch(`${API_URL}/clientes`);
  if (!response.ok) throw new Error("Erro ao buscar clientes.");
  return response.json();
};

// Buscar produtos
export const fetchProdutos = async () => {
  const response = await fetch(`${API_URL}/produtos`);
  if (!response.ok) throw new Error("Erro ao buscar produtos.");
  return response.json();
};