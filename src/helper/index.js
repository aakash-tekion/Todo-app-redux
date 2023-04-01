export const sortTodos = (todos) => {
    todos.sort(function(a,b){ return a.completed-b.completed })
    return todos
}
export const chechIfTodoExist=(todosList,todo,key='')=>{
    let bool = false;
    todosList.forEach(item=>{
        if(item.data.toLowerCase() === todo.toLowerCase() && key!==item.id){
            bool = true
            alert('Todo exist!!!')
        }
    })
    return bool;
}
