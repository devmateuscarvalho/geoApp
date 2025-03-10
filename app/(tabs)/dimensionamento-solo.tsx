import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components/native";

const StyledInput = styled.TextInput`
  height: 40px;
  border-color: ${({ error }: { error?: boolean }) =>
    error ? "#ff3b30" : "#e0e0e0"};
  border-width: 1px;
  padding: 10px;
  border-radius: 8px;
`;

export default function DimensionamentoSolo() {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Aqui você poderá realizar os cálculos de dimensionamento do solo.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
});
