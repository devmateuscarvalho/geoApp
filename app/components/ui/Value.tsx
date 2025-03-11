import { Text } from "react-native";
import styled from "styled-components/native";

interface ValueProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}

export const Value = styled(Text)<ValueProps>`
  font-size: ${(props: ValueProps) => props.fontSize || "14px"};
  font-weight: ${(props: ValueProps) => props.fontWeight || "600"};
  color: ${(props: ValueProps) => props.color || "#000000"};
`;

export default Value;
