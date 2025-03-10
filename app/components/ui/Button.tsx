import styled from "styled-components/native";
import { TouchableOpacity, Text } from "react-native";

export const Button = styled(TouchableOpacity)`
  background-color: #007aff;
  padding: 10px 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled(Text)`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export default Button;
