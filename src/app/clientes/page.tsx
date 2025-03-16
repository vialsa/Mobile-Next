"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";
import { mockClientes } from "../api/mocks/clienteMock";
import { fetchClientes } from "../api/api";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        

        /*
        // site do CETEIA n ta funcionando
        const data = await fetchClientes(); // Usa a função da API
        setClientes(data);
        */

        //mock:
        setClientes(mockClientes);

      } catch (error) {
        setError("Erro ao carregar clientes.");
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
      <h1 className={styles.heading}>Lista de Clientes</h1>
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