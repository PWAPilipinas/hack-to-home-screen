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
    taskList.push({ id: Date.now(), title: task, isDone: false });
    localStorage.setItem('todo', JSON.stringify(taskList));
    return taskList;
};

/**
 * deleteTask
 * @param {string | number} taskId 
 */
const deleteTask = (taskId) => {
    let taskList = getTasks() || [];
    taskList = taskList.filter(e => { if(e.id !== +taskId) return e });
    localStorage.setItem('todo', JSON.stringify(taskList));
    console.log(taskId);
    $('#' + taskId).remove();
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
    $('.tasks-todo .task-item').last().remove();
};

/**
 * displayTaskItemUI
 * @param {string} task 
 * @param {string} taskListContainer
 */
const displayTaskItemUI = (task, taskListContainer) => {
    console.log("load");
    const template = $(taskListContainer + ' .task-item').last();
    let taskItemUI = template.clone();
    taskItemUI.attr('id', task.id);
    taskItemUI.find('.delete-btn').attr('data-id', task.id);
    taskItemUI.find('.task-title').text(task.title);
    $(taskListContainer + ' .title').after(taskItemUI);
};