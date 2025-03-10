import React, { useState } from "react";
import { ScrollView, Alert, View, Text, Platform, Pressable } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MuroGabiaoTypes, {
  MuroGabiaoData,
  MuroGabiaoFormErrors,
  CUSTOS_UNITARIOS,
} from "../types/muro-gabiao";
import InputField from "../components/ui/Input";

const Container = styled(ScrollView)`
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Title = styled(Text)`
  font-size: ${Platform.select({ ios: '22px', android: '24px' })};
  font-weight: bold;
  margin-bottom: 20px;
  color: #1a1a1a;
  text-align: center;
`;

const ResultSection = styled(View)`
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  margin-bottom: 20px;
`;

const ResultTitle = styled(Text)`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #1a1a1a;
  text-align: center;
`;

const ResultSubtitle = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  margin-top: 5px;
  margin-bottom: 3px;
  color: #4a4a4a;
  border-left-width: 4px;
  border-left-color: #4a90e2;
  padding-left: 10px;
`;

const ResultCard = styled(View)`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const ResultRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 3px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const ResultLabel = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: #4a4a4a;
`;

const ResultValue = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: #4a90e2;
`;

const TotalContainer = styled(View)`
  background-color: #4a90e2;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  align-items: center;
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

const SaveButton = styled(View)`
  background-color: #4a90e2;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  press-style: {
    opacity: 0.8;
  }
`;

const SaveButtonText = styled(Text)`
  font-size: 16px;
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
      (formData.alturaDoMuro * formData.comprimentoDoMuro * 2).toFixed(2),
    );
    const geotextil = Number(
      (formData.alturaDoMuro * formData.comprimentoDoMuro * 1.1).toFixed(2),
    );
    const concretoMagro = Number(
      (formData.comprimentoDoMuro * formData.espessuraDoMuro * 0.1).toFixed(2),
    );

    // Cálculos de custos
    const custoTotalPedras = Number(
      (pedrasNecessarias * CUSTOS_UNITARIOS.pedras).toFixed(2),
    );
    const custoTotalMalha = Number(
      (malhaDeGabiao * CUSTOS_UNITARIOS.malhaGabiao).toFixed(2),
    );
    const custoTotalGeotextil = Number(
      (geotextil * CUSTOS_UNITARIOS.geotextil).toFixed(2),
    );
    const custoTotalConcretoMagro = Number(
      (concretoMagro * CUSTOS_UNITARIOS.concretoMagro).toFixed(2),
    );

    // Custos adicionais
    const custoMateriais =
      custoTotalPedras +
      custoTotalMalha +
      custoTotalGeotextil +
      custoTotalConcretoMagro;
    const custoMaoDeObra = Number(
      (malhaDeGabiao * CUSTOS_UNITARIOS.maoDeObraMontagem).toFixed(2),
    );
    const custoEquipamentos = Number(
      (malhaDeGabiao * CUSTOS_UNITARIOS.aluguelEquipamentos).toFixed(2),
    );

    // BDI (20% sobre o total)
    const custoBDI = Number(
      (0.2 * (custoMateriais + custoMaoDeObra + custoEquipamentos)).toFixed(2),
    );

    // Custo total da obra
    const custoTotalObra = Number(
      (custoMateriais + custoMaoDeObra + custoEquipamentos + custoBDI).toFixed(
        2,
      ),
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
    const numValue = Number(value);
    if (isNaN(numValue) || numValue <= 0) {
      setErrors((prev: MuroGabiaoFormErrors) => ({
        ...prev,
        [name]: "Valor inválido",
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
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <View style={{ width: '48%' }}>
          <InputField
            label="Altura (m)"
            keyboardType="numeric"
            value={formData.alturaDoMuro.toString()}
            onChangeText={(value) => handleInputChange("alturaDoMuro", value)}
            placeholder="Digite a altura"
            error={errors.alturaDoMuro}
          />
        </View>
        <View style={{ width: '48%' }}>
          <InputField
            label="Comprimento (m)"
            keyboardType="numeric"
            value={formData.comprimentoDoMuro.toString()}
            onChangeText={(value) => handleInputChange("comprimentoDoMuro", value)}
            placeholder="Digite o comprimento"
            error={errors.comprimentoDoMuro}
          />
        </View>
        <View style={{ width: '100%' }}>
          <InputField
            label="Espessura (m)"
            keyboardType="numeric"
            value={formData.espessuraDoMuro.toString()}
            onChangeText={(value) => handleInputChange("espessuraDoMuro", value)}
            placeholder="Digite a espessura"
            error={errors.espessuraDoMuro}
          />
        </View>
      </View>

      <ResultSection>
        <ResultTitle>Resultados</ResultTitle>

        <ResultRow>
          <ResultLabel>Volume Total:</ResultLabel>
          <ResultValue>
            {formData.volumeTotal.toLocaleString("pt-BR")} m³
          </ResultValue>
        </ResultRow>

        <Pressable onPress={() => setShowMaterialCosts(!showMaterialCosts)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <ResultSubtitle>Custos dos Materiais</ResultSubtitle>
          <MaterialCommunityIcons
            name={showMaterialCosts ? "minus" : "plus"}
            size={24}
            color="#4A4A4A"
          />
        </Pressable>
        {showMaterialCosts && (
          <ResultCard>
            <ResultRow>
              <ResultLabel>Pedras:</ResultLabel>
              <ResultValue>
                {formatarMoeda(formData.custoTotalPedras)}
              </ResultValue>
            </ResultRow>
            <ResultRow>
              <ResultLabel>Malha de Gabião:</ResultLabel>
              <ResultValue>
                {formatarMoeda(formData.custoTotalMalha)}
              </ResultValue>
            </ResultRow>
            <ResultRow>
              <ResultLabel>Geotêxtil:</ResultLabel>
              <ResultValue>
                {formatarMoeda(formData.custoTotalGeotextil)}
              </ResultValue>
            </ResultRow>
            <ResultRow>
              <ResultLabel>Concreto Magro:</ResultLabel>
              <ResultValue>
                {formatarMoeda(formData.custoTotalConcretoMagro)}
              </ResultValue>
            </ResultRow>
          </ResultCard>
        )}

        <Pressable onPress={() => setShowAdditionalCosts(!showAdditionalCosts)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <ResultSubtitle>Custos Adicionais</ResultSubtitle>
          <MaterialCommunityIcons
            name={showAdditionalCosts ? "minus" : "plus"}
            size={24}
            color="#4A4A4A"
          />
        </Pressable>
        {showAdditionalCosts && (
          <ResultCard>
            <ResultRow>
              <ResultLabel>Mão de Obra:</ResultLabel>
              <ResultValue>
                {formatarMoeda(formData.custoMaoDeObra)}
              </ResultValue>
            </ResultRow>
            <ResultRow>
              <ResultLabel>Equipamentos:</ResultLabel>
              <ResultValue>
                {formatarMoeda(formData.custoEquipamentos)}
              </ResultValue>
            </ResultRow>
            <ResultRow>
              <ResultLabel>BDI:</ResultLabel>
              <ResultValue>{formatarMoeda(formData.custoBDI)}</ResultValue>
            </ResultRow>
          </ResultCard>
        )}

        <TotalContainer>
          <TotalLabel>Custo Total da Obra</TotalLabel>
          <TotalValue>{formatarMoeda(formData.custoTotalObra)}</TotalValue>
        </TotalContainer>
      </ResultSection>
    </Container>
  );
} 