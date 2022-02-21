import { API_URL } from "@/config/index";
import cookie from "cookie";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { code, password, passwordConfirm: passwordConfirmation } = req.body;
    const strapiRes = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation,
      }),
    });

    const data = await strapiRes.json();
    if (strapiRes.ok) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(data.error.status).json({ message: data.error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ messsage: `Method ${req.method} not allowed` });
  }
}
