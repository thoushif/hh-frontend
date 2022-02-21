import { useGetData } from "@/helpers/useGetData";
import Category from "./Category";

function Categories({ onClickHandler, categoriesSelected }) {
  const { data: categories, error: catError } = useGetData(
    `/api/categories?filters[active]=true&fields[0]=name`
  );
  return (
    <>
      {categories &&
        categories.data.map((cat) => (
          <span key={cat.id} onClick={() => onClickHandler(cat.id)}>
            <Category category={cat} categoriesSelected={categoriesSelected} />
          </span>
        ))}
    </>
  );
}

export default Categories;
