import cookie from "cookie";
import { BsFillBasket2Fill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { MdMonitor } from "react-icons/md";

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : "");
}

export const iconBase = { 1: BsFillBasket2Fill, 2: FaBook, 3: MdMonitor };
