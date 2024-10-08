let darkMode = document.querySelector('.mode-screen');
let bodyElem = document.body;
let menubar = document.querySelector('.fa-bars');
let menu = document.querySelector('.side-bar');

// menu bar
menubar.addEventListener('click' , function(){
    if (menubar.className.includes('fa fa-bars')) {
        menu.style.left = '0px'
        menubar.className = 'fa fa-times'
    } else {
        menu.style.left = '-300px'
        menubar.className = 'fa fa-bars'
    }
})

// dark mode
darkMode.addEventListener('click' , function(){
    bodyElem.classList.toggle('dark');

    if (bodyElem.className.includes('dark')) {
        localStorage.setItem('theme' , 'dark')
    } else {
        localStorage.setItem('theme' , 'light')
    }
})

window.onload = function(){
    let localTheme = localStorage.getItem('theme');
    if(localTheme === 'dark'){   
        bodyElem.classList.add('dark')
    }
}

// ========================= todo list ==============================

let addbtn = document.querySelector('.add');
let inputValue = document.querySelector('.addInput')
let todoContainer = document.querySelector('.todo-lists');

let todoArray = [];

function addtodo(){
    let mainInputValue = inputValue.value;
    if (mainInputValue) {
        inputValue.value = ''
        let todoObject = {
            id : todoArray.length + 1,
            todo : mainInputValue,
            case : false
        }
        todoArray.push(todoObject);
        generateTodo(todoArray)
        setLocalStorage(todoArray)
        inputValue.focus()
    } else {
        inputValue.focus()
    }
}

let fragmentContainer = document.createDocumentFragment()

function generateTodo(todo){
    let newTodoItem , newContentTodo , newCheckBox , newTodo , newDelete;
    todoContainer.innerHTML = ''
    todo.forEach(function(item){
        newTodoItem = document.createElement('div');
        newTodoItem.className = 'todo-item';

        newContentTodo = document.createElement('div');
        newContentTodo.className = 'content-todo';

        newCheckBox = document.createElement('input');
        newCheckBox.className = 'check';
        newCheckBox.setAttribute('type' , 'checkbox');
        newCheckBox.setAttribute('onchange' , 'checkedTodo('+ item.id +')')
        if (item.case) {
            newCheckBox.checked = true
        }

        newTodo = document.createElement('span');
        newTodo.className = 'todo';
        newTodo.innerHTML = item.todo;
        newContentTodo.append(newCheckBox , newTodo);

        newDelete = document.createElement('i');
        newDelete.className = 'fa-solid fa-xmark';
        newDelete.setAttribute('onclick' , 'deleteTodo('+ item.id +')')

        newTodoItem.append(newContentTodo , newDelete);
        fragmentContainer.append(newTodoItem)
    })
    todoContainer.append(fragmentContainer);
}

function checkedTodo(todoId){
    let localValue = JSON.parse(localStorage.getItem('todo'));
    todoArray = localValue;
    todoArray.forEach(function(item){
        if (item.id === todoId) {
            item.case = !item.case;
        }
    })
    setLocalStorage(todoArray);
    generateTodo(todoArray);
}

function deleteTodo(todoId){
    let localValue = JSON.parse(localStorage.getItem('todo'));
    todoArray = localValue;
    let isId = todoArray.findIndex(function(item){
        return item.id === todoId
    })
    todoArray.splice(isId , 1)
    setLocalStorage(todoArray);
    generateTodo(todoArray);
}

function setLocalStorage(todoArray){
    localStorage.setItem('todo' , JSON.stringify(todoArray))
}

function getLocalStorage(todo){
    let localStorageValue = JSON.parse(localStorage.getItem('todo'))
    if(localStorageValue){
        todoArray = localStorageValue
    }
    else{
        todoArray = [];
    }
    generateTodo(todoArray);
}

inputValue.addEventListener( 'keydown' , function(event){
    if (event.keyCode === 13) {
        let value = inputValue.value;
        if(value){
            addtodo(value)
        }
    } else {
        
    }
})

addbtn.addEventListener('click' , addtodo )
window.addEventListener( 'load' , getLocalStorage)

