import React, { ReactNode } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

const StyledContainer = styled(ScrollView)`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
