import HelpItem from "@/components/HelpItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function HomePage({ helps }) {
  console.log(helps);
  return (
    <div>
      <Layout>
        <h1>Latest Helps in your area</h1>
        {helps.length === 0 && <h3>No helps found</h3>}
        {helps.map((help) => (
          <HelpItem key={help.id} help={help} />
        ))}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/helps`);
  const helps = await res.json();
  return {
    props: { helps },
  };
}
