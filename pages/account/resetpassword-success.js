import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

function ResetPasswordSuccessPage() {
  return (
    <Layout title="Reset password - successfully ">
      <div className={styles.auth}>
        <h3>Reset password - success!</h3>

        <p>
          <Link href="/account/login">
            <a>Login Now</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export default ResetPasswordSuccessPage;
