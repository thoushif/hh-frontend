import Layout from "@/components/Layout";
import { useState, useContext, useEffect } from "react";
import styles from "@/styles/AuthForm.module.css";
import AuthContext from "@/context/AuthContext";
import { MdPassword } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const { error, forgotpassword } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = async (e) => {
    e.preventDefault();
    forgotpassword({ email });
  };
  return (
    <Layout title="Forgot password? ">
      <div className={styles.auth}>
        <h1>
          <MdPassword /> ? Forgot Password
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <input type="submit" value="Forgot Password" className="btn" />
        </form>
        <p>
          Don't have an account?{" "}
          <Link href="/account/register">
            <a>Register</a>
          </Link>
        </p>
        <p>
          Already have an account?{" "}
          <Link href="/account/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export default ForgotPasswordPage;
