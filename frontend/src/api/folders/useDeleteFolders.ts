import { mutate } from "swr";
import { API_BASE_URL } from "../../config";

interface DeleteFoldersResponse {
  message: string;
  deletedCount: number;
  totalCount: number;
}

async function deleteFolders(
  folderIds: number[]
): Promise<DeleteFoldersResponse> {
  const idsParam = folderIds.join(",");
  const response = await fetch(`/api/folders/${idsParam}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete folders");
  }

  const result = await response.json();

  // Invalidate SWR cache to refresh folders list
  mutate(`${API_BASE_URL}/folders`);

  return result;
}

export function useDeleteFolders() {
  return {
    deleteFolders,
    trigger: deleteFolders, // alias for consistency
  };
}
