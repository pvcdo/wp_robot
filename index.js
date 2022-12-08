const wppconnect = require('@wppconnect-team/wppconnect');

var userStages = []

const querVer = 
`
Escolha o que quer ver:

1 - Linkedin
2 - Github
3 - Lista de cursos
4 - Currículo
`

wppconnect.create({
  session: 'whatsbot',
  autoClose: false,
  puppeteerOptions: { args: ['--no-sandbox'] }
})
  .then((client) =>
    client.onMessage((message) => {
      stages(client, message);
    }))
  .catch((error) =>
    console.log(error));

async function stages(client, message) {
  const interlocutor = message.from
  let stage = userStages[interlocutor];
  switch (stage) {
    case 'Nome':
      const nome = message.body;
      await sendWppMessage(client, interlocutor, 'Ótimo, ' + nome);
      await sendWppMessage(client, interlocutor, querVer);
      userStages[interlocutor] = 'Quer_ver';
      break;
    case 'Quer_ver':
      const escolha = message.body;
      switch(escolha){
        case "1":
          await sendWppMessage(client,interlocutor,"Ótima escolha! Vou enviar o link do linkedin do senhor Paulo!");
          await sendWppMessage(client,interlocutor,"https://www.linkedin.com/in/opaulo");
          break;
        case "2":
          await sendWppMessage(client,interlocutor,"Perfeito! Vou enviar o link do github do senhor Paulo!");
          await sendWppMessage(client,interlocutor,"https://www.github.com/pvcdo");
          break;
        case "3":
          await sendWppMessage(client,interlocutor,"Você vai adorar! Vou enviar o link da pasta do drive com os certificados!");
          await sendWppMessage(client,interlocutor,"https://drive.google.com/drive/u/0/folders/1uZe9uJJl6Fqv6BgM-CEWFTAFgWcq-jn5");
          break;
        case "4":
          await sendWppMessage(client,interlocutor,"Muito bem! Vou enviar o link do currículo do senhor Paulo!");
          await sendWppMessage(client,interlocutor,"https://drive.google.com/file/d/1qC4WAk8Er9i_Nxfyk-OL_U-YrmQcGVgf/view?usp=sharing");
          break;
        default:
          await sendWppMessage(client,interlocutor,"Você não escolheu nada, vou finalizar!");
          break;
      }
      userStages[interlocutor] = 'Fim';
      break;
    case 'Fim':
      await sendWppMessage(client, interlocutor, 'Fim');
      break;
    default: // Olá 
      console.log('*Usuário atual* from:' + interlocutor);
      await sendWppMessage(client, interlocutor, 'Olá! Seja bem-vindo ao robô da PVC Digital!');
      await sendWppMessage(client, interlocutor, 'Qual seu nome?');
      userStages[interlocutor] = 'Nome';
  }
}

function sendWppMessage(client, sendTo, text) {
  return new Promise((resolve,reject) => {
    client
    .sendText(sendTo, text)
    .then((result) => {
      resolve()
    })
    .catch((erro) => {
      console.error('ERRO: ', erro);
      reject()
    });
  }) 
}