import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/HelpItem.module.css";
import React, { useContext, useDebugValue } from "react";
import AuthContext from "@/context/AuthContext";
import { iconBase } from "../helpers";

export default function HelpItem({ help }) {
  const { user } = useContext(AuthContext);
  return (
    <div className={`${styles.help} ${help.is_ask ? styles.ask : styles.give}`}>
      {/* <div className={styles.img}>
       <Image
          src={
            help.image
              ? help.image.formats.thumbnail.url
              : "/images/showcase.jpg"
          }
          width={170}
          height={100}
        /> 
      </div>*/}

      <div className={styles.info}>
        {help.owner && user
          ? help.owner.data.attributes.username
          : " Some one "}
        {help.is_ask ? "need" : "can provide"}
        <h3>{help.name}</h3>
        {help.is_ask ? "by " : "till "}
        <span>{new Date(help.date).toLocaleDateString("en-US")}</span>
        <span>
          {" "}
          {help.categories &&
            help.categories.data.map((cat) => (
              <span key={cat.id}>
                {React.createElement(iconBase[cat.id])} {cat.attributes.name}
              </span>
            ))}
          {/* <MdMonitor /> <BsFillBasket2Fill /> <FaBook /> */}
        </span>
      </div>
      <div className={styles.link}>
        <Link href={`/helps/${help.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
