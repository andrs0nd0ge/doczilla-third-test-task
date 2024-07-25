## Third test task of the _Doczilla_ platform
### 🟦 Description:
The application is essentially a todo list: it sends requests to an outer API, retrieves the information about the tasks and has the functionality of: 
* **checking the full description of a task;**
* **searching tasks by their names;**
* **retrieving only today's tasks;**
* **retrieving this week's tasks;**
* **sorting tasks (**_both **ascending** and **descending**_**);**
* **showing incomplete tasks only;**
* **fetching the tasks for a specified date range.**

The application is primarily written on _**Vanilla JavaScript**_, but also has proxy server written on _**Java**_ using _**Spring Boot**_.

### 🟩 Application Start:
The application can be started by running the ```main``` method of the ```Application``` class.\
The application automatically opens `index.html` file from the `src\main\resources\static` folder in default browser for user's convenience.\
In case it does not happen, the file can be opened manually **(by locating to the `src\main\resources\static` path inside the project)**.

### ⛔ Constraints:
* The `Show Incomplete Only` checkbox only gets applied to filtered tasks, meaning it is impossible to show _all_ incomplete tasks in general.
* In order to display all tasks after applying a filter, the search bar needs to be filled with some data and then cleared.