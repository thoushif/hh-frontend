import HelpItem from "@/components/HelpItem";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function HelpsPage({ helps, page, total }) {
  console.log(helps.data);
  return (
    <div>
      <Layout>
        <h1>All Helps</h1>
        {helps.data && helps.data.length === 0 && <h3>No helps found</h3>}
        {helps.data &&
          helps.data.map((help) => (
            <HelpItem key={help.id} help={help.attributes} />
          ))}
        <Pagination page={page} total={total} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count
  const totalRes = await fetch(`${API_URL}/api/helps/count`);
  const total = await totalRes.json();
  console.log("htotale", total);

  const res = await fetch(
    `${API_URL}/api/helps?sort[0]=date:ASC&pagination[start]=${start}&pagination[limit]=${PER_PAGE}`
  );

  const helps = await res.json();
  console.log("hlps are", helps.data);
  return {
    props: { helps, page: +page, total },
  };
}
