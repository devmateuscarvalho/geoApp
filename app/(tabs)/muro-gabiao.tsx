import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import styled from "styled-components/native";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";
import InputField from "../components/ui/Input";
import ResultSection from "../components/ui/ResultSection";
import Row from "../components/ui/Row";
import {
  CUSTOS_UNITARIOS,
  MuroGabiaoData,
  MuroGabiaoFormErrors,
} from "../types/muro-gabiao";

const Subtitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
  color: #4a4a4a;
  border-left-width: 4px;
  border-left-color: rgb(1, 10, 133);
  padding-left: 10px;
`;

const TotalContainer = styled(View)`
  background-color: rgb(1, 10, 133);
  padding: 20px;
  border-radius: 20px;
  align-items: center;
  margin-top: 20px;
  shadow-color: rgba(
    0,
    0,
    0,
    0.8
  ); /* Aumenta a intensidade do preto para a sombra */
  shadow-offset: 8px 8px; /* Aumenta o deslocamento da sombra para torná-la mais pronunciada */
  shadow-opacity: 0.4; /* Aumenta a opacidade da sombra */
  shadow-radius: 12px; /* Torna a borda da sombra mais suave e ampla */
  elevation: 15; /* Aumenta a intensidade da sombra no Android */
`;

const TotalLabel = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 2px;
`;

const TotalValue = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

