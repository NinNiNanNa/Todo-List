import styled from "styled-components";
import { FiMinusCircle } from "react-icons/fi";
import { IToDo } from "../atoms";

const ToDoText = styled.div`
  display: flex;
  position: relative;
  button {
    padding: 10px;
    display: flex;
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
  }
`;

function ToDo({ text }: IToDo) {
  return (
    <li>
      <ToDoText>
        {text}
        <button>
          <FiMinusCircle />
        </button>
      </ToDoText>
      <ToDoMenus>
        <button>대기</button>
        <button>진행</button>
        <button>완료</button>
      </ToDoMenus>
    </li>
  );
}

export default ToDo;
