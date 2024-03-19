import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { useSetRecoilState } from "recoil";
import { modalState } from "../atoms";

const ModalContainer = styled.div`
  margin: 40px 20px 0;
  width: 100%;
  max-width: 500px;
  height: 200px;
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
  span {
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
    &:focus {
      border: 3px solid #128e51;
    }
  }
`;

function Modal() {
  const setOpen = useSetRecoilState(modalState);
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
        <form>
          <input
            type="text"
            placeholder='내용을 입력하고 "Enter"를 눌러주세요.'
          />
        </form>
      </ModalBody>
    </ModalContainer>
  );
}

export default Modal;
