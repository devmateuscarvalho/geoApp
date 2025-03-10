import styled from "styled-components/native";
import { Text } from "react-native";

export const PageTitle = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #1a1a1a;
  text-align: center;
`;

export const SectionTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
`;

export const Subtitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
  color: #2c2c2c;
  border-left-width: 4px;
  border-left-color: #007aff;
  padding-left: 10px;
`;

export const Label = styled(Text)`
  font-size: 16px;
  color: #4a4a4a;
  font-weight: 500;
`;

export const Value = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: #007aff;
`;

export default PageTitle;
