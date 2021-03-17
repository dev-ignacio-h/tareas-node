require('colors');
const { inquirerMenu, pausa, readInput } = require('./helpers/inquirer');

const Tasks = require('./models/tasks');

const main = async () => {

  let opt = '';
  const tasks = new Tasks();

  do {
    // print menu
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const desc = await readInput('Descripción: ');
        tasks.createTask(desc)
        break;
      case 2:
        console.log(tasks.listArr);
        break;
    }
    await pausa();
  } while (opt !== 0);
};

main();
