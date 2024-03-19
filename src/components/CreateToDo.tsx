import { useForm } from "react-hook-form";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoryState, toDoState } from "../atoms";

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

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <InputWrap>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "내용을 입력해주세요.",
            maxLength: { value: 20, message: "20자 이하로 입력해주세요." },
          })}
          type="text"
          placeholder={`todo를 입력해주세요.`}
        />
        <button>
          <FaPlus />
        </button>
        <span>{errors.toDo?.message}</span>
      </form>
    </InputWrap>
  );
}

export default CreateToDo;
