const Task = require('./task');

class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });
    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  listTasks() {
    console.log();
    this.listArr.forEach((task, i) => {
      const idx = `${i + 1}.`.yellow;
      const { desc, completeIn } = task;
      const state = completeIn ? 'Completada'.green : 'Pendiente'.red;
      console.log(`${idx} ${desc} :: ${state}`);
    });
  }

  listCompletedPending(completed = true) {
    console.log();
    let counter = 0;
    this.listArr.forEach((task) => {
      const { desc, completeIn } = task;
      const state = completeIn ? 'Completada'.green : 'Pendiente'.red;
      if (completed) {
        // mostrar completadas
        if (completeIn) {
          counter++;
          console.log(`${`${counter}.`.yellow} ${desc} :: ${state}`);
        }
      } else {
        // mostrar pendientes
        if (!completeIn) {
          counter++;
          console.log(`${`${counter}.`.yellow} ${desc} :: ${state}`);
        }
      }
    });
  }
}

module.exports = Tasks;
