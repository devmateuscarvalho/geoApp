import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import Label from "./Label";
import Value from "./Value";

const RowContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
`;

interface RowProps {
  label: string;
  value: string;
}

const Row = ({ label, value }: RowProps) => (
  <RowContainer>
    <Label>{label}</Label>
    <Value>{value}</Value>
  </RowContainer>
);

export default Row;
