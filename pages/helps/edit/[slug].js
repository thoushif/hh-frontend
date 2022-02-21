import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseCookies } from "@/helpers/index";
import Categories from "@/components/Categories";
import useSWR from "swr";

function EditPage({ help, categories, token }) {
  const router = useRouter();
  let d = new Date(help.date);
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const [categoriesSelected, setCategoriesSelected] = useState(categories);
  const [values, setValues] = useState({
    name: help.name,
    description: help.description,
    date: `${ye}-${mo}-${da}`,
    // time: help.time,
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
    }
    const res = await fetch(`${API_URL}/api/helps/${help.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: { ...values, categories: categoriesSelected },
      }),
    });
    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("You are not authorized to edit this");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const help = await res.json();
      const { attributes } = help.data;
      router.push(`/helps/${attributes.slug}`);
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
    <Layout title="Edit help">
      <h1>Helps - Edit </h1>
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
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
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
              onChange={handleInputChange}
            />
          </div> */}
        </div>
        <Categories
          onClickHandler={onClickHandler}
          categoriesSelected={categoriesSelected}
        />
        <div>
          <label htmlFor="description">Help Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Update Help" className="btn" />
      </form>
    </Layout>
  );
}

export default EditPage;

export async function getServerSideProps({ params: { slug }, req }) {
  const { token } = parseCookies(req);
  if (!token) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }
  const res = await fetch(
    `${API_URL}/api/helps?filters[slug]=${slug}&populate[categories][fields][0]=id&populate[categories][filters][active]=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const helps = await res.json();
  if (res.status === 403 || res.status === 401) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  console.log("helps are", helps);
  console.log("helps are", helps.data[0].attributes);
  const help = {
    ...helps.data[0].attributes,
    id: helps.data[0].id,
  };
  const categories = helps.data[0].attributes.categories.data.map(
    (item) => item.id
  );
  console.log("categories are", categories);
  return {
    props: {
      help,
      categories,
      token,
    },
  };
}
