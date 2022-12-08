const wppconnect = require('@wppconnect-team/wppconnect');

var userStages = []

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


//  Stages = Olá  >>  Nome  >>  CPF  >> Fim
async function stages(client, message) {
  let stage = userStages[message.from];
  switch (stage) {
    case 'Nome':
      const nome = message.body;
      await sendWppMessage(client, message.from, 'Obrigada, ' + nome);

      await sendWppMessage(client, message.from, 'Digite seu *CPF*:');
      userStages[message.from] = 'CPF';
      break;
    case 'CPF':
      const cpf = message.body;
      await sendWppMessage(client, message.from, 'Obrigada por informar seu CPF: ' + cpf);
      await sendWppMessage(client, message.from, 'Fim');
      userStages[message.from] = 'Fim';
      break;
    case 'Fim':
      await sendWppMessage(client, message.from, 'Fim');
      break;
    default: // Olá 
      console.log('*Usuário atual* from:' + message.from);
      await sendWppMessage(client, message.from, 'Bem vindo ao Robô de Whatsapp do AppBasicão!');
      await sendWppMessage(client, message.from, 'Digite seu *NOME*:');
      userStages[message.from] = 'Nome';
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