//  ===============   field value   ================
const getFeildValue = (element) => {
    return   document.getElementById(element).value
}
// ================  random       ===================
const  getRandomId = () => {
    return Math.random().toString(36).slice(2)
}
// ================   show output     ===============
const showOutput = (element) => {
    document.getElementById("output").innerHTML = element
}

// ================   clear Output    ===============
const clearOutput = () => {
    document.getElementById("output").innerHTML = ""
}
// ================   set input field    ===============
const setFieldValue = (fieldId,value) => {
    document.getElementById(fieldId).value = value
}
//  ===============   empty Field Value  ============
 const emptyFieldValue = () => {
    document.getElementById("title").value = ""
    document.getElementById("location").value = ""
    document.getElementById("description").value = ""
 }
// ========================  show Notification ======

    function showNotification(msg,type){
        let bgColor;
        let textColor;
    
        switch (type) {
            case "success":
                bgColor = "linear-gradient(to right, #1D976C, #93F99)"
                textColor = "red"
                break;
            case "error":
                bgColor = "linear-gradient(to right, #93291e, #ed213a)"
                break;    
            default:
                bgColor = "#000"
                break;
    }
 

        Toastify({
            text: msg,
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: bgColor,
            color : textColor
            },
        }).showToast();
}




    

// ===========       handle submet    ===============
const handleSubmit = () => {
    event.preventDefault();

    let title = getFeildValue("title"),location = getFeildValue("location"), description = getFeildValue("description");
     
   

    title = title.trim();
    location = location.trim();
    description = description.trim();

    if (title.length < 3) {
        showNotification("Please enterd your Title correctly.", "error")
        return
    }

    if (location.length < 3) {
        showNotification("Please enterd your Location correctly.", "error")
        return
    }

    if (description.length < 10) {
        showNotification("Please enterd your Description correctly.", "error")
        return
    }

    let todo = { title , location ,description }

    todo.id = getRandomId();
    todo.dateCreated = new Date().getTime();
    todo.status = "active";


    const todos= JSON.parse(localStorage.getItem("todos")) || [];

    todos.push(todo)

    localStorage.setItem("todos",JSON.stringify(todos))

    showNotification("A new todo has been successfully added.","success")
    showTodos()
    emptyFieldValue()
}

// ==================     showtodos   ===============

const showTodos = () =>  {
    clearOutput()

    const todos = JSON.parse(localStorage.getItem("todos")) ||  [] ;
    console.log(todos);
    if (!todos.length) {
        // showNotification("There is not a single user available.","error") 
        showOutput("<h5 class='text-center'>HURRAY! No Task available. Add a task button to add your task .</h5>" )
        return;
     }
 

    let tableStartingCode = '<div class="table-responsive"><table class="table">';
    let tableEndingCode = '</table></div>';

    let tableHead = '<thead><tr><th scope = "col">#</th><th scope = "col">Title</th><th  scope = "col">Location</th><th  scope = "col">Description</th><th  scope = "col">Action</th></thead>';
    let tableBody = '';

    for (let i = 0; i < todos.length; i++) {
        let todo = todos[i]
        console.log(todo.id);
        tableBody += `<tr><th  scope = "row"> ${i + 1} </th><td> ${todo.title}</td><td> ${todo.location} </td><td> ${todo.description} </td><td> <button class="btn btn-sm btn-danger m-1" data-value="${todo.id}" onclick="deleteTodo(event)">Delete </button></td></tr>`;
    }
    let table =`${tableStartingCode} ${tableHead}<tbody> ${tableBody} </tbody> ${tableEndingCode}`
    document.getElementById('output').innerHTML = table;
    showOutput(table);
    // console.log(table);
}

showTodos()
// ==================     Delete Todo   ===============

const deleteTodo = (event) => {
    let todoId = event.target.getAttribute('data-value')
   
    const todos =JSON.parse(localStorage.getItem("todos"));

    let todosAfterDelete = todos.filter((todo) => {
     return  todo.id !== todoId
    })
    
     localStorage.setItem("todos",JSON.stringify(todosAfterDelete));
     showNotification("A todo has been successfully deleted","success");
     showTodos();
}

// ==================     Edit Todo   ===============

// const editTodo = () => {
//    let todoId = event.target.getAttribute('data-value');

//    const todos = JSON.parse(localStorage.getItem("todos"));

//    let todo = todos.find((todo)=>{
//     return todo.id === todoId;
//    })
// //    console.log(todo);
// //    return

//    const { title ,location , description} = todo

//    setFieldValue("title",title);
//    setFieldValue("location",location);
//    setFieldValue("description",description);

//    localStorage.setItem("todoForEdit",JSON.stringify(todo));
   
//    addTaskButton.style.display = "none"
//    UpdateTask.style.display = "block"
   
//    showTodos()
// }

// ==================     Handle Edit   ===============

// const handleEdit = () => {
//     const todoForEdit = JSON.parse(localStorage.getItem("todoForEdit"));
   

//     let updateTitle = getFeildValue("title");
//     let updateLocation = getFeildValue("location");
//     let updateDescription = getFeildValue("description");

//     const updatedTodo = {...todoForEdit,title:updateTitle,location:updateLocation,description:updateDescription}
//  console.log(updatedTodo);
//     updatedTodo.dateModified = new Date().getTime();

//     localStorage.setItem("updatedTodo",JSON.stringify(updatedTodo))
//     emptyFieldValue()
    
//     addTaskButton.style.display = "block"
//    UpdateTask.style.display = "none"
   
//    showTodos()
// }