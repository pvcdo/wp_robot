const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect.create({
  session: 'whatsbot',
  autoClose: false,
  puppeteerOptions: { args: ['--no-sandbox'] }
})
  .then((client) =>  
    client.onMessage((message) => {
      console.log('Mensagem digitada pelo usuário: ' + message.body);
      client.sendText(message.from, `Seja bem-vindo à PVC Digital!
      
      Digite: 
      1 para tal
      2 para pão duro
      3 capitão

      `)
        .then((result) => {
          console.log('Pong retornado: ', result); 
        })
        .catch((erro) => {
          console.error('ERRO: ', erro);
        });
    })
  )    
  .catch((error) =>
    console.log(error)
  );