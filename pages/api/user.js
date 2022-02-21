import { API_URL } from "@/config/index";
import cookie from "cookie";
export default async function handler(req, res) {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ messsage: `Not Authorized` });
      return;
    }
    const { token } = cookie.parse(req.headers.cookie);
    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "User forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ messsage: `Method ${req.method} not allowed` });
  }
}
