import styled from "styled-components";
import { FiMinusCircle } from "react-icons/fi";
import { IToDo, categoriesState, toDoState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

const ToDoText = styled.div`
  display: flex;
  position: relative;
  button {
    padding: 10px;
    display: flex;
    z-index: 1;
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 25px;
    color: ${(props) => props.theme.warningColor};
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
const ToDoMenus = styled.div`
  margin-top: 15px;
  display: flex;
  flex-flow: wrap;
  gap: 10px;
  button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #f5efda;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #dcdcdc;
    }
    &:disabled {
      cursor: auto;
    }
  }
`;

function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: newCategory };
      console.log(oldToDo, newToDo);

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const deleteToDo = (toDo: IToDo["text"]) => {
    if (window.confirm(`${toDo} 를(을) 정말 삭제하시겠습니까?`)) {
      setToDos((oldToDos) => {
        const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      });
    }
  };
  return (
    <li>
      <ToDoText>
        {text}
        <button onClick={() => deleteToDo(text)}>
          <FiMinusCircle />
        </button>
      </ToDoText>
      <ToDoMenus>
        {Object.values(categories).map((availableCategory) => (
          <button
            key={availableCategory}
            onClick={() => onClick(availableCategory)}
            disabled={availableCategory === category}
          >
            {availableCategory}
          </button>
        ))}
      </ToDoMenus>
    </li>
  );
}

export default ToDo;
