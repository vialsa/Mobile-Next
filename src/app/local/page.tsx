"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";
import { mockLocais } from "../api/mocks/locaisMock";
import { fetchClientes } from "../api/api";

interface Local {
  id_local: number;
  nome: string;
  endereco: string;
}

const LocalPage = () => {
  const [locais, setLocais] = useState<Local[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*
        // API:
        const data = await fetchLocais(); // Usa a função da API
        setLocais(data);
        */

        // mock:
        setLocais(mockLocais);
        
      } catch (error) {
        setError("Erro ao carregar locais.");
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
      <h1 className={styles.heading}>Lista de Locais</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : locais.length === 0 ? (
        <p>Nenhum local cadastrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Endereço</th>
            </tr>
          </thead>
          <tbody>
            {locais.map((local) => (
              <tr key={local.id_local}>
                <td>{local.id_local}</td>
                <td>{local.nome}</td>
                <td>{local.endereco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LocalPage;