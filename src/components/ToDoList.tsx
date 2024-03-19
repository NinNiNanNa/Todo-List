import styled from "styled-components";
import { LuListPlus } from "react-icons/lu";
import { MdSunny } from "react-icons/md";
import { PiMoonFill } from "react-icons/pi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom, toDoState } from "../atoms";
import ToDo from "./ToDo";
import CreateToDo from "./CreateToDo";

const ThemeBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.cardBgColor};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  color: #128e51;
  cursor: pointer;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 500px;
`;
const Title = styled.h1`
  padding: 30px 0;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #128e51;
`;
const MenuWrap = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, auto));
  gap: 20px;
`;
const Menu = styled.li`
  padding: 5px 0;
  text-align: center;
  background-color: ${(props) => props.theme.cardBgColor};
  border: 3px solid ${(props) => props.theme.cardBgColor};
  border-radius: 10px;
  cursor: pointer;
  /* 선택된 메뉴 모습(임시) */
  &:first-child {
    background-color: rgba(18, 142, 81, 0.1);
    border: 3px solid #128e51;
    color: #128e51;
  }
  &:last-child {
    color: #128e51;
  }
`;

const ToDoWrap = styled.ul`
  li {
    margin-bottom: 15px;
    padding: 20px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.cardBgColor};
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.1);
  }
`;

function ToDoList() {
  const setIsDark = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDark((preveMode) => !preveMode);

  const [toDos, setToDos] = useRecoilState(toDoState);
  return (
    <>
      <ThemeBtn onClick={toggleDarkAtom}>
        <PiMoonFill />
      </ThemeBtn>
      <Wrapper>
        <Title>TODO LIST</Title>
        <MenuWrap>
          {/* <Menu /> */}
          <Menu>대기</Menu>
          <Menu>진행</Menu>
          <Menu>완료</Menu>
          <Menu>
            <LuListPlus />
          </Menu>
        </MenuWrap>

        <CreateToDo />

        <ToDoWrap>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ToDoWrap>
      </Wrapper>
    </>
  );
}

export default ToDoList;
