import Layout from "@/components/Layout";
import { useState, useContext, useEffect } from "react";
import AuthContext from "@/context/AuthContext";
import styles from "@/styles/AuthForm.module.css";
import { CgPassword } from "react-icons/cg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/router";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // get code from url using userRouter
  const router = useRouter();
  const { code } = router.query;

  const { resetpassword, error } = useContext(AuthContext);
  useEffect(() => error && toast.error(error));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    console.log(code, password, passwordConfirm);
    resetpassword({ code, password, passwordConfirm });
  };
  return (
    <Layout title="Reset Password">
      <div className={styles.auth}>
        <h1>
          <CgPassword /> Reset Password
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
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
          <div>
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
            ></input>
          </div>
          <input type="submit" value="Reset" className="btn" />
        </form>
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

export default ResetPasswordPage;
