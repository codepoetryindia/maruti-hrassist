export const AddTodoActions = todo => (dispatch, getState) => {
  console.log('to do from txtInput', todo);
  const {
    TodoState: {Todo},
  } = getState();
//   const Todo = TodoState.Todo.toDos;
  console.log('To do state', Todo);

  //   const hasTodo = Todo.find(i => i.todo === todo);
  //   if (!hasTodo && todo !== '') {
  //     dispatch({
  //       type: 'ADD_TODO',
  //       payload: [{id: todo, todo}, ...Todo],
  //     });
  //   }
};

export const RemoveTodoAction = todo => (dispatch, getState) => {
  const TodoState = getState();
  const Todo = TodoState.Todo.toDos;
  console.log('To do state', TodoState.Todo.toDos);
  dispatch({
    type: 'REMOVE_TODO',
    payload: Todo.filter(t => t.id !== todo),
  });
};
