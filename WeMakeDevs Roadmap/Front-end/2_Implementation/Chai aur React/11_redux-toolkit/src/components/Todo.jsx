import { useSelector, useDispatch } from "react-redux";
import { removeTodo, toggleCompleted } from "../features/todo/todoSlice";

function Todo({ editTodoId, onEditStart }) {

    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);

    return (
        <>
            <div>Todos</div>
            <ul className="list-none w-2xl">
                {todos.map((todo) => {

                    const isUnderEdit = editTodoId == todo.id;
                    const editTodoStyle = isUnderEdit ? "border-2 border-blue-400" : "";

                    return (
                        <li
                            className={`mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded ${editTodoStyle}`}
                            key={todo.id}
                        >
                            <div className='text-white'>{todo.text}</div>
                            <div className="flex gap-2 px-4">
                                {
                                    !isUnderEdit &&
                                    <>
                                        <button
                                            onClick={() => { onEditStart(todo.id, todo.text) }}
                                            className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => dispatch(removeTodo(todo.id))}
                                            className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </>
                                }

                            </div>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default Todo