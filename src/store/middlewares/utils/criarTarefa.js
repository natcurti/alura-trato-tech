import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

const criarTarefa = async ({
  fork,
  dispatch,
  action,
  busca,
  textoCarregando,
  textoSucesso,
  textoErro,
}) => {
  toast({
    title: "Carregando",
    description: textoCarregando,
    duration: 500,
    isClosable: true,
    status: "loading",
  });
  const tarefa = fork(async (api) => {
    await api.delay(1000);
    return await busca();
  });

  const resposta = await tarefa.result;
  if (resposta.status === "ok") {
    toast({
      title: "Sucesso!",
      description: textoSucesso,
      duration: 1000,
      isClosable: true,
      status: "success",
    });
    dispatch(action(resposta.value));
  }
  if (resposta.status === "rejected") {
    toast({
      title: "Erro",
      description: textoErro,
      duration: 500,
      isClosable: true,
      status: "error",
    });
  }

  return resposta;
};

export default criarTarefa;
