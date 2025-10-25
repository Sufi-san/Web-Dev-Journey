/*
  What we see here:
	- Valid JSX or primitive JS data types are acceptable as React Child and can be rendered
	- Objects are not valid as a React Child. (includes array, set, map)
	- Collections like array, set, map however, still get displayed if used directly even though a warning is displayed in console for each of them.
	- To accurately render collections, JS functions like 'map' can be used.
	- The children in collections (rendered via map function) should have a 'key' attribute with an assigned unique id. (for optimisation and performance)
	- We can use ternary or short-hand boolean evaluation to enable 'conditional' rendering inside JSX (No if-else)
*/


// for getArr and getSet React will display a warning in console due to absence of 'key' for each element of the collection
function getArr(jsx) {
	const elements = [];
	elements.push(jsx);
	elements.push(<p>This is an array(list)</p>);
	elements.push("\nThis is a string ");
	elements.push(12934.2349872);
	return elements;
}

function getSet(jsx) {
	const set = new Set();
	set.add(jsx);
	set.add(<p>This is a set</p>);
	set.add("\nThis is a string ");
	set.add(<p></p>);
	set.add(12934.2349872);
	return set;
}

// Even though 'Maps' aren't supported as children in React, they still get rendered and displayed on the webpage unlike objects
function getMap() {
	const map = new Map();
	map.set(1, <p>This is a map</p>)
	map.set(2, "\nThis is a string ");
	map.set(3, <p></p>);
	map.set(4, 12934.2349872);
	return map
}

function getValidCollectionJSX(arr) {
	let count = 1;
	return arr.map(obj => {
		const jsx = Object.keys(obj).map(key => <p style={{marginLeft: '40px'}}>{key}: {obj[key]}</p>);
		return (
			<div style={{marginTop: '20px'}}>
				Object {count++} {'{'}{jsx}{'}'}
			</div>
		);
	})
}

function App({library, greeting}) { // destructuring props object

	const names = ['Alpha', 'Beta', 'Gamma', 'Delta'];
	const objectList = [{ name: "Sufi", age: 4 }, { type: 'obj', index: 1 }, { index: 2 }, { name: "Fourth Object" }];

	
	const e1 = (
		<>
			<h1>e1</h1>
			<h1>{greeting} {library}!!</h1>
			<h2>Heading 2</h2>
		</>
	)
	/*
		The parentheses '(..jsx code..)' in the previous snippet aren't unique to JSX, and don't have any effect on your application. They're a signal to you (and your computer) that the multiple lines of code inside are part of the same expression.
	*/
	const e2 =
		<>
			<h1>e2</h1>
			<p>This is a paragraph</p>
			<p>This is another paragraph</p>
		</>
	const e3 =
		<>
			<h1>e3</h1>
			{e1}
			{e2}
		</>

	console.log(typeof e1, typeof e2); // object
	console.log(e1); // will display 'reactElement' object
	console.log(e2); // object similar to 'e1'

	const num1 = Math.floor(Math.random() * 10);
	console.log("Random Number:", num1);

	return (
		<>
			{
				(num1 % 2 == 0) ? e1 : e2 // Like if-else
			}
			{
				(num1 % 2 == 1 && getArr(e3)) // Like a single if statement
			}
			{
				names.map(name =>
				<div
					key={name}
					style={{ fontStyle: 'italic', textDecoration: 'underline' }}>

					{name}

				</div>)
			}
			{
				getSet(e2)
			}
			{
				getMap()
			}
			{
				getValidCollectionJSX(objectList)
			}
		</>
	)
}

export default App
