require('colors');

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log('========================='.magenta);
    console.log('  Seleccione una opción  '.magenta);
    console.log('=========================\n'.magenta);

    console.log(`${'1.'.magenta} Crear una tarea`);
    console.log(`${'2.'.magenta} Listar una tarea(s)`);
    console.log(`${'3.'.magenta} Listar tarea(s) compleatada(s)`);
    console.log(`${'4.'.magenta} Listar tarea(s) pendiente(s)`);
    console.log(`${'5.'.magenta} Completar tarea(s)`);
    console.log(`${'6.'.magenta} Borrartarea`);
    console.log(`${'0.'.magenta} Salir`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('Seleccione una opción: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`\nPresione ${'ENTER'.blue} para continuar\n`, (opt) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pausa
};
