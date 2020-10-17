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

    /* Add task events */
    $('#new__task').on('keypress', function(e) {
        (e.which == 13)? addTaskEvent() : '';
    });

    $('#action').click(function() {
        addTaskEvent();
    });
});

/**
 * getTasks
 */
const getTasks = () => {
    try {
        return (JSON.parse(localStorage.getItem('todo'))).sort((a,b) => a.id - b.id) || [];
    } catch (e) {
        return [];
    }
};

/**
 * getTasksList
 */
const getTasksList = () => {
    try {
        return (JSON.parse(localStorage.getItem('todo'))).sort((a,b) => b.id - a.id) || [];
    } catch (e) {
        return [];
    }
};

/**
 * addTask
 * @param {string} task 
 */
const addTask = (task) => {
    const taskList = getTasks() || [];
    const newTask = { id: Date.now(), title: task, isDone: false };
    taskList.push(newTask);
    localStorage.setItem('todo', JSON.stringify(taskList));
    return newTask;
};

/**
 * deleteTask
 * @param {string | number} taskId 
 */
const deleteTask = (taskId) => {
    let taskList = getTasks() || [];
    taskList = taskList.filter(e => { if(e.id !== +taskId) return e });
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
        if(e.id === +taskId) e.isDone = e.isDone ? false : true;
        return e;
    })
    localStorage.setItem('todo', JSON.stringify(taskList));
    return taskList;
};

/**
 * listUncompletedTasks
 */
const listUncompletedTasks = () => {
    let tasksTodo = getTasksList() || [];
    tasksTodo = tasksTodo.filter(e => !e.isDone);
    tasksTodo.forEach(function(task) {
        displayTaskItemUI(task, '.tasks-todo');
    });
};

/**
 * listCompletedTasks
 */
const listCompletedTasks = () => {
    let tasksDone = getTasksList() || [];
    tasksDone = tasksDone.filter(e => e.isDone);
    tasksDone.forEach(function(task) {
        displayTaskItemUI(task, '.tasks-done');
    });
};

/**
 * displayTaskItemUI
 * @param {object} task 
 * @param {string} taskListContainer
 * @param {boolean} isNew
 */
const displayTaskItemUI = (task, taskListContainer, isNew = false) => {
    const template = $(taskListContainer + ' .task-item').last();
    let taskItemUI = template.clone();
    taskItemUI.removeAttr('style');
    taskItemUI.attr('id', task.id);
    taskItemUI.find('.task-title').text(task.title);
    (isNew)? $(template).after(taskItemUI) : $(taskListContainer + ' .title').after(taskItemUI);
};

/**
 * addTaskEvent
 */
const addTaskEvent = () => {
    let newTask = $('#new__task').val();
    
    if ($.trim(newTask)) {
        displayTaskItemUI(addTask(newTask), '.tasks-todo', true);
        M.toast({html: 'New task added!', classes: 'green darken-1'});
    } else {
        M.toast({html: 'Please input your new task.', classes: 'red darken-1'});
    }

    $('#new__task').val('');
};