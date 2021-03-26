const inquirer = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: 1,
        name: `${'1.'.white} Crear tarea`
      },
      {
        value: 2,
        name: `${'2.'.white} Listar tareas`
      },
      {
        value: 3,
        name: `${'3.'.white} Listar tareas completadas`
      },
      {
        value: 4,
        name: `${'4.'.white} Listar tareas pendientes`
      },
      {
        value: 5,
        name: `${'5.'.white} Completar tarea(s)`
      },
      {
        value: 6,
        name: `${'6.'.white} Borrar tarea`
      },
      {
        value: 0,
        name: `${'0.'.white} Salir`
      }
    ]
  }
];

const inquirerMenu = async () => {
  console.clear();
  console.log('========================='.white);
  console.log('  Seleccione una opción  ');
  console.log('=========================\n'.white);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.cyan} para continuar`
    }
  ];
  console.log('\n');
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listTasksDelete = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${i + 1}.`.yellow;
    return {
      value: task.id,
      name: `${index} ${task.desc}`
    };
  });

  choices.unshift({
    value: 0,
    name: '0.'.yellow + ' Cancelar'
  });

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

const showChecklist = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const index = `${i + 1}.`.yellow;
    return {
      value: task.id,
      name: `${index} ${task.desc}`,
      checked: task.completedIn ? true : false
    };
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    }
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  readInput,
  listTasksDelete,
  confirm,
  showChecklist
};
