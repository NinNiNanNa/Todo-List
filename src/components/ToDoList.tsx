import styled from "styled-components";
import { LuListPlus } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import { MdSunny } from "react-icons/md";
import { PiMoonFill } from "react-icons/pi";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { useForm } from "react-hook-form";

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

const InputWrap = styled.div`
  margin: 30px 0 20px;
  position: relative;

  input {
    padding: 0 20px;
    width: 100%;
    height: 48px;
    outline: none;
    border: 3px solid transparent;
    border-radius: 10px;
    background-color: ${(props) => props.theme.cardBgColor};
    box-shadow: 0 3px 3px rgba(10, 10, 10, 0.1);
    font-size: 15px;
    &:focus {
      border: 3px solid #128e51;
    }
  }
  button {
    padding: 12px 20px;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    font-size: 25px;
    color: #128e51;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  span {
    margin-left: 20px;
    font-family: sans-serif;
    font-size: 13px;
    color: ${(props) => props.theme.warningColor};
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

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

function ToDoList() {
  const setIsDark = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setIsDark((preveMode) => !preveMode);

  const [toDos, setToDos] = useRecoilState(toDoState);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  console.log(toDos);

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
        <InputWrap>
          <form onSubmit={handleSubmit(handleValid)}>
            <input
              {...register("toDo", { required: "내용을 입력해주세요." })}
              type="text"
              placeholder={`todo를 입력해주세요.`}
            />
            <button>
              <FaPlus />
            </button>
            <span>{errors.toDo?.message}</span>
          </form>
        </InputWrap>
        <ToDoWrap>
          {toDos.map((toDo) => (
            <li key={toDo.id}>
              <ToDoText>
                {toDo.text}
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
          ))}
        </ToDoWrap>
      </Wrapper>
    </>
  );
}

export default ToDoList;
