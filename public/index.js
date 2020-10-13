/**
 * To-Do
 * Hack to Home Screen
 *
 * PWA Pilipinas
 */
$(document).ready(() => {
    console.log('Mabuhay PWA Pilipinas!');
    $('.preloader').fadeOut();
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
  if( task ===" ")
  {
    return ("Enter a valid value");}
   else {
    const taskList = getTasks() || [];
    taskList.push({ id: Date.now(), title: task, isDone: false });
    localStorage.setItem('todo', JSON.stringify(taskList));
    return taskList;
  }
  
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
