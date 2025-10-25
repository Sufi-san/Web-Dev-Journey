import { useEffect, useRef, useState } from "react";
import { usePrevious } from "../CustomHooks";

/*
    useRef() creates an object with a single property: current. Eg: {current: undefined}
    Refs can store any values we want them to, and we can look up those values later. We can even store references to DOM elements. Thus, data/value 'persists' between renders.
    Note: 'refs' don’t have to store references to DOM nodes. They can hold any value

    useEffect() takes a function as an argument; this function is executed 'after' the component renders, where we can make use of saved references 'refs' too.
    It also accepts a dependency list to know which specific renders to track and run a side effect for.
    Typically, we pass state variables or props in the dependency array. However, the dependencies can technically be anything—functions, refs, or any other value you want to watch.
    - If you provide an empty array [], the effect only runs once after the initial render (similar to componentDidMount for class components).
    - If you omit the dependency array (like in usePrevious), React will run the effect after every render of the component that uses it, because no specific dependencies are being tracked.
*/

function ToDo({ id, name, completed, toggleTaskCompleted, deleteTask, editTask }) {

  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editButtonRef = useRef(null);
  const editFieldRef = useRef(null);

  const wasEditing = usePrevious(isEditing);
  // console.log("Is Editing:", isEditing)
  // console.log("Was Editing:", wasEditing)

  useEffect(() => {
    // console.log("post-render, side-effect");

    if (isEditing) editFieldRef.current.focus();
    if (wasEditing && !isEditing) editButtonRef.current.focus();
  }, [wasEditing, isEditing]);

  // console.log("Main Render, this will execute before useEffect");

  const viewTemplate = (
    <div className="todo stack-small">
      <div className="c-cb">
        <input
          id={"todo-" + id}
          type="checkbox"
          defaultChecked={completed}
          onClick={() => { toggleTaskCompleted(id) }} />
        <label className="todo-label" htmlFor={"todo-" + id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef} >
          Edit<span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => deleteTask(id)}>
          Delete<span className="visually-hidden">{name}</span>
        </button>
      </div>
    </div>
  );

  const editTemplate = (
    <form
      onSubmit={() => {
        editTask(id, newName);
        setEditing(false);
      }}
      className="stack-small"
    >
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input
          id={id}
          className="todo-text"
          type="text"
          onChange={(e) => setNewName(e.target.value)}
          ref={editFieldRef} />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}>
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button
          type="submit"
          className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );

  // console.log(editButtonRef.current); // You'll see that the value of editButtonRef.current is null when the component first renders, but if you click an "Edit" button, it will log the <button> element to the console

  return <li className="todo" role="listitem">{isEditing ? editTemplate : viewTemplate}</li>; // JSX Conditional Rendering in action
}

export default ToDo;