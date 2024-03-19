import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoriesState, modalState, selectedCategoryState } from "../atoms";
import { useForm } from "react-hook-form";

const ModalContainer = styled.div`
  margin: 40px 20px 0;
  width: 100%;
  max-width: 500px;
  height: 220px;
  border: 3px solid ${(props) => props.theme.modalTextColor};
  border-radius: 15px;
  background-color: ${(props) => props.theme.modalBgColor};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.modalTextColor};
`;
const ModalHeader = styled.div`
  padding: 10px 20px;
  position: relative;
  border-radius: 11px 11px 0 0;
  background-color: #78bea2;
  font-weight: 600;
  font-size: 30px;
  span {
    display: flex;
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 30px;
    color: ${(props) => props.theme.modalTextColor};
    cursor: pointer;
  }
`;
const ModalBody = styled.div`
  padding: 20px;
  span:first-child {
    margin-bottom: 20px;
    display: block;
    text-align: center;
  }
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
    color: ${(props) => props.theme.textColor};
    &:focus {
      border: 3px solid #128e51;
    }
  }
  span:last-child {
    margin-left: 20px;
    font-family: sans-serif;
    font-size: 13px;
    color: ${(props) => props.theme.warningColor};
  }
`;

interface IForm {
  newCategory: string;
}

function Modal() {
  const setOpen = useSetRecoilState(modalState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const setCategory = useSetRecoilState(selectedCategoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const handleValid = ({ newCategory }: IForm) => {
    if (categories.includes(newCategory)) {
      window.alert("이미 존재하는 카테고리 이름입니다.");
      setValue("newCategory", "");
    } else {
      setCategories((oldCategories) => [...oldCategories, newCategory]);
      setCategory(newCategory);
      setOpen(false);
    }
  };
  return (
    <ModalContainer>
      <ModalHeader>
        Category
        <span onClick={() => setOpen(false)}>
          <IoClose />
        </span>
      </ModalHeader>
      <ModalBody>
        <span>새로운 카테고리의 이름을 입력해주세요.</span>
        <form onSubmit={handleSubmit(handleValid)}>
          <input
            {...register("newCategory", {
              required: "내용을 입력해주세요.",
              maxLength: { value: 10, message: "10자 이하로 입력해주세요." },
            })}
            type="text"
            placeholder='내용을 입력하고 "Enter"를 누르세요.'
          />
        </form>
        <span>{errors.newCategory?.message}</span>
      </ModalBody>
    </ModalContainer>
  );
}

export default Modal;
