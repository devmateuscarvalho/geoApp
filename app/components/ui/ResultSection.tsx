import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";

const SectionContainer = styled(View)`
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  elevation: 10;
  shadow-radius: 8px;
  margin-bottom: 30px;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1a1a1a;
  text-align: center;
`;

const ResultSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <SectionContainer>
    <Title>{title}</Title>
    {children}
  </SectionContainer>
);

export default ResultSection;
