import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/HelpItem.module.css";

export default function HelpItem({ help }) {
  return (
    <div className={styles.help}>
      <div className={styles.img}>
        {/* <Image
          src={
            help.image
              ? help.image.formats.thumbnail.url
              : "/images/showcase.jpg"
          }
          width={170}
          height={100}
        /> */}
      </div>

      <div className={styles.info}>
        <span>
          {new Date(help.date).toLocaleDateString("en-US")} at {help.time}
        </span>
        <h3>{help.name}</h3>
      </div>

      <div className={styles.link}>
        <Link href={`/helps/${help.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
