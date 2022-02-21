import Link from "next/link";
import { FaPencilAlt, FaTimes, FaGlobeAmericas } from "react-icons/fa";
import { MdPublicOff } from "react-icons/md";
import styles from "@/styles/DashboardHelp.module.css";
import HandHoldingIcon from "./HandHoldingIcon";
import ReactTooltip from "react-tooltip";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function Dashboardhelp({ suggestion, hlp, handleDelete }) {
  //get user
  const user = useContext(AuthContext);
  return (
    <div className={styles.help}>
      <ReactTooltip />

      <h4>
        <Link
          href={suggestion ? "#" : `/helps/${hlp.slug}`}
          style={suggestion ? { pointerEvents: "none" } : null}
        >
          <a>
            <HandHoldingIcon mode={hlp.is_ask} />
            {hlp.name}
          </a>
        </Link>
        {suggestion && (
          <>
            <p> {hlp.description}</p>
          </>
        )}
      </h4>
      {suggestion && (
        <span>
          Added by: {hlp.owner && user ? hlp.owner.username : "Some one"}
        </span>
      )}
      {!suggestion && (
        <>
          <Link href={`/helps/edit/${hlp.slug}`}>
            <a className={styles.edit}>
              <FaPencilAlt /> <span>Edit help</span>
            </a>
          </Link>
          <a
            href="#"
            className={styles.delete}
            onClick={() => handleDelete(hlp.id)}
          >
            <FaTimes /> <span>Delete</span>
          </a>
          <p data-tip="Only verified helps will be public">
            {hlp.verified ? (
              <FaGlobeAmericas size={25} style={{ fill: "black" }} />
            ) : (
              <MdPublicOff size={25} style={{ fill: "red" }} />
            )}
          </p>
        </>
      )}
    </div>
  );
}
