import { create } from "zustand";
import { Node } from "reactflow";

interface NodeStore {
  currentNode: Node | null;
  setCurrentNode: (node: Node | null) => void;
}

const useNodeStore = create<NodeStore>((set) => ({
  currentNode: null,
  setCurrentNode: (node: Node | null) => set({ currentNode: node }),
}));

export default useNodeStore;
