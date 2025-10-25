// Docs referred (MDN): https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started

import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

function getTaskList() {
  let id = 0;
	const tasks = [
		{id: id++, name: "Eat", completed: true}, 
		{id: id++, name: "Sleep", completed: false}, 
		{id: id++, name: "Repeat", completed: false}
	]
  return tasks;
}


createRoot(document.getElementById('root')).render(
  <>
    <App taskList={getTaskList()} />
  </>,
)
