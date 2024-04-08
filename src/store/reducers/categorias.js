import { createSlice } from "@reduxjs/toolkit";
import automotivoThumb from "src/assets/categorias/thumbnail/automotivo-thumb.png";
import eletronicosThumb from "src/assets/categorias/thumbnail/eletronicos-thumb.png";
import escritorioThumb from "src/assets/categorias/thumbnail/escritorio-thumb.png";
import jogosThumb from "src/assets/categorias/thumbnail/jogos-thumb.png";
import somThumb from "src/assets/categorias/thumbnail/som-thumb.png";
import automotivoHeader from "src/assets/categorias/header/automotivo.png";
import eletronicosHeader from "src/assets/categorias/header/eletronicos.png";
import escritorioHeader from "src/assets/categorias/header/escritorio.png";
import jogosHeader from "src/assets/categorias/header/jogos.png";
import somHeader from "src/assets/categorias/header/som.png";

const estadoInicial = [
  {
    nome: "Eletrônicos",
    thumbnail: eletronicosThumb,
    header: eletronicosHeader,
    id: "eletronicos",
    descricao: "Os melhores e mais atuais dispositivos eletrônicos estão aqui!",
  },
  {
    nome: "Automotivo",
    thumbnail: automotivoThumb,
    header: automotivoHeader,
    id: "automotivos",
    descricao:
      "Encontre aqui equipamentos para deixar seu carro com a sua cara!",
  },
  {
    nome: "Jogos",
    thumbnail: jogosThumb,
    header: jogosHeader,
    id: "jogos",
    descricao: "Adquira os consoles e jogos mais atuais do mercado !",
  },
  {
    nome: "Escritório",
    thumbnail: escritorioThumb,
    header: escritorioHeader,
    id: "escritorio",
    descricao: "Tudo para o que escritório ficar incrível!",
  },
  {
    nome: "Som e imagem",
    thumbnail: somThumb,
    header: somHeader,
    id: "som",
    descricao: "Curta suas músicas e seus filmes com a melhor qualidade!",
  },
];

const categoriasSlice = createSlice({
  name: "categorias",
  initialState: estadoInicial,
});

export default categoriasSlice.reducer;
