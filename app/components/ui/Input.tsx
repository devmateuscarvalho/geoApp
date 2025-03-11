import { Dimensions, Text, TextInput, View } from "react-native";
import styled from "styled-components/native";

// Obtendo a largura da tela
const screenWidth = Dimensions.get("window").width;

const InputContainer = styled(View)`
  margin-bottom: 5px;
`;

const InputLabel = styled(Text)`
  font-size: 12px;
  font-weight: 400;
  margin-bottom: 3px;
  color: #333;
`;

const InputError = styled(Text)`
  font-size: 14px;
  color: #ff3b30;
  margin-top: 5px;
  font-weight: 500;
`;

// Tipagem para as propriedades do InputWrapper
interface InputWrapperProps {
  error?: boolean; // Tipo booleano
  width?: number; // Largura como número
}

// No InputWrapper, você deve garantir que a largura seja passada como número, sem unidade
const InputWrapper = styled(View)<InputWrapperProps>`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 5px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ error }: { error?: boolean }) =>
    error ? "#ff3b30" : "#e0e0e0"};
  shadow-color: #200;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 5;
  width: ${({ width }: { width?: number }) =>
    width ? `${(width / 100) * screenWidth}px` : "80%"};
`;

const StyledInput = styled(TextInput)`
  flex: 1;
  font-size: 16px;
`;

const UnitText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #555;
  margin-left: 8px;
`;

interface InputProps {
  label?: string;
  error?: string; // Erro como string
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  unit?: string; // Unidade opcional (ex: "m", "kg", "m²")
  width?: number; // Largura como número
}

export const InputField = ({
  label,
  error,
  unit,
  width, // Largura padrão (80% da largura da tela)
  ...props
}: InputProps) => {
  return (
    <InputContainer>
      {label && <InputLabel>{label}</InputLabel>}
      <InputWrapper error={Boolean(error)} width={width}>
        <StyledInput {...props} />
        {unit && <UnitText>{unit}</UnitText>}
      </InputWrapper>
      {error && <InputError>{error}</InputError>}
    </InputContainer>
  );
};

export default InputField;
