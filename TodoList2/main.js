window.addEventListener('load', () => {
    const minLength = 4;
    todos = JSON.parse(localStorage.getItem('todos')) || [];

    /* nimen hakeminen */
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    const contentInput = document.querySelector('#content');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    /* nimen tallennus */
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    });

    /* Ajetaan pituustarkistus aina kun painetaan nappia */
    contentInput.addEventListener('keydown', e => {
        const content = e.target.value;

        /* vertaus tapahtuu edelliseen eventtiin, joten +1 */
        if (content.length + 1 == minLength) {
            contentInput.classList.remove("error-text");
            console.log(content);
        }
    });
    
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const content = e.target.elements.content.value;
        const category = e.target.elements.category.value;

        /* alert jos on tyhjä tai liian lyhyt */
        if (!content) {
            alert("Please fill out the task :)");
            return;
        }

        if (content.length < minLength) {
            contentInput.classList.add("error-text");
            alert("The task is too short! :( Min. " + (minLength) + " characters!");
            return;
        }
        
        contentInput.classList.remove("error-text");

        /* haetaan sisällön tietoja */
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        /* lisätään todo listaan */
        todos.push(todo);

        /* tallennetaan todo*/
        localStorage.setItem('todos', JSON.stringify(todos));

        /* kirjoitus laatikko resettaa tyhjäksi */
        e.target.reset();

        DisplayTodos();

    })

    DisplayTodos();
})

function DisplayTodos () {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';

    /* taskien määrä */
    const todoCount = document.createElement('H1');
    todoCount.innerText = "Number of tasks " + todos.length;
    todoList.appendChild(todoCount);

    /*luodaan kaikki yhden todo osion osat */
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        /* nappula, asia tehty */
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        /*category nappulan väri */
        if (todo.category == 'business') {
                span.classList.add('business');
        }   else {
                span.classList.add('personal');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}"
        readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        /*Järjestys ja jokainen tehtävä tulee aina edellisen perään*/
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        /* merkataan tehtävä tehdyksi */
        if (todo.done) {
            todoItem.classList.add('done');
        }

        /* tallennetaan muutos */
        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
       })

       /*edit nappulan toiminta */
       edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            edit.innerHTML = 'Save';
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
       })

       deleteButton.addEventListener('click', e => {
        todos = todos.filter(t => t != todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
       })
    })
}