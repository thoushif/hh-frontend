import qs from "qs";
import HelpItem from "@/components/HelpItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import Category from "@/components/Category";
import { useContext, useEffect, useState } from "react";
import { useGetData } from "@/helpers/useGetData";
import { useModeSwitch } from "@/context/ModeContext";
import AuthContext from "@/context/AuthContext";
import Categories from "@/components/Categories";
import HandHoldingIcon from "@/components/HandHoldingIcon";

export default function HomePage() {
  const router = useRouter();
  const [mode, setMode] = useModeSwitch();
  const { term } = router.query;
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  const { data: helps, error } = useGetData(
    `/api/helps/search/${mode}/${term}/${
      categoriesSelected.length === 0 ? 0 : categoriesSelected.join(",")
    }`
  );
  const onClickHandler = (id) => {
    setCategoriesSelected((categoriesSelected) =>
      categoriesSelected.includes(id)
        ? [...categoriesSelected].filter((item) => item !== id)
        : [...categoriesSelected, id]
    );
  };
  // const [filters, setFilters] = useState(categories);
  // useEffect(
  //   // // filter helps using filter
  //   // helps &&
  //   //   helps.data.filter((help) => {
  //   //     return filters.every((filter) => {
  //   //       return help.categories.data.some((category) => {
  //   //         return category.attributes.name === filter;
  //   //       });
  //   //     });
  //   //   }),
  //   console.log("filtering helps", filters),
  //   [filters]
  // );
  // const toggleThisFilter = (cat) => {
  //   console.log("filtering helps", cat),
  //     helps &&
  //       helps.data.filter((help) => {
  //         return filters.every((filter) => {
  //           return help.categories.data.some((category) => {
  //             return category.attributes.name === cat;
  //           });
  //         });
  //       });
  // };

  // const toggleThisFilter = (cat) => {
  //   if (filters.includes(cat)) {
  //     setFilters(filters.filter((f) => f !== cat));
  //   } else {
  //     setFilters(filters.concat(cat));
  //   }
  //   console.log("filters", filters);
  // };
  return (
    <div>
      <Layout>
        <h1>Searched Helps for '{router.query.term}' </h1>
        {helps && helps.data && helps.data.length === 0 && (
          <h3>No helps found</h3>
        )}
        <Categories onClickHandler={onClickHandler} />

        {helps && helps.data && helps.data.length > 0 && (
          <>
            {helps.data.map((help) => (
              <HelpItem key={help.id} help={help.attributes} />
            ))}
          </>
        )}
        {error && <div>failed to load</div>}
        {!helps && <div>loading...</div>}
      </Layout>
    </div>
  );
}
