import styled from "styled-components";
import { MdSunny } from "react-icons/md";
import { PiMoonFill } from "react-icons/pi";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom, modalState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import CreateToDo from "./CreateToDo";
import Modal from "./Modal";
import { useRef } from "react";
import CategoryBtns from "./CategoryBtns";

const ThemeBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
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
  position: relative;
  max-width: 500px;
`;
const Title = styled.h1`
  padding: 30px 0;
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #128e51;
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

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

function ToDoList() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDark((preveMode) => !preveMode);
  const toDos = useRecoilValue(toDoSelector);
  const [open, setOpen] = useRecoilState(modalState);
  const modalBackground = useRef<HTMLDivElement>(null);
  return (
    <>
      <ThemeBtn onClick={toggleDarkAtom}>
        {isDark ? <MdSunny /> : <PiMoonFill />}
      </ThemeBtn>
      <Wrapper>
        <Title>TODO LIST</Title>

        <CategoryBtns />

        <CreateToDo />

        <ToDoWrap>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ToDoWrap>
      </Wrapper>

      {open && (
        <ModalWrapper
          ref={modalBackground}
          onClick={(e) => {
            if (e.target === modalBackground.current) {
              setOpen(false);
            }
          }}
        >
          <Modal />
        </ModalWrapper>
      )}
    </>
  );
}

export default ToDoList;
