// T3. JavaScript profesional en una aplicación web
// U2. Delegación de eventos
// Enunciado disponible en u2e1.md / Enunciat disponible a u2e1.md

const TASK_LIST = [
    {
        name: 'Work',
        done: false,
    },
    {
        name: 'Shopping',
        done: false,
    },
    {
        name: 'Call mom',
        done: true,
    },
];

//Escribe aquí tu solución / escriviu aquí la vostra solució:

class TodoList{
    #appRef;
    #listRef;
    #todoTpl;
    #list = [];

    constructor(appRef, listRef, todoTpl) {
        this.#appRef = appRef;
        this.#listRef = listRef;
        this.#todoTpl = todoTpl;

        this.init();
    }

    init(){
        const nameHolder = this.#appRef.querySelector(".js-todo-new-name");
        const link = this.#appRef.querySelector(".js-todo-add");


        link.addEventListener("click", (event) => {
            event.preventDefault();

            this.add(nameHolder.value, false);
            nameHolder.value = "";
        });

        this.#listRef.addEventListener("click", (event) => {
            const todoNode = event.target.closest(".js-todo");
            if (!todoNode) return;

            const todoName = todoNode.dataset.todo;

            if (event.target.classList.contains("js-todo-done")) {
                event.preventDefault();
                this.toggle(todoName);
            }

            if (event.target.classList.contains("js-todo-delete")) {
                event.preventDefault();
                this.remove(todoName);
            }
        });
    }

    add(todo, done){
        if(!todo || this.#list.some((el) => el.name === todo)) return false;

        this.#list.push({name: todo, done });
        this.render();
        return true;
    }

    remove(todo){
        const selected = this.#list.find((el) => el.name === todo);
        if(selected){
            this.#list.splice(this.#list.indexOf(selected), 1);
        }

        this.render();
    }

    toggle(todo){
        const selected = this.#list.find((el) => el.name === todo);
        if(selected){
            selected.done = !selected.done;
        }

        this.render();
    }

    render() {
        this.#listRef.innerHTML = "";

        this.#list.forEach(todo => {
            const clone = this.#todoTpl.content.cloneNode(true);
            const todoNode = clone.querySelector(".js-todo");

            todoNode.dataset.todo = todo.name;
            todoNode.dataset.done = todo.done ? "true" : "";

            todoNode.querySelector(".js-todo-name").textContent = todo.name;

            const doneLink = todoNode.querySelector(".js-todo-done");
            doneLink.textContent = todo.done ? "done" : "pending";

            this.#listRef.appendChild(clone);
        });
    }
}

const appRef = document.getElementById("app");
const listRef = appRef.querySelector(".js-todo-list");
const todoTpl = document.getElementById("tpl-todo");

const todosApp = new TodoList(appRef, listRef, todoTpl);


TASK_LIST.forEach(task => {
    todosApp.add(task.name, task.done);
});


todosApp.add('New one', false);
todosApp.toggle('Shopping');
todosApp.remove('Call mom');
todosApp.add('Another one', true);

document.querySelector('.js-todo-new-name').value = 'Test';
document.querySelector('.js-todo-add').click();

document.querySelector('.js-todo[data-todo="New one"] .js-todo-done').click();

document.querySelector('.js-todo[data-todo="Another one"] .js-todo-delete').click();
