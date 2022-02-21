import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Help.module.css";
import "react-toastify/dist/ReactToastify.css";
import Category from "@/components/Category";
import { iconBase, parseCookies } from "@/helpers/index";
import Dashboardhelp from "@/components/DashboardHelp";
import { useModeSwitch } from "@/context/ModeContext";
import React, { useContext } from "react";
import AuthContext from "@/context/AuthContext";
export default function helpPage({ hlp, categories, owner, suggestions }) {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <div className={styles.help}>
        <span>
          {hlp.is_ask ? "need by " : "can provide till "}
          {new Date(hlp.date).toLocaleDateString("en-US")}
        </span>
        <h1>{hlp.name}</h1>
        {/* <ToastContainer /> */}
        {/* {hlp.image && (
          <div className={styles.image}>
            <Image
              src={hlp.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )} */}

        <h3>Description:</h3>
        <p>{hlp.description}</p>
        <h3>Categories: </h3>
        <p>
          {categories &&
            categories.map((cat) => (
              <span key={cat.id}>
                <Category category={cat} categoriesSelected={[cat.id]} />
              </span>
            ))}
        </p>
        <h3>{hlp.is_ask ? "Asking" : "Giving"} By:</h3>

        <p>{owner && user ? owner.attributes.username : "Some one"}</p>
        {suggestions && suggestions.length > 0 && (
          <h3 className={!hlp.is_ask ? styles.askheader : styles.giveheader}>
            Matching helps out there!
          </h3>
        )}
        <p>
          {suggestions &&
            suggestions.length > 0 &&
            suggestions.map((suggestion) => (
              // <span key={suggestion.id}>
              //   <p>{suggestion.name}</p>
              //   <p>{suggestion.description}</p>
              //   <p>Added by: {suggestion.owner.username}</p>
              // </span>
              <Dashboardhelp suggestion key={suggestion.id} hlp={suggestion} />
            ))}
        </p>

        <Link href="/account/dashboard">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req, query: { slug } }) {
  const { token } = parseCookies(req);

  // const res = await fetch(`${API_URL}/api/helps/${slug}`);
  const res = await fetch(
    `${API_URL}/api/helps?filters[slug]=${slug}&populate[categories][*]&populate[owner][fields][0]=username&populate[categories][filters][active]=true`
  );
  const resSuggestions = await fetch(
    `${API_URL}/api/helps/suggestions?slug=${slug}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const helps = await res.json();
  const suggestions = token ? await resSuggestions.json() : [];
  console.log(helps);
  console.log("suggestions", suggestions);
  const help = { ...helps.data[0].attributes, id: helps.data[0].id };
  const categories = helps.data[0].attributes.categories.data;
  const owner = helps.data[0].attributes.owner.data;

  return {
    props: {
      hlp: help,
      categories,
      owner,
      suggestions,
    },
  };
}
