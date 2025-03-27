
    tasks.forEach(task) => renderTask(task);

    addTaskButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if(taskText === "") return;
    
        const newtask ={
            id: Date.now(),
            text: taskText,