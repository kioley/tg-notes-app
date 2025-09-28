import { API_BASE_URL } from "../config";
import type { iItem } from "../types";

// ================= ЧИСТЫЕ API ФУНКЦИИ =================

export const fetchItems = async (folderId: number): Promise<iItem[]> => {
  const response = await fetch(`${API_BASE_URL}/folders/${folderId}/items`);
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  const items = await response.json();

  return items;
};

export const fetchItem = async (itemId: number): Promise<iItem> => {
  const response = await fetch(`${API_BASE_URL}/items/${itemId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch item");
  }
  return response.json();
};

export const createItem = async (item: {
  title: string;
  content: string;
  folderId: number;
  type: string;
}): Promise<iItem> => {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error("Failed to create item");
  }
  return response.json();
};

export const updateItem = async (
  itemId: number,
  data: { title: string; content: string }
): Promise<iItem> => {
  const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update item");
  }
  return response.json();
};

export const deleteItems = async (itemIds: number[]): Promise<void> => {
  const idsParam = itemIds.join(",");
  const response = await fetch(`${API_BASE_URL}/items/${idsParam}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete items");
  }
};
