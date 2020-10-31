/**
 * To-Do
 * Hack to Home Screen
 * 
 * PWA Pilipinas
 */
$(document).ready(() => {
    console.log('Mabuhay PWA Pilipinas!');
    $('.preloader').fadeOut();
    listUncompletedTasks();
    listCompletedTasks();
});

//add Todo from input
$('#new__task').keypress(function (event) {
    if (event.which === 13) {
        //13 keyvalue is for enter key
        newTask();
    };
});

/**
* add new tasks and toast messages on addition
*/
const newTask = () => {
    $("#submit").unbind().click(function (e) { //user can also add tasks by pressing submit button.
        newTask();
    });
    let todo = $('#new__task').val()
    if (todo != "") {
        todo = $.trim(todo);
        addTask(todo); //add that todo
        M.toast({ html: 'New task added!', classes: 'green darken-1' }); //Materialize toast for task addition
    }
    else {
        M.toast({ html: 'Please add an input first', classes: 'red darken-1' });
    }
    $('#new__task').val(""); //empty the input after clicking submit or enter key.
};
/**
 * getTasks
 */
const getTasks = () => {
    try {
        return (JSON.parse(localStorage.getItem('todo'))).sort((a, b) => a.id - b.id) || [];
    } catch (e) {
        return [];
    }
};

/**
 * getTasksList
 */
const getTasksList = () => {
    try {
        return (JSON.parse(localStorage.getItem('todo'))).sort((a, b) => b.id - a.id) || [];
    } catch (e) {
        return [];
    }
};

/**
 * refreshView
 */
const refreshView = () => {
    listUncompletedTasks();
    listCompletedTasks();
    return;
};

/**
 * addTask
 * @param {string} task 
 */
const addTask = (task) => {
    const taskList = getTasks() || [];
    taskList.push({ id: Date.now(), title: task, isDone: false });
    localStorage.setItem('todo', JSON.stringify(taskList));
    refreshView();
    return taskList;
};

/**
 * deleteTask
 * @param {string | number} taskId 
 */
const deleteTask = (taskId) => {
    let taskList = getTasks() || [];
    taskList = taskList.filter(e => { if (e.id !== +taskId) return e });
    localStorage.setItem('todo', JSON.stringify(taskList));
    return taskList;
};

/**
 * getTask
 * @param {string | number} taskId 
 */
const getTask = (taskId) => {
    let taskList = getTasks() || [];
    task = taskList.find(e => e.id === +taskId);
    return task || {};
};

/**
 * toggleTask
 * @param {string | number} taskId 
 */
const toggleTask = (taskId) => {
    let taskList = getTasks() || [];
    taskList = taskList.map(e => {
        if (e.id === +taskId) e.isDone = e.isDone ? false : true;
        return e;
    })
    localStorage.setItem('todo', JSON.stringify(taskList));
    refreshView();
    return taskList;
};

/**
 * listUncompletedTasks
 */
const listUncompletedTasks = () => {
    let tasksTodo = getTasksList() || [];
    tasksTodo = tasksTodo.filter(e => !e.isDone);
    $('.tasks-todo-list').html('');
    tasksTodo.forEach(function (task) {
        displayTaskItemUI(task, '.tasks-todo');
    });
};

/**
 * listCompletedTasks
 */
const listCompletedTasks = () => {
    let tasksDone = getTasksList() || [];
    tasksDone = tasksDone.filter(e => e.isDone);
    $('.tasks-done-list').html('');
    tasksDone.forEach(function (task) {
        displayTaskItemUI(task, '.tasks-done');
    });
};

/**
 * setAsDone
 * @param {number} id 
 */
const setAsDone = (id) => {
    toggleTask(id);
    refreshView();
    M.toast({ html: 'Task done!', classes: 'green darken-1' });
};

/**
 * setAsTodo
 * @param {number} id 
 */
const setAsTodo = (id) => {
    toggleTask(id);
    refreshView();
    M.toast({ html: 'Task set as to-do!', classes: 'green darken-1' });
};

/**
 * deleteTaskUI
 * @param {number} id 
 */
const deleteTaskUI = (id) => {
    deleteTask(id);
    refreshView();
    M.toast({ html: 'Task successfully deleted!', classes: 'green darken-1' });
};

/**
 * displayTaskItemUI
 * @param {string} task
 * @param {string} taskListContainer
 */
const displayTaskItemUI = (task, taskListContainer) => {
    let tpl = '';
    if (taskListContainer === '.tasks-todo') {
        tpl = `
        <div class="task-item card-content blue-grey lighten-4 z-depth-0" id="${task.id}">
            <div class="row valign-wrapper">
                <div class="col m9 s8 task-title">${task.title}</div>
                <div class="col m3 s4 options right-align">
                    <a data-id="${task.id}" class="btn-small action check-todo blue darken-1 white-text" onclick="setAsDone(${task.id})"><i class="material-icons">check</i></a>
                    <a data-id="${task.id}" class="btn-small action delete red darken-1 white-text" onclick="deleteTaskUI(${task.id})"><i class="material-icons">delete</i></a>
                </div>
            </div>
        </div>
        `;
        $('.tasks-todo-list').append(tpl);
    } else {
        tpl = `
        <div class="task-item card-content blue-grey lighten-4 z-depth-0" id="${task.id}">
            <div class="row valign-wrapper">
                <div class="col m9 s8 task-title">${task.title}</div>
                    <div class="col m3 s4 options right-align">
                        <a data-id="${task.id}" class="btn-small action check-done blue darken-1 white-text" onclick="setAsTodo(${task.id})"><i class="material-icons">check</i></a>
                        <a data-id="${task.id}" class="btn-small action delete red darken-1 white-text" onclick="deleteTaskUI(${task.id})"><i class="material-icons">delete</i></a>
                    </div>
                </div>
            </div>
        </div>`;
        $('.tasks-done-list').append(tpl);
    }
};
