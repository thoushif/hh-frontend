import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

function ForgotPasswordSuccessPage() {
  return (
    <Layout title="Forgot password - Email sent successfully ">
      <div className={styles.auth}>
        <h3>
          Please check your email, a link to reset your password has been sent!
        </h3>

        <p>
          <Link href="/account/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export default ForgotPasswordSuccessPage;
