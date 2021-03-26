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
      const { desc, completedIn } = task;
      const state = completedIn ? 'Completada'.green : 'Pendiente'.red;
      console.log(`${idx} ${desc} :: ${state}`);
    });
  }

  listCompletedPending(completed = true) {
    console.log();
    let counter = 0;
    this.listArr.forEach((task) => {
      const { desc, completedIn } = task;
      const state = completedIn ? 'Completada'.green : 'Pendiente'.red;
      if (completed) {
        // mostrar completadas
        if (completedIn) {
          counter++;
          console.log(
            `${`${counter}.`.yellow} ${desc} :: ${completedIn.yellow}`
          );
        }
      } else {
        // mostrar pendientes
        if (!completedIn) {
          counter++;
          console.log(`${`${counter}.`.yellow} ${desc} :: ${state}`);
        }
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedIn) {
        task.completedIn = new Date().toISOString();
      }
    });

    this.listArr.forEach(({id}) => {
      if (!ids.includes(id)) {
        this._list[id].completedIn = null;
      }
    });
  }
}

module.exports = Tasks;
