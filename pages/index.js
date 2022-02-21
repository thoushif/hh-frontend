import HelpItem from "@/components/HelpItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index";

export default function HomePage({ helps }) {
  console.log(helps);
  return (
    <div>
      <Layout>
        <h1>Latest Helps</h1>
        {helps && helps.length === 0 && <h3>No helps found</h3>}
        {helps &&
          helps.map((help) => (
            <HelpItem key={help.id} help={help.attributes} />
          ))}
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: "/account/login",
  //       permanent: false,
  //     },
  //   };
  // }
  const res = await fetch(
    `${API_URL}/api/helps?sort[0]=updatedAt:DESC&pagination[start]=0&pagination[limit]=5`
  );

  const helpsData = await res.json();
  console.log("hlps are", helpsData.data);
  const { data: helps } = helpsData;

  return {
    props: { helps },
  };
}
