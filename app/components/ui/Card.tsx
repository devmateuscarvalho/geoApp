import styled from "styled-components/native";
import { View } from "react-native";

export const Card = styled(View)`
  background-color: #fff;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 20px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
`;

export const CardHeader = styled(View)`
  margin-bottom: 15px;
`;

export const CardContent = styled(View)`
  margin-bottom: 15px;
`;

export const CardFooter = styled(View)`
  margin-top: 15px;
  padding-top: 15px;
  border-top-width: 1px;
  border-top-color: #e0e0e0;
`;

export default Card;
