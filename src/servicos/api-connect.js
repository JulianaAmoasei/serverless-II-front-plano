import geraUrlPreassinada from "./s3-generateURL";
const BASE_URL = "http://curso-serverless2-api-785671386.us-east-1.elb.amazonaws.com";

function buildFetchObj(metodo, contentType, body) {
  return ({
    method: metodo,
    headers: {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "PUT,POST,GET",
    },
    body: body,
  });
}

async function criaRegistro(novoRegistro) {
  const fetchObj = buildFetchObj("POST", "application/json", JSON.stringify(novoRegistro))
  try {
    const res = await fetch(`${BASE_URL}/alunos`, fetchObj);
    return res.json();
  } catch (erro) {
    return erro;
  }
}

async function enviaArquivoViaURL(url, arquivo) {
  const fetchObj = buildFetchObj("PUT", "text/csv; charset=utf-8", arquivo)
  try {
    const res = await fetch(url, fetchObj);
    if (res.status === 200) {
      return "operação efetuada com sucesso"
    } else {
      return "algo deu errado"
    }
  } catch (erro) {
    return erro;
  }
}

async function geraPresignURL(nomeArquivo) {
  const urlChave = await geraUrlPreassinada(nomeArquivo);
  return urlChave;
}

export { criaRegistro, enviaArquivoViaURL, geraPresignURL };
