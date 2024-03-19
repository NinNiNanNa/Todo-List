import styled from "styled-components";
import { LuListPlus } from "react-icons/lu";
import { LuListX } from "react-icons/lu";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  IToDo,
  categoriesState,
  modalState,
  selectedCategoryState,
  toDoState,
} from "../atoms";

const MenuWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  gap: 20px;
`;
const Menu = styled.li`
  button {
    padding: 5px 0;
    width: 100%;
    text-align: center;
    background-color: ${(props) => props.theme.cardBgColor};
    border: 3px solid ${(props) => props.theme.cardBgColor};
    border-radius: 10px;
    font-family: "Nanum Pen Script";
    font-size: 25px;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    &:disabled {
      background-color: rgba(18, 142, 81, 0.1);
      border: 3px solid #128e51;
      color: #128e51;
      cursor: auto;
    }
  }
`;
const FixedMenuWrap = styled.ul`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40%, auto));
  gap: 20px;
`;
const FixedMenu = styled.li`
  button {
    padding: 5px 0;
    width: 100%;
    text-align: center;
    background-color: ${(props) => props.theme.cardBgColor};
    border: 3px solid ${(props) => props.theme.cardBgColor};
    border-radius: 10px;
    font-family: "Nanum Pen Script";
    font-size: 25px;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
  }
  &:first-child button {
    color: #128e51;
  }
  &:last-child button {
    color: #e00013;
  }
`;

function CategoryBtns() {
  const setOpen = useSetRecoilState(modalState);
  const [category, setCategory] = useRecoilState(selectedCategoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (category: IToDo["category"]) => {
    setCategory(category);
  };

  const addCategory = () => {
    setOpen(true);
  };

  const deleteCategory = () => {
    if (
      window.confirm(
        `선택하신 카테고리 "${category}" 를(을) 정말 삭제하시겠습니까?`
      )
    ) {
      setCategories((prev) =>
        prev.filter((oldcategory) => oldcategory !== category)
      );
      setToDos((prev) => prev.filter((todo) => todo.category !== category));
      setCategory(categories[0] === category ? categories[1] : categories[0]);
    }
  };
  return (
    <>
      <MenuWrap>
        {categories.map((availableCategory) => (
          <Menu key={availableCategory}>
            <button
              onClick={() => onClick(availableCategory)}
              disabled={availableCategory === category}
            >
              {availableCategory}
            </button>
          </Menu>
        ))}
      </MenuWrap>
      <FixedMenuWrap>
        <FixedMenu>
          <button onClick={addCategory}>
            <LuListPlus />
          </button>
        </FixedMenu>
        <FixedMenu>
          <button onClick={deleteCategory}>
            <LuListX />
          </button>
        </FixedMenu>
      </FixedMenuWrap>
    </>
  );
}

export default CategoryBtns;
