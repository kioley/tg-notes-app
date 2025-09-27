import { API_BASE_URL } from "../config";
import type { Folder } from "../types";

// ================= ЧИСТЫЕ API ФУНКЦИИ =================

export const fetchFoldersFromAPI = async (): Promise<Folder[]> => {
  const response = await fetch(`${API_BASE_URL}/folders`);
  if (!response.ok) {
    throw new Error("Failed to fetch folders");
  }
  return response.json();
};

export const createFolderFromAPI = async (
  name: string,
  color: string
): Promise<Folder> => {
  const response = await fetch(`${API_BASE_URL}/folders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  });
  if (!response.ok) {
    throw new Error("Failed to create folder");
  }
  return response.json();
};

export const updateFolderFromAPI = async (
  id: number,
  name: string,
  color: string
): Promise<Folder> => {
  const response = await fetch(`${API_BASE_URL}/folders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, color }),
  });
  if (!response.ok) {
    throw new Error("Failed to update folder");
  }
  return response.json();
};

export const removeFoldersFromAPI = async (
  folderIds: number[]
): Promise<void> => {
  const idsParam = folderIds.join(",");
  const response = await fetch(`${API_BASE_URL}/folders/${idsParam}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete folders");
  }
};
