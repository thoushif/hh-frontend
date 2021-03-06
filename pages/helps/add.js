import Layout from "@/components/Layout";
import { API_URL, HELP_AVAILABLE_THRESHOLD } from "@/config/index";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import { useModeSwitch } from "@/context/ModeContext";
import Categories from "@/components/Categories";

function AddPage({ token }) {
  const [mode, setMode] = useModeSwitch();
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  let d = new Date();
  d.setDate(d.getDate() + HELP_AVAILABLE_THRESHOLD);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    description: "",
    date: `${ye}-${mo}-${da}`,
    // time: "12:00 AM",
    is_ask: mode,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
      return;
    }
    const res = await fetch(`${API_URL}/api/helps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: { ...values, categories: categoriesSelected },
      }),
    });
    console.log(res);
    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("You are not authorized to add helps");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const help = await res.json();
      router.push(`/helps/${help.slug}`);
    }
  };
  const onClickHandler = (id) => {
    setCategoriesSelected((categoriesSelected) =>
      categoriesSelected.includes(id)
        ? [...categoriesSelected].filter((item) => item !== id)
        : [...categoriesSelected, id]
    );
  };
  return (
    <Layout title="Add a new help">
      <h1>{mode ? "Asking..." : "Giving..."}</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Help Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="date">
              {mode ? "need by " : "can provide till "}
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              required
              onChange={handleInputChange}
            />
          </div>
          {/* <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              required
              onChange={handleInputChange}
            />
          </div> */}
        </div>
        <Categories
          onClickHandler={onClickHandler}
          categoriesSelected={categoriesSelected}
        />
        {categoriesSelected}
        <div>
          <label htmlFor="description">Help Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            maxLength={1000}
            placeholder={`I ${mode ? "need " : "can provide "}...`}
            value={values.description}
            required
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Add Help" className="btn" />
      </form>
    </Layout>
  );
}

export default AddPage;

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
  return {
    props: {
      token,
    },
  };
}
