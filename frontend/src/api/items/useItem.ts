import useSWR from "swr";
import { API_BASE_URL } from "../../config";
import type { iItem } from "../../types";

const fetcher = (url: string): Promise<iItem> =>
  fetch(url).then((res) => res.json());

export const useItem = (itemId: number) => {
  return useSWR<iItem>(`${API_BASE_URL}/items/${itemId}`, fetcher);
};
