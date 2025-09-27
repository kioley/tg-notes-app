import "zustand/middleware/immer";

declare module "zustand" {
  interface StoreMutators {
    "zustand/immer": never;
  }
}
