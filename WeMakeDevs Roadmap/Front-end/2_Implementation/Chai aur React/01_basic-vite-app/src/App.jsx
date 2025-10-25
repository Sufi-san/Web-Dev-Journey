import Comp1 from './Comp1';
function App() {
  return (
    <>
      <h1>Sufi's Vite-React Code</h1>
      <p>
        React has frameworks like Next-JS, Gatsby and Remix that make the development process more organized and provide a complete bundle of required features.

        However, React can still be used standalone without making use of the frameworks.
        
        'React' the core library is further complemented by 'react-dom' and 'react-native' libraries. 'react-dom' is focused for building web apps while 'react-native' is for mobile apps.
        
        Even though we can create a pure react project, it consumes a lot of time for starting the development server and consists of a lot of dependencies that might be completely unnecessary for our project. To avoid this, we can use React with 'Vite' build tool that improves the dev server start time.
        
        1. Creating a pure react project:
            - create the react project directory using -- 
                npx create-react-app 'folder-name'
            - change current directory to the created one
            - to run the react project locally use -- 
                npm start OR npm run start
        
        2. Creating a react project using vite as the build tool:
            - create the vite project directory using -- npm create vite@latest 'folder-name'
            - change current directory to the created one
            - perform required installation step for vite project using -- 
                npm install
            - to run the project locally use --
                npm run dev
        
        - To create a 'production' build that is deployed and is served to the users instead of the source code, we can use the following command for both vite and react --
            npm run build
        It creates a 'build' folder that contains actual files to be hosted.
        
        
        # Important content inside the project folder:
        
        1. package.json & package-lock.json-- This file contains information about the react project such as name, version, dependencies and scripts (commands we can use in terminal with npm).
        
        2. readme.md -- A predefined readme file. (It is recommended to update this according to your project)
        
        3. src -- The development folder where all source code will be stored.
        
        4. node_modules -- The folder that stores all the code files that are dependencies for the project.
        
        
        Inside the 'src' folder, we can remove unnecessary files. Similarly we can also remove unnecessary content from the project folder itself.
      </p>
      <Comp1 />
    </>
  )
}

export default App
