import instance from "src/common/config/api";

const itensService = {
  buscar: async () => {
    const resposta = await instance.get("/itens");
    return resposta.data;
  },
  buscarItensDeCategorias: async (nomeCategoria) => {
    const resposta = await instance.get(`/itens?categoria=${nomeCategoria}`);
    return resposta.data;
  },
};
export default itensService;
