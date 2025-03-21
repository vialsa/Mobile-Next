"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";
import { mockCompras } from "../api/mocks/comprasMock";
import { fetchClientes } from "../api/api";

interface Compra {
  id_compra: number;
  id_fornecedor: number;
  data_compra: string;
  valor_total: number;
}

const ComprasPage = () => {
  const [compras, setCompras] = useState<Compra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch("/api/compras");
        if (!response.ok) {
          throw new Error("Erro ao buscar compras.");
        }
        const data = await response.json();
        setCompras(data.compras); // Ajuste conforme a resposta da API
      } catch (error) {
        setError("Erro ao carregar compras.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompras();
  }, []);

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Lista de Compras</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : compras.length === 0 ? (
        <p>Nenhuma compra cadastrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Fornecedor</th>
              <th>Data da Compra</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.id_compra}>
                <td>{compra.id_compra}</td>
                <td>{compra.id_fornecedor}</td>
                <td>{new Date(compra.data_compra).toLocaleString()}</td>
                <td>R$ {Number(compra.valor_total).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComprasPage;