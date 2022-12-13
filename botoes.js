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
  session:"whatsbot",
  autoClose: 60000,
  puppeteerOptions: { args: ['--no-sandbox'] }
})
  .then((client) =>{
    client.onMessage((message) => {
      stages(client, message);
    })
  })
  .catch((error) =>
    console.log(error));

async function stages(client, message) {
  const interlocutor = message.from
  let stage = userStages[interlocutor];
  switch (stage) {
    case 'Nome':
      const nome = message.body;
      await sendWppMessage(client, interlocutor, 'Ótimo, ' + nome + "!");
      sendMenuPrincipal(client, interlocutor)
      userStages[interlocutor] = 'Quer_ver';
      break;
    case 'Quer_ver':
      const escolha = message.body;
      var boa_escolha = true

        switch(escolha){
          case "Linkedin":
            await sendWppMessage(client,interlocutor,"Ótima escolha! Vou enviar o link do linkedin do senhor Paulo!");
            await sendWppMessage(client,interlocutor,"https://www.linkedin.com/in/opaulo");
            break;
          case "Github":
            await sendWppMessage(client,interlocutor,"Perfeito! Vou enviar o link do github do senhor Paulo!");
            await sendWppMessage(client,interlocutor,"https://www.github.com/pvcdo");
            break;
          case "Lista de cursos":
            await sendWppMessage(client,interlocutor,"Você vai adorar! Vou enviar o link da pasta do drive com os certificados!");
            await sendWppMessage(client,interlocutor,"https://drive.google.com/drive/u/0/folders/1uZe9uJJl6Fqv6BgM-CEWFTAFgWcq-jn5");
            break;
          case "Currículo":
            await sendWppMessage(client,interlocutor,"Muito bem! Vou enviar o link do currículo do senhor Paulo!");
            await sendWppMessage(client,interlocutor,"https://drive.google.com/file/d/1qC4WAk8Er9i_Nxfyk-OL_U-YrmQcGVgf/view?usp=sharing");
            break;
          default:
            boa_escolha = false
        }

      if(boa_escolha){
        sendWppMessage(client,interlocutor,"Caso queira ver mais, escolha outro item!");
      }else{
        sendWppMessage(client,interlocutor,"Não entendi... por favor, escolha um dos itens abaixo");
      }
      sendMenuPrincipal(client,interlocutor)
      break;
    default: // Olá 
      console.log('*Usuário atual* from:' + interlocutor);
      await sendWppMessage(client, interlocutor, 'Olá! Seja bem-vindo ao robô da PVC Digital!');
      await sendWppMessage(client, interlocutor, 'Qual seu nome?');
      userStages[interlocutor] = 'Nome';
  }
}

function sendMenuPrincipal(client, sendTo){
  client.sendMessageOptions(sendTo,"Título",{
    isDynamicReplyButtonsMsg: true,
    dynamicReplyButtons: [
      {
        buttonId: 'idLkd',
        buttonText: {
          displayText: 'Linkedin',
        },
        type: 1,
      },
      {
        buttonId: 'idGhb',
        buttonText: {
          displayText: 'Github',
        },
        type: 1,
      },
      {
        buttonId: 'idCerts',
        buttonText: {
          displayText: 'Lista de cursos',
        },
        type: 1,
      },
      {
        buttonId: 'idCur',
        buttonText: {
          displayText: 'Currículo',
        },
        type: 1,
      },
    ],
  })
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

wppconnect.Whatsapp