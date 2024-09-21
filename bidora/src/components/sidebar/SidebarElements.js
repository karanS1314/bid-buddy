import styled from "styled-components";
import { FaTimes } from "react-icons/fa";


export const CloseIcon = styled(FaTimes)`
  color: #fff;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarMenu = styled.div`
  padding-top: 10rem;
  color: #fff;
  display: grid;
  place-items: center;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
`;
