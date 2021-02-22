require('colors');
const { inquirerMenu } = require('./helpers/inquirer');
const { pausa } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');


const main = async () => {
  console.log('Hola mundo');
  let opt = '';
  do {
    opt = await inquirerMenu();
    console.log({ opt });

    await pausa();
  } while (opt !== 0);
};

main();
