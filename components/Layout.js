import Head from "next/head";
import styles from "../styles/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Help Helper!",
  keywords: "help, helper, help helper, find helps",
  description: "Find Helps in your area",
};
export default Layout;
