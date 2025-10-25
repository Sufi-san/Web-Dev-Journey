import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "../features/todo/todoSlice";

function AddTodo({ input, onInputChange, inputRef, editTodoId, onEditEnd }) {

    const dispatch = useDispatch();

    const isEditing = editTodoId != null;

    const addTodoHandler = () => {
        dispatch(addTodo(input));
    }

    const updateTodoHandler = (id, text) => {
        dispatch(editTodo({id, text}));
        onEditEnd();
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(!isEditing) addTodoHandler();
        else updateTodoHandler(editTodoId, input);
    } 

    return (
        <form onSubmit={handleFormSubmit} className="space-x-3 mt-12">
            <input
                ref={inputRef}
                type="text"
                className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Enter a Todo..."
                value={input}
                onChange={onInputChange}
            />
            <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
                {!isEditing? "Add": "Edit"} Todo
            </button>
            {
                isEditing &&
                <button 
                onClick={onEditEnd}
                className="text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
                >
                    Cancel
                </button>
            }
        </form>
    );
}

export default AddTodo