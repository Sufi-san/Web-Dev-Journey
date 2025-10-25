import { ToDo, FilterButton, Form } from './Components';
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { usePrevious } from './CustomHooks';

/*
	How to figure out what part of the app is a component?
		- If it represents an obvious "chunk" of your app, it's probably a component
		- If it gets reused often, it's probably a component.
*/
/*
	JSX elements can have custom props/attributes different from HTML elements like:
		- key
		- ref
	
	Also, some JSX attributes with similar functionality may have a different name or case convention: (for distinguishing or due to reserved keywords of JS)
		- class (HTML) -> className (JSX)
		- for (HTML) -> htmlFor (JSX)

	Props can be named anything however, common convention for callback props is using 'on' and the event handled. Like 'onOpen', 'onClose', 'onSubmit'. 
*/
/* 
	We need the ability to create new data, retain it, and update it later. Props are not the right tool for this job because they are immutable — a component cannot change or create its own props.

	This is where state comes in. If we think of props as a way to communicate between components, we can think of state as a way to give components "memory" – information they can hold onto and update as needed.

	useState() in React:

	- State Management: Primarily used to manage the state of components.
	- Behavior Overriding: Can also be used to override the default behavior of elements for custom control.
	- Example: Input Element:
		Pass a state variable as the value prop.
		Pass a function to update the state variable when the input changes.
		The input element appears to update its value, but it's actually displaying the current state value.
		The state is updated through the provided function, causing the input to reflect the changes.

	- Key Points:

		useState() provides a mechanism for managing component-specific state.
		It can be used to customize element behavior by passing controlled props.
		This approach gives you greater control over data flow and updates within your React components.
	
	The components that are overridden this way are called as 'Controlled' components while the ones that are not overridden are 'Uncontrolled' components.
*/

/* Accessibility and targetting DOM elements:
	We've been writing JSX components and letting React build the resulting DOM behind the scenes. 
	Most of the time, we don't need to target specific elements in the DOM because we can use React's state and props to control what gets rendered. To manage 'focus' however, we do need to be able to target specific DOM elements.

	This is where the useRef() hook comes in.

	To take advantage of our newly referenced elements, we need to use another React hook: useEffect()

	useEffect() is so named because it runs any side-effects that we'd like to add to the render process but which can't be run inside the main function body. useEffect() runs right after a component renders, meaning the DOM elements we referenced will be available for us to use.
*/

/*
	We are defining below constants outside our App() function because if they were defined inside it, they would be recalculated every time the <App /> component re-renders, and we don't want that. This information will never change no matter what our application does.
*/
const filters = ["All", "Active", "Completed"];
const FILTER_MAP = {
	All: () => true,
	Active: (task) => !task.completed,
	Completed: (task) => task.completed
}

function App(props) {

	const [tasks, setTasks] = useState(props.taskList);
	const [filter, setFilter] = useState(filters[0]);
	// My previous approach required maintaining a filter 'function' using 'useState'
	// However, it required a workaround due to 'useState' itself accepting a callback argument
	// The workaround was: useState(() => myCallbackFunc)
	// https://stackoverflow.com/questions/55621212/is-it-possible-to-react-usestate-in-react 

	const listHeadingRef = useRef();
	const prevTaskCount = usePrevious(tasks.length);
	/*
		The usePrevious hook in this case is triggered by renders of the App component, because that’s where the tasks.length state and the effect logic are located.

		While individual ToDo components handle task deletions, the state update (of tasks) happens at the App level, and this state change causes the App component to re-render, thus affecting the useEffect and the usePrevious hook.

		Whenever a component re-renders, the function calls made directly inside its scope are executed again

		So, the rendering of the App component, leading to function re-execution is what affects the nested useEffect inside the usePrevious hook in this scenario.
	*/

	useEffect(() => {
		if (tasks.length < prevTaskCount) listHeadingRef.current.focus();
	}, [tasks.length, prevTaskCount]);

	function addTask(name) {
		// alert(`${name} was added to the task list.`);
		setTasks([...tasks, { id: `todo-${nanoid()}`, name: name, completed: false }]);
	}

	function toggleTaskCompleted(id) {
		const updatedTasks = tasks.map(task => {
			if (task.id === id) task.completed = !task.completed;
			return task;
			/* // Can also do: (Creating new object for updated task)

				if(task.id === id) {
					return {...task, completed: !task.completed}
				}
				return task
			*/
		});

		setTasks(updatedTasks);
		// console.log(tasks);
	}

	function deleteTask(id) {
		const remainingTasks = tasks.filter(task => task.id != id);
		setTasks(remainingTasks);
		// console.log(tasks);
	}

	function editTask(id, newTaskName) {
		const newName = newTaskName.trim();
		if (!newName) return;
		// console.log(newName);
		const editedTasks = tasks.map(task => {
			if (task.id === id) {
				return { ...task, name: newName };
			}
			return task;
		});
		setTasks(editedTasks);
		// console.log(editedTasks);
	}

	const taskList = tasks?.filter(FILTER_MAP[filter]).map(({ id, name, completed }) =>
	(
		<ToDo
			key={id}
			id={id}
			name={name}
			completed={completed}
			toggleTaskCompleted={toggleTaskCompleted}
			deleteTask={deleteTask}
			editTask={editTask}
		/>
	));

	const filterList = filters.map((filterName) =>
	(
		<FilterButton
			key={filterName}
			filterName={filterName}
			isPressed={filter === filterName}
			setFilter={setFilter}
		/>
	));

	return (
		<div className="todoapp stack-large">
			<h1>TodoMatic</h1>
			<Form addTask={addTask} />
			<div className="filters btn-group stack-exception">
				{filterList}
			</div>
			<h2
				ref={listHeadingRef}
				id="list-heading"
				tabIndex={-1}
			>
				{/*tabIndex makes elements focusable (the ones that are generally not focusable).
				-1 indicates that elements can be focused on using only JavaScript and NO tab presses unlike buttons, inputs and links*/}
				{taskList.length} task{taskList.length != 1 ? "s" : ""}
				remaining
			</h2>
			<ul
				role="list"
				className="todo-list stack-large stack-exception"
				aria-labelledby="list-heading"
			>
				{taskList}
			</ul>
		</div>
	);
}

