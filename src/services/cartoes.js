import instance from "src/common/config/api";

const cartoesService = {
  buscarPorId: async (usuarioId) => {
    const resposta = await instance.get(`/cartoes?usuarioId=${usuarioId}`);
    return resposta.data;
  },
};

export default cartoesService;
