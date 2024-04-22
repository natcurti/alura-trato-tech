import instance from "src/common/config/api";

const itensService = {
  buscar: async () => {
    const resposta = await instance.get("/itens");
    return resposta.data;
  },
};

export default itensService;
