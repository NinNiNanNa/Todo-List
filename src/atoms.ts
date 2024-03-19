import { atom, selector } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const defaultCategories = ["대기", "진행", "완료"];

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const categoriesState = atom<string[]>({
  key: "categories",
  default: defaultCategories,
});

export const categoryState = atom<string>({
  key: "category",
  default: defaultCategories[0],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
