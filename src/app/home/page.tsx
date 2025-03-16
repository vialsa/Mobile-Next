"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import styles from "./styles.module.css";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <h1 className={styles.heading}>Bem-vindo à Home do MyApp!</h1>
        <p className={styles.text}>
          Selecione uma das opções na navbar para visualizar as tabelas.
        </p>

      </main>
    </div>
  );
};

export default HomePage;