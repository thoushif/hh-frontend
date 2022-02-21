import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Dashboardhelp from "@/components/DashboardHelp";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";
import { ToastContainer, toast } from "react-toastify";
import { useGetData } from "@/helpers/useGetData";
import { useModeSwitch } from "@/context/ModeContext";

export default function DashboardPage({ token }) {
  const router = useRouter();
  const [mode, setMode] = useModeSwitch();
  const deletehelp = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/helps/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403 || res.status === 401) {
          toast.error("You are not authorized to add helps");
          return;
        }
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };
  const { data: helps, error: error } = useGetData(
    `/api/helps/me/${mode}`,
    token
  );
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>

        <ToastContainer />
        {helps &&
          helps.data &&
          helps.data.map((hlp) => (
            <Dashboardhelp
              key={hlp.id}
              hlp={hlp.attributes}
              handleDelete={() => deletehelp(hlp.id)}
            />
          ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  if (!token) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }
  // const res = await fetch(`${API_URL}/api/helps/me`, {
  //   method: "GET",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  // const helpsData = await res.json();
  // const { data: helps } = helpsData;
  return {
    props: {
      // helps,
      token,
    },
  };
}
