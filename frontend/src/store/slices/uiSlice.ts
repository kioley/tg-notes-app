import { set, get } from '../index';

// Состояние этого slice
export const uiState = {
  isHighlightMode: false,
  highlightedIds: [] as number[],
  isSaving: false, // Общее состояние загрузки
};

export const enterHighlightMode = () => {
  set((state) => {
    state.isHighlightMode = true;
    state.highlightedIds = [];
  });
};

export const exitHighlightMode = () => {
  set((state) => {
    state.isHighlightMode = false;
    state.highlightedIds = [];
  });
};

export const toggleHighlight = (id: number) => {
  set((state) => {
    const isHighlighted = state.highlightedIds.includes(id);
    if (isHighlighted) {
      state.highlightedIds = state.highlightedIds.filter(
        (highlightId) => highlightId !== id
      );
    } else {
      state.highlightedIds.push(id);
    }
  });
};

export const highlightAll = (ids: number[]) => {
  set((state) => {
    state.highlightedIds = ids;
  });
};

export const highlightAllFolders = () => {
  set((state) => {
    if (!state.isHighlightMode) {
      state.isHighlightMode = true;
    }
    const { folders } = get();
    state.highlightedIds = folders.map((f) => f.id);
  });
};
