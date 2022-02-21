import Layout from "@/components/Layout";
import { useState, useContext, useEffect } from "react";
import styles from "@/styles/AuthForm.module.css";
import AuthContext from "@/context/AuthContext";
import { FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, login } = useContext(AuthContext);

  useEffect(() => error && toast.error(error));

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Login
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
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <input type="submit" value="login" className="btn" />
        </form>
        <p>
          Don't have an account?{" "}
          <Link href="/account/register">
            <a>Register</a>
          </Link>
        </p>
        <p>
          <Link href="/account/forgotpassword">
            <a>Forgot Password?</a>
          </Link>
        </p>
      </div>
    </Layout>
  );
}

export default LoginPage;
