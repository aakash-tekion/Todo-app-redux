export const sortTodos = (todos) => {
    todos.sort(function(a,b){ return a.completed-b.completed })
    return todos
}
export const chechIfTodoExist=(todosList,todo)=>{
    let bool = false;
    todosList.forEach(item=>{
        if(item.data === todo){
            bool = true
            alert('Todo exist!!!')
        }
    })
    return bool;
}
