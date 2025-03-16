"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";
import { mockFornecedores } from "../api/mocks/fornecedoresMock";
import { fetchFornecedores } from "../api/api";

interface Fornecedor {
  id_fornecedor: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
}

const FornecedorPage = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        

        /*
        // Quando o site do CETEIA estiver funcionando, use este código para buscar os dados da API:
        const data = await fetchFornecedores(); // Usa a função da API
        setFornecedores(data);
        */

        // Enquanto o site do CETEIA está fora do ar, use o mock:
        setFornecedores(mockFornecedores);
      } catch (error) {
        setError("Erro ao carregar fornecedores.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Fornecedores</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : fornecedores.length === 0 ? (
        <p>Nenhum fornecedor cadastrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID Fornecedor</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.id_fornecedor}>
                <td>{fornecedor.id_fornecedor}</td>
                <td>{fornecedor.nome}</td>
                <td>{fornecedor.email}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FornecedorPage;