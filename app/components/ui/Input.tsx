import styled from "styled-components/native";
import { TextInput, View, Text } from "react-native";

export const InputContainer = styled(View)`
  margin-bottom: 20px;
`;

export const StyledInput = styled(TextInput)`
  height: 40px;
  border-color: ${({ error }: { error?: boolean }) =>
    error ? "#ff3b30" : "#e0e0e0"};
  border-width: 1px;
  padding: 10px;
  border-radius: 8px;
`;

export const InputLabel = styled(Text)`
  font-size: 16px;
  color: #4a4a4a;
  margin-bottom: 5px;
`;

export const InputError = styled(Text)`
  font-size: 14px;
  color: #ff3b30;
  margin-top: 5px;
`;

export default InputContainer;