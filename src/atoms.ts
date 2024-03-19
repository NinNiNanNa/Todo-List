import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isDarkAtom = atom<boolean>({
  key: "isDark",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const modalState = atom<boolean>({
  key: "open",
  default: false,
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["대기", "진행", "완료"],
  effects_UNSTABLE: [persistAtom],
});

export const selectedCategoryState = atom<string>({
  key: "category",
  default: "대기",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(selectedCategoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
