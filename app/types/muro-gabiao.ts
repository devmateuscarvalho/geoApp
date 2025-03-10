export interface MuroGabiaoData {
  // Parâmetros de entrada
  alturaDoMuro: number;
  comprimentoDoMuro: number;
  espessuraDoMuro: number;

  // Cálculos básicos
  volumeTotal: number;
  pedrasNecessarias: number;
  malhaDeGabiao: number;
  geotextil: number;
  concretoMagro: number;

  // Custos unitários
  custoUnitarioPedras: number;
  custoUnitarioMalha: number;
  custoUnitarioGeotextil: number;
  custoUnitarioConcretoMagro: number;

  // Custos totais
  custoTotalPedras: number;
  custoTotalMalha: number;
  custoTotalGeotextil: number;
  custoTotalConcretoMagro: number;

  // Custos adicionais
  custoBDI: number;
  custoMaoDeObra: number;
  custoEquipamentos: number;

  // Custo total da obra
  custoTotalObra: number;
}

export interface MuroGabiaoFormErrors {
  alturaDoMuro?: string;
  comprimentoDoMuro?: string;
  espessuraDoMuro?: string;
  volumeTotal?: string;
  pedrasNecessarias?: string;
  malhaDeGabiao?: string;
  geotextil?: string;
  concretoMagro?: string;
}

export const CUSTOS_UNITARIOS = {
  pedras: 65.45,
  malhaGabiao: 205.44,
  geotextil: 26.15,
  concretoMagro: 41.25,
  maoDeObraMontagem: 140.57,
  maoDeObraEscavacao: 60.79,
  aluguelEquipamentos: 99.79,
} as const;

export default {} as {
  MuroGabiaoData: MuroGabiaoData;
  MuroGabiaoFormErrors: MuroGabiaoFormErrors;
};
