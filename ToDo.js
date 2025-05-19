const homePage = `<button class="homeButton" onclick="gotoHome()"><i class="fa fa-home" style="font-size:48px;color:chocolate"></i></button>
	<div id="home">
		    <div class="notes1"><p style="text-align: center; font-family: cursive; color: azure;">Notes</p></div>
			<div class="notes2"><p style="text-align: center; font-family: cursive; color: azure;">To-Do</p></div>
			<div class="notes3"><p style="text-align: center; font-family: cursive; color: azure;">Tomorrow's task</p></div>
			<div class="notes4"><p style="text-align: center; font-family: cursive; color: azure;">Office work</p></div>
			<div class="notes5"><p style="text-align: center; font-family: cursive; color: azure;">Travel</p></div>
			<div class="notes6"><p style="text-align: center; font-family: cursive; color: azure;">Money spent</p></div>
		</div>`;

const limit = 5;

if (!localStorage.counter) {
    localStorage.counter = 0;
}

function addTextArea() {
    const textArea = document.getElementById("flex-item2");
    textArea.innerHTML = "";

    textArea.innerHTML = `<textarea id="enteredText" rows=10 cols=40 placeholder="Add some text..."></textarea>
		
		<button type="button" class="add" onclick="addToList()">Add</button><button type="button" class="back" onclick="gotoHome()">Back</button>`;
}

function addToList() {
    const flexItem2 = document.getElementById("flex-item2");

    if (Storage !== "undefined") {
        let enteredText = document.getElementById("enteredText").value;

        if (enteredText.trim().length == 0) {
            flexItem2.innerHTML = `<p style="font-size: xx-large; color: red;">No text to add</p>
				<button type="button" class="back" onclick="addTextArea()" >Back</button>`;
        } else {
            if (localStorage.counter < limit) {
                let randomText = getRandomText();
                let itemKey = "addedText" + localStorage.counter + "" + randomText;

                localStorage.setItem(itemKey, enteredText);

                localStorage.counter = parseInt(localStorage.counter) + 1;

                flexItem2.innerHTML = `<p style="font-size: xx-large;">Task added successfully! &#9989; </p>
				<button type="button" class="back" onclick="addTextArea()">Back</button>`;
            } else
                flexItem2.innerHTML = `<p style="font-size: xx-large; color: red;">Tasks limit exceeded! &#10060; </p>
			<button type="button" class="back" onclick="gotoHome()">Back</button>`;
        }
    } else document.getElementById("enteredText").innerHTML = "Sorry no web storage support";
}

function viewAllTasks() {
    const len = localStorage.length;

    let viewTask = document.getElementById("flex-item2");
    viewTask.innerHTML = "";
    viewTask.innerHTML += `<h2>Tasks list</h2>`;
    if (len > 1) {
        let trimmedText = "";

        for (let i = 0; i < len; i++) {
            let key = localStorage.key(i);
            console.log("key is " + typeof key);
            if (key.includes("addedText")) {
                const value = localStorage.getItem(key);

                console.log("Value is " + value);
                console.log("key is " + key);

                if (value.length > 30) trimmedText = getTrimmedText(value, 30);
                else trimmedText = value;

                viewTask.innerHTML += `<div style="width: 300px; margin: 10px;">
				   <table><tr><td onclick="getFullText('${key}')">${trimmedText}</td></tr></table></div>`;
            }
        }
        viewTask.innerHTML += `<button type="button" class="back" onclick="gotoHome()">Back</button>`;
    } else
        viewTask.innerHTML = `<p style="font-size: xx-large; color: red;">No tasks to view</p>
	  <button type="button" class="back" onclick="gotoHome()">Back</button>`;
}

function getTrimmedText(tasktoTrim, maxLength) {
    let trimmed = "";

    if (tasktoTrim.length > maxLength) trimmed = tasktoTrim.substr(0, maxLength) + "...";

    return trimmed;
}

function getFullText(taskKey) {
    const task = localStorage.getItem(taskKey);
    console.log(task);
    const textArea = document.getElementById("flex-item2");
    textArea.innerHTML = "";

    textArea.innerHTML = `<textarea id="enteredText" rows=10 cols=40 value="">${task}</textarea>
		
		<div><button type="button" class="update" onclick="updateTask('${taskKey}')">Update Task</button></div><div><button type="button" class="delete" onclick="deleteTask('${taskKey}')">Delete Task</button></div>
		<button type="button" class="back" onclick="viewAllTasks()">Back</button>`;
}

function updateTask(taskKey) {
    const task = localStorage.getItem(taskKey);

    let updatedTask = document.getElementById("enteredText").value;

    let afterUpdate = document.getElementById("flex-item2");

    if (task === updatedTask) {
        afterUpdate.innerHTML = "";
        afterUpdate.innerHTML = `
			<p style="font-size: xx-large; color: red;"> No changes found to update </p>
			<button type="button" class="back" onclick="getFullText('${taskKey}')">Back</button>`;
    } else if (updatedTask.trim().length === 0) {
        afterUpdate.innerHTML = "";
        afterUpdate.innerHTML = `<p style="font-size: xx-large; color: red;"> No text to update </p>
			<button type="button" class="back" onclick="getFullText('${taskKey}')">Back</button>`;
    } else {
        localStorage.setItem(taskKey, updatedTask);
        afterUpdate.innerHTML = "";
        afterUpdate.innerHTML = `
			<p style="font-size: xx-large;">Task updated successfully! &#9989; </p>
			<button type="button" class="back" onclick="viewAllTasks()">Back</button>`;
    }
}

function deleteTask(taskKey) {
    let afterDelete = document.getElementById("flex-item2");

    if (localStorage.getItem(taskKey) !== null) {
        localStorage.removeItem(taskKey);
        localStorage.counter--;
        afterDelete.innerHTML = "";
        afterDelete.innerHTML = `<p style="font-size: xx-large;">Task deleted successfully! &#9989; </p>
			<button type="button" class="back" onclick="viewAllTasks()">Back</button>`;
    }
}

function deleteAllTasks() {
    let afterDelete = document.getElementById("flex-item2");
    if (Storage !== undefined) {
        if (localStorage !== null) {
            if (localStorage.counter && localStorage.counter != 0) {
                localStorage.clear();
                afterDelete.innerHTML = "";
                afterDelete.innerHTML = `<p style="font-size: xx-large;">All tasks deleted successfully! &#9989; </p>
				 <button type="button" class="back" onclick="gotoHome()">Back</button>`;
            } else {
                afterDelete.innerHTML = "";
                afterDelete.innerHTML = `<p style="font-size: xx-large; color: red;">No tasks to delete</p>
				 <button type="button" class="back" onclick="gotoHome()">Back</button>`;
            }
            if (!localStorage.counter) {
                localStorage.counter = 0;
            }
        }
    }
}

const gotoHome = () => {
    let home = document.getElementById("flex-item2");
    home.innerHTML = homePage;
    return home.innerHTML;
};

function getRandomText() {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let len = 5;
    let result = "";
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
