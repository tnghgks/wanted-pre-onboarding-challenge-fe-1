import styled from "styled-components";

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  color: white;
`;

export const ToDoItem = styled.li`
  width: 100%;
  background-color: #ada2ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 10px;
`;

export const Title = styled.span`
  width: 100px;
  text-align: center;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// export const Content = styled.p`
//   width: 80%;
//   text-align: center;
//   font-size: 1.2rem;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// `;
