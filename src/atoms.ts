import { atom, selector } from "recoil";

export const isDarkAtom = atom<boolean>({
  key: "isDark",
  default: false,
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
});

export const selectedCategoryState = atom<string>({
  key: "category",
  default: "대기",
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(selectedCategoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
