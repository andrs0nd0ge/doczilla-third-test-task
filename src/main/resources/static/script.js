document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://todo.doczilla.pro/api/todos';
    const taskList = document.getElementById('taskList');
    const searchInput = document.getElementById('search');

    searchInput.addEventListener('input', function() {
        const value = searchInput.value;
        fetchSpecificTasks({ 'q': value });
    });

    function fetchSpecificTasks(queryParams = {}) {
        const url = new URL(apiUrl + '/find');
        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));

        fetch(url)
            .then(response => response.json())
            .then(data => {
                renderTasks(data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }

    function fetchTasks() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                renderTasks(data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }

    function renderTasks(tasks) {
        taskList.innerHTML = '';

        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.status ? 'done' : ''}`;
            taskItem.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.shortDesc}</p>
                <p><strong>Date:</strong> ${new Date(task.date).toLocaleDateString()}</p>
            `;

            taskList.appendChild(taskItem);
        });
    }

    fetchTasks();
});
