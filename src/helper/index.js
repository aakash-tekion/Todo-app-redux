export const sortTodos = (todos) => {
    todos.sort(function(a,b){ return a.completed-b.completed })
    return todos
}