const formatarMoeda = (valor: number): string => {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export default function MuroGabiao() {
  const [formData, setFormData] = useState<MuroGabiaoData>({
    alturaDoMuro: 0,
    comprimentoDoMuro: 0,
    espessuraDoMuro: 0,
    volumeTotal: 0,
    pedrasNecessarias: 0,
    malhaDeGabiao: 0,
    geotextil: 0,
    concretoMagro: 0,
    custoUnitarioPedras: CUSTOS_UNITARIOS.pedras,
    custoUnitarioMalha: CUSTOS_UNITARIOS.malhaGabiao,
    custoUnitarioGeotextil: CUSTOS_UNITARIOS.geotextil,
    custoUnitarioConcretoMagro: CUSTOS_UNITARIOS.concretoMagro,
    custoTotalPedras: 0,
    custoTotalMalha: 0,
    custoTotalGeotextil: 0,
    custoTotalConcretoMagro: 0,
    custoBDI: 0,
    custoMaoDeObra: 0,
    custoEquipamentos: 0,
    custoTotalObra: 0,
  });

  const [errors, setErrors] = useState<MuroGabiaoFormErrors>({});
  const [showMaterialCosts, setShowMaterialCosts] = useState(false);
  const [showAdditionalCosts, setShowAdditionalCosts] = useState(false);

  const calcularVolume = () => {
    const volume =
      formData.alturaDoMuro *
      formData.comprimentoDoMuro *
      formData.espessuraDoMuro;

    // Cálculos básicos
    const volumeTotal = Number(volume.toFixed(2));
    const pedrasNecessarias = Number((volume * 1.8).toFixed(2));
    const malhaDeGabiao = Number(
      (formData.alturaDoMuro * formData.comprimentoDoMuro * 2).toFixed(2)
    );
    const geotextil = Number(
      (formData.alturaDoMuro * formData.comprimentoDoMuro * 1.1).toFixed(2)
    );
    const concretoMagro = Number(
      (formData.comprimentoDoMuro * formData.espessuraDoMuro * 0.1).toFixed(2)
    );

    // Cálculos de custos
    const custoTotalPedras = Number(
      (pedrasNecessarias * CUSTOS_UNITARIOS.pedras).toFixed(2)
    );
    const custoTotalMalha = Number(
      (malhaDeGabiao * CUSTOS_UNITARIOS.malhaGabiao).toFixed(2)
    );
    const custoTotalGeotextil = Number(
      (geotextil * CUSTOS_UNITARIOS.geotextil).toFixed(2)
    );
    const custoTotalConcretoMagro = Number(
      (concretoMagro * CUSTOS_UNITARIOS.concretoMagro).toFixed(2)
    );

    // Custos adicionais
    const custoMateriais =
      custoTotalPedras +
      custoTotalMalha +
      custoTotalGeotextil +
      custoTotalConcretoMagro;
    const custoMaoDeObra = Number(
      (malhaDeGabiao * CUSTOS_UNITARIOS.maoDeObraMontagem).toFixed(2)
    );
    const custoEquipamentos = Number(
      (malhaDeGabiao * CUSTOS_UNITARIOS.aluguelEquipamentos).toFixed(2)
    );

    // BDI (20% sobre o total)
    const custoBDI = Number(
      (0.2 * (custoMateriais + custoMaoDeObra + custoEquipamentos)).toFixed(2)
    );

    // Custo total da obra
    const custoTotalObra = Number(
      (custoMateriais + custoMaoDeObra + custoEquipamentos + custoBDI).toFixed(
        2
      )
    );

    setFormData((prev: MuroGabiaoData) => ({
      ...prev,
      volumeTotal,
      pedrasNecessarias,
      malhaDeGabiao,
      geotextil,
      concretoMagro,
      custoTotalPedras,
      custoTotalMalha,
      custoTotalGeotextil,
      custoTotalConcretoMagro,
      custoMaoDeObra,
      custoEquipamentos,
      custoBDI,
      custoTotalObra,
    }));
  };

  const validateField = (name: keyof MuroGabiaoData, value: string) => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      setErrors((prev: MuroGabiaoFormErrors) => ({
        ...prev,
        [name]: undefined,
      }));
      return true;
    }

    const numValue = Number(trimmedValue);

    if (isNaN(numValue)) {
      setErrors((prev: MuroGabiaoFormErrors) => ({
        ...prev,
        [name]: "Valor deve ser um número",
      }));
      return false;
    }

    if (numValue <= 0) {
      setErrors((prev: MuroGabiaoFormErrors) => ({
        ...prev,
        [name]: "O valor deve ser maior que zero",
      }));
      return false;
    }

    setErrors((prev: MuroGabiaoFormErrors) => ({ ...prev, [name]: undefined }));
    return true;
  };

  const handleInputChange = (name: keyof MuroGabiaoData, value: string) => {
    if (validateField(name, value)) {
      setFormData((prev: MuroGabiaoData) => ({
        ...prev,
        [name]: Number(value),
      }));
      if (
        ["alturaDoMuro", "comprimentoDoMuro", "espessuraDoMuro"].includes(name)
      ) {
        calcularVolume();
      }
    }
  };

  return (
    <Container>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <InputField
          label="Altura"
          keyboardType="numeric"
          value={formData.alturaDoMuro.toString()}
          onChangeText={(value) => handleInputChange("alturaDoMuro", value)}
          error={errors.alturaDoMuro}
          width={42.5}
          unit="m"
        />
        <InputField
          label="Comprimento"
          keyboardType="numeric"
          value={formData.comprimentoDoMuro.toString()}
          onChangeText={(value) =>
            handleInputChange("comprimentoDoMuro", value)
          }
          width={42.5}
          error={errors.comprimentoDoMuro}
          unit="m"
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <InputField
          label="Espessura"
          keyboardType="numeric"
          value={formData.espessuraDoMuro.toString()}
          onChangeText={(value) => handleInputChange("espessuraDoMuro", value)}
          error={errors.espessuraDoMuro}
          width={42.5}
          unit="m"
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <ResultSection title="Resultados">
          <Row
            label="Volume Total:"
            value={`${formData.volumeTotal.toLocaleString("pt-BR")} m³`}
          />
          <Pressable
            onPress={() => setShowMaterialCosts(!showMaterialCosts)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Subtitle>Custos dos Materiais</Subtitle>
            <MaterialCommunityIcons
              name={showMaterialCosts ? "minus" : "plus"}
              size={24}
              color="#4A4A4A"
            />
          </Pressable>
          {showMaterialCosts && (
            <Card>
              <Row
                label="Pedras:"
                value={formatarMoeda(formData.custoTotalPedras)}
              />
              <Row
                label="Malha de Gabião:"
                value={formatarMoeda(formData.custoTotalMalha)}
              />
              <Row
                label="Geotêxtil:"
                value={formatarMoeda(formData.custoTotalGeotextil)}
              />
              <Row
                label="Concreto Magro:"
                value={formatarMoeda(formData.custoTotalConcretoMagro)}
              />
            </Card>
          )}

          <Pressable
            onPress={() => setShowAdditionalCosts(!showAdditionalCosts)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Subtitle>Custos Adicionais</Subtitle>
            <MaterialCommunityIcons
              name={showAdditionalCosts ? "minus" : "plus"}
              size={24}
              color="#4A4A4A"
            />
          </Pressable>
          {showAdditionalCosts && (
            <Card>
              <Row
                label="Mão de Obra:"
                value={formatarMoeda(formData.custoMaoDeObra)}
              />
              <Row
                label="Equipamentos:"
                value={formatarMoeda(formData.custoEquipamentos)}
              />
              <Row label="BDI:" value={formatarMoeda(formData.custoBDI)} />
            </Card>
          )}

          <TotalContainer>
            <TotalLabel>Custo Total da Obra</TotalLabel>
            <TotalValue>{formatarMoeda(formData.custoTotalObra)}</TotalValue>
          </TotalContainer>
        </ResultSection>
      </View>
    </Container>
  );
}