export default App;

/*
	Some thought provoking questions and answers:

		1. Is the function for the App component called again when the re-render occurs?
		->
			Yes, the function for the App component is called again during re-rendering. React re-runs the entire function of the component to "repaint" it with the updated state or props.

		2. If the function is called again, then why is the state of 'tasks' or 'filters' not reset due to initialization by the props.taskList or filter[0]?
		->
			- useState only sets the initial value (props.taskList or filter[0]) on the very first render. After that, React internally manages the state and doesn’t run the initializer (props.taskList or filter[0]) again on future re-renders.
			- When you call setTasks or setFilter, React updates the state in memory, and the updated state is used on the next re-render, instead of the initial props.taskList or filter[0].

		3. When a parent component re-renders, is it true that all children components will re-render as well? If not then why?
		->
			React's default behavior is to re-render a child component whenever its parent re-renders. Child component will re-render if:

			1) The props it receives have changed.
			2) It has its own state that changed.
			3) The parent forces it to re-render (without optimizations like React.memo).

			By using tools like 'React.memo', you can optimize rendering and avoid unnecessary child re-renders when the props are unchanged.

		4. If I have a parent component with a child component that depends on a certain state, and I add another unrelated state to the parent, which changes and causes the parent to re-render, will the child component also re-render if React.memo is not used, even though the state it depends on hasn’t changed?
		->
			Yes, if a new state is added to the parent component and causes it to re-render, the child component will also re-render, even if the child component is not directly affected by the new state change, as long as `React.memo` is not used to optimize the child’s re-rendering behavior.

		5. Why do I need to use React.memo when react uses a 'diffing' algorithm while rendering using the virtual DOM? Also, what is the difference between React.memo, useMemo and useCallback?
		->
			- Virtual DOM diffing minimizes 'DOM updates' but doesn't prevent component re-renders.
			- The process of creating a new Virtual DOM to compare to the old Virtual DOM to identify actual DOM changes still occurs. (Reconciliation)
			- React.memo minimizes unnecessary component re-renders if props haven't changed, and thus skips this process that might cause additional overhead.

			- Difference between React.memo, useMemo and useCallback:
				https://medium.com/geekculture/great-confusion-about-react-memoization-methods-react-memo-usememo-usecallback-a10ebdd3a316
			- In short:
				- memo -> memoizes React Functional Components preventing re-render
				- useMemo -> memoizes return values for functions/callbacks, preventing expensive computation
				- useCallback -> 
					Memoizes definition for functions/callbacks, preventing unnecessary redefinition. 
					'React.memo()' cannot optimize in case of functions passed as props as even if the definition (logic or values used inside the function) for the function hasn't changed, on each render the instance (reference to object in memory) of the function changes.
					This is where 'useCallback' comes into play by returning the same instance for a function instead of a fresh one if the definition of the function hasn't changed on any render.
				- useMemo and useCallback also accept a dependency list to check/compare for updates
				- memo, useMemo and useCallback are often used together for optimization purposes.
			
			- Note:
				- From React 19 onwards, the need for explicit memoization using React.memo(), useMemo(), and useCallback() is significantly reduced, thanks to the new React Compiler. The compiler automatically optimizes components and hooks, ensuring that elements only re-render when their semantic value changes, rather than when the object identity (in-memory reference to object) of props or state changes
				- Traditional React (before Compiler): Relied heavily on shallow equality checks to determine if a component needed to re-render. If a prop or state object changed its reference (even if the values inside the object were the same), React would assume a change and potentially trigger a re-render.
				- React 19 (with Compiler): The React Compiler is designed to understand the semantics of your JavaScript and React code. It analyzes the dependencies and logic within components and hooks. This means:
					- Avoiding unnecessary re-renders: If a prop object changes its reference but its actual, relevant values remain the same, the compiler can detect this and skip the re-render because the semantic value hasn't changed.
					- Focusing on meaningful updates: The goal is to only re-render parts of the UI when there are changes that will visibly affect the user or the component's logical behavior. 
				- However, React.memo() might still be useful in specific situations, like when working with third-party libraries that rely on memoized values or when dealing with extremely expensive calculations that the compiler might not fully optimize. It can also be beneficial in complex scenarios identified through performance profiling where the compiler's optimizations don't entirely address bottlenecks

*/

// React Resources: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_resources
