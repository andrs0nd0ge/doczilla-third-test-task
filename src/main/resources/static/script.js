const apiUrl = 'http://localhost:8080/api/proxy/todos';
const taskList = document.getElementById('taskList');

let sortingIsAscending = true;

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value;
    searchTasks(query);
});

function fetchTasks(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => renderTasks(data))
        .catch(error => console.error('Error fetching tasks:', error));
}

function fetchTasksByDate() {
    const startDate = new Date(document.getElementById('startDate').value).getTime();
    const endDate = new Date(document.getElementById('endDate').value).getTime();
    const showIncompleteOnly = document.getElementById('showIncompleteOnly').checked;
    let url = `${apiUrl}/date?from=${startDate}&to=${endDate}`;

    if (showIncompleteOnly) {
        url = url + `&status=${showIncompleteOnly}`;
    }

    fetchTasks(url);
}

function sortTasksByDate() {
    const tasks = Array.from(taskList.children);
    tasks.sort((a, b) => {
        const dateTextA = a.querySelector('p strong').innerText.split(': ')[1];
        const dateTextB = b.querySelector('p strong').innerText.split(': ')[1];

        const dateA = new Date(dateTextA);
        const dateB = new Date(dateTextB);

        return sortingIsAscending ? dateA - dateB : dateB - dateA;
    });
    sortingIsAscending = !sortingIsAscending;
    tasks.forEach(task => taskList.appendChild(task));
}

function searchTasks(query = '') {
    fetchTasks(`${apiUrl}/find?q=${query}`);
}

function fetchTodayTasks() {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const endOfDay = startOfDay + 24 * 60 * 60 * 1000;
    const showIncompleteOnly = document.getElementById('showIncompleteOnly').checked;
    let url = `${apiUrl}/date?from=${startOfDay}&to=${endOfDay}`;

    if (showIncompleteOnly) {
        url = url + `&status=${showIncompleteOnly}`;
    }

    fetchTasks(url);
}

function fetchWeekTasks() {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())).getTime();
    const endOfWeek = startOfWeek + 7 * 24 * 60 * 60 * 1000;
    const showIncompleteOnly = document.getElementById('showIncompleteOnly').checked;

    let url = `${apiUrl}/date?from=${startOfWeek}&to=${endOfWeek}`;

    if (showIncompleteOnly) {
        url = url + `&status=${showIncompleteOnly}`;
    }

    fetchTasks(url);
}

function renderTasks(tasks) {
    taskList.innerHTML = '';

    tasks
        .forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.status ? 'done' : ''}`;
            taskItem.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.shortDesc}</p>
                <p><strong>Date: ${new Date(task.date).toLocaleDateString()}</strong></p>
                <button style="margin-left: 0" onclick="openTaskModal('${task.fullDesc}')">Full Description</button>
            `;
            taskList.appendChild(taskItem);
        });
}

function openTaskModal(description) {
    document.getElementById('modalContent').innerText = description;
    document.getElementById('taskModal').style.display = 'block';
}

function closeTaskModal() {
    document.getElementById('taskModal').style.display = 'none';
}

fetchTasks(apiUrl);