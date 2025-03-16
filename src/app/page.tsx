"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomeRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, [router]);

  return null; // Não renderiza nada enquanto redireciona
};

export default HomeRedirect;
