import styled from "styled-components/native";
import { TextInput, View, Text } from "react-native";

const InputContainer = styled(View)`
  margin-bottom: 20px;
`;

const InputLabel = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const InputError = styled(Text)`
  font-size: 14px;
  color: #ff3b30;
  margin-top: 5px;
  font-weight: 500;
`;

const StyledInput = styled(TextInput)<{ error?: boolean }>`
  background-color: #fff;
  padding: 15px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ error }: { error?: boolean }) => (error ? "#ff3b30" : "#e0e0e0")};
  font-size: 16px;
  shadow-color: #000;
  shadow-offset-width: 0px;
  shadow-offset-height: 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

interface InputProps {
  label?: string;
  error?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
}

export const InputField = ({ label, error, ...props }: InputProps) => {
  return (
    <InputContainer>
      {label && <InputLabel>{label}</InputLabel>}
      <StyledInput error={Boolean(error)} {...props} />
      {error && <InputError>{error}</InputError>}
    </InputContainer>
  );
};

export default InputField;
