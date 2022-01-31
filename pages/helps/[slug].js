import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";

function HelpPage() {
  const router = useRouter();
  return (
    <Layout>
      <h1>My Helps Page</h1>
      <h3>{router.query.slug}</h3>
      <button onClick={() => router.push("/")}>Back</button>
    </Layout>
  );
}

export default HelpPage;
