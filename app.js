require('colors');
const {
  inquirerMenu,
  pausa,
  readInput,
  listTasksDelete,
  confirm
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');

const Tasks = require('./models/tasks');

const main = async () => {
  let opt = '';
  const tasks = new Tasks();

  const tasksDB = readDB();

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    // print menu
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const desc = await readInput('Descripción: ');
        tasks.createTask(desc);
        break;
      case 2:
        tasks.listTasks();
        break;
      case 3:
        tasks.listCompletedPending(true);
        break;
      case 4:
        tasks.listCompletedPending(false);
        break;

      case 6:
        const id = await listTasksDelete(tasks.listArr);
        if (id !== 0) {
          const ok = await confirm('¿Está seguro?');
          if (ok) {
            tasks.deleteTask(id);
            console.log('Tarea borrada');
          }
        }

        break;
    }

    saveDB(tasks.listArr);
    await pausa();
  } while (opt !== 0);
};

main();
