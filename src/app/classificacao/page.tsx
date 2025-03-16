"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";
import { mockClassificacao } from "../api/mocks/classificacaoMock"; // Importa o mock

interface Classificacao {
  id_classificacao: number;
  id_cliente: number;
  id_produto: number;
  nota: number;
  comentario: string;
  data_classificacao: string;
}

interface Cliente {
  id_cliente: number;
  nome: string;
}

const ClassificacaoPage = () => {
  const [classificacoes, setClassificacoes] = useState<Classificacao[]>([]);
  const [clientes, setClientes] = useState<{ [key: number]: string }>({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Função para buscar o nome do cliente
  const fetchNomeCliente = async (id_cliente: number) => {
    try {
      const response = await fetch(`http://ceteia.guanambi.ifbaiano.edu.br:15050/api/clientes/${id_cliente}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar cliente.");
      }
      const data = await response.json();
      return data.nome; // Retorna o nome do cliente
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      return "Cliente desconhecido"; // Retorna um valor padrão em caso de erro
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        

        /*
        // site nao ta funcionando
        const response = await fetch("http://ceteia.guanambi.ifbaiano.edu.br:15050/api/classificacao");
        if (!response.ok) {
          throw new Error("Erro ao buscar classificações.");
        }
        const data = await response.json();
        setClassificacoes(data);

        // Para cada classificação, busca o nome do cliente
        const clientesMap: { [key: number]: string } = {};
        for (const classificacao of data) {
          const nomeCliente = await fetchNomeCliente(classificacao.id_cliente);
          clientesMap[classificacao.id_cliente] = nomeCliente;
        }
        setClientes(clientesMap);
        */

        // mock simualr os nome dos clientes
        setClassificacoes(mockClassificacao);

       
        const clientesMap: { [key: number]: string } = {
          1: "Jojo",
          2: "PoPO",
          3: "dasdas",
        };
        setClientes(clientesMap);
        //.
      } catch (error) {
        setError("Erro ao carregar classificações.");
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
      <h1 className={styles.heading}>Lista de Classificações</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : classificacoes.length === 0 ? (
        <p>Nenhuma classificação cadastrada.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th> {/* Nome do cliente */}
              <th>ID Produto</th>
              <th>Nota</th>
              <th>Comentário</th>
              <th>Data da Classificação</th>
            </tr>
          </thead>
          <tbody>
            {classificacoes.map((classificacao) => (
              <tr key={classificacao.id_classificacao}>
                <td>{classificacao.id_classificacao}</td>
                <td>{clientes[classificacao.id_cliente] || "Cliente desconhecido"}</td> {/* Exibe o nome do cliente */}
                <td>{classificacao.id_produto}</td>
                <td>{classificacao.nota}</td>
                <td>{classificacao.comentario}</td>
                <td>{new Date(classificacao.data_classificacao).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClassificacaoPage;