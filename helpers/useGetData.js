import useSWR, { mutate } from "swr";
import { API_URL } from "@/config/index";

const fetcher = (url, token) =>
  fetch(url, {
    headers: token && {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

export const useGetData = (path, token) => {
  if (!path) {
    throw new Error("Path is required");
  }

  const url = API_URL + path;

  const { data, error } = useSWR([url, token], fetcher, {
    revalidateOnFocus: false,
  });
  return { data, error };
};
