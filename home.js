var taskObj = {
    key: "projects",

    addProject: function () {
        var projectName = document.getElementById("add-project").value;
        if (projectName === "") {
            alert("Please enter Project name");
            return;
        }

        var data = localStorage.getItem(this.key) ? JSON.parse(localStorage.getItem(this.key)) : [];
        var project = {
            id: data.length,
            name: projectName,
            tasks: []
        };

        data.push(project);
        localStorage.setItem(this.key, JSON.stringify(data));

        this.loadAllProjects();
        this.showAllTasks();
    },

    addTask: function () {
        var projectId = document.getElementById("add-task-project").value;
        var taskName = document.getElementById("add-task").value;

        if (projectId === "" || taskName === "") {
            alert("Please select a project and enter a task name");
            return;
        }

        var projects = this.getAllProjects();
        var project = projects.find(p => p.id == projectId);
        if (project) {
            var task = {
                id: project.tasks.length,
                name: taskName,
                status: "Progress",
                isStarted: false,
                logs: []
            };

            project.tasks.push(task);
            localStorage.setItem(this.key, JSON.stringify(projects));
            this.showAllTasks();
        }
    },

    getAllProjects: function () {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    },

    loadAllProjects: function () {
        var projects = this.getAllProjects();
        var html = "<option value=''>Select Project</option>";
        for (var i = 0; i < projects.length; i++) {
            html += "<option value='" + projects[i].id + "'>" + projects[i].name + "</option>";
        }
        document.getElementById("add-task-project").innerHTML = html;
    },

    showAllTasks: function () {
        var projects = this.getAllProjects();
        var html = "";
        for (var i = 0; i < projects.length; i++) {
            var tasks = projects[i].tasks;
            for (var j = 0; j < tasks.length; j++) {
                html += "<div>";
                html += "<strong>Task Name:</strong> " + tasks[j].name + "<br>";
                html += "<strong>Project Name:</strong> " + projects[i].name + "<br>";
                html += "<strong>Status:</strong> " + tasks[j].status + "<br>";
                html += "</div>";
            }
        }
        document.getElementById("all-tasks").innerHTML = html;
    }
};

window.addEventListener("load", function () {
    taskObj.loadAllProjects();
    taskObj.showAllTasks();
});
