"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";

interface Cliente {
  id_cliente: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  data_nascimento: string;
}

const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    senha: "", 
    data_nascimento: "",
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await fetch("/api/cliente");
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes.");
      }
      const data = await response.json();
      setClientes(data.clientes);
    } catch (error) {
      setError("Erro ao carregar clientes.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://ceteia.guanambi.ifbaiano.edu.br:15050/api/clientes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      console.log("Resposta da API:", responseData);

      if (response.ok) {
        alert("Cliente cadastrado com sucesso!");
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          endereco: "",
          senha: "",
          data_nascimento: "",
        });
        fetchClientes(); // Atualiza a lista de clientes após o cadastro
      } else {
        alert(`Erro ${response.status}: ${responseData.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Clientes</h1>

      {/* Formulário de cadastro */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Cadastrar cliente</h2>
        <div className={styles.formRow}>
          <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} required />
          <input type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} required />
          <input type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} required />
          <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} required />
          <button type="submit">Salvar</button>
        </div>
      </form>

      {/* Tabela de clientes */}
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Data de Nascimento</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.endereco}</td>
                <td>{new Date(cliente.data_nascimento).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientesPage;
