// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
// import EventMap from '@/components/EventMap'
import { API_URL } from "@/config/index";
import styles from "@/styles/help.module.css";
import { useRouter } from "next/router";

export default function helpPage({ hlp }) {
  const router = useRouter();

  return (
    <Layout>
      <div className={styles.help}>
        <span>
          {new Date(hlp.date).toLocaleDateString("en-US")} at {hlp.time}
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

        <h3>Performers:</h3>
        <p>{hlp.performers}</p>
        <h3>Description:</h3>
        <p>{hlp.description}</p>
        <h3>Venue: {hlp.venue}</h3>
        <p>{hlp.address}</p>

        {/* <helpMap hlp={hlp} /> */}

        <Link href="/helps">
          <a className={styles.back}>{"<"} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/api/helps/${slug}`);
  // const res = await fetch(`${API_URL}/helps?slug=${slug}`);
  const helps = await res.json();

  return {
    props: {
      hlp: helps[0],
    },
  };
}
