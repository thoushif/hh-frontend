import styles from "@/styles/Category.module.css";
import { BsDashCircleDotted, BsCheckCircleFill } from "react-icons/bs";
import { iconBase } from "@/helpers/index";
import React from "react";

function Category({ category, categoriesSelected }) {
  return (
    <div className={styles.chip}>
      <div className={styles.chipContent}>
        {!categoriesSelected ? (
          <BsCheckCircleFill className={styles.chipIcon} />
        ) : categoriesSelected.includes(category.id) ? (
          <BsCheckCircleFill className={styles.chipIcon} />
        ) : (
          <BsDashCircleDotted className={styles.chipIcon} />
        )}
      </div>
      <span>{React.createElement(iconBase[category.id])}</span>
      <div className={styles.chipContent}>{category.attributes.name}</div>
    </div>
  );
}

export default Category;
