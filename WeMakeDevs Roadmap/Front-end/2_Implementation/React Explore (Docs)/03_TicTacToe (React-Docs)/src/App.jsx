// Project Idea from: https://react.dev/learn/tutorial-tic-tac-toe

/* 

Original Docs Code with Exercise Modifications (as mentioned in Docs at the end of project), is stored in this project's root directory.
Code File is named: "Final_TicTacToe.html"

!!! 

* The code written here was my attempt at creating the Tic-Tac-Toe game mentioned in the docs, 'WITHOUT' referring to the docs first for guidance. 
* Thus, I consider the code to be poorly written after going through finer details, best practices and recommendations mentioned in the React Docs.
* It provides some examples for what NOT to do when using React to develop a UI. Especially in case of 'state management'

!!!

*/

import { useState, useEffect } from 'react'
import { GameBoard, NavigationList } from "./components"

/*
  What I did and how things could be simpler as shown in the documentation:

  - What I did:
    * I made the choice of first player symbol random, it can be either 'X' or 'O'. (First symbol was always 'X' in docs)
    * I made multiple states to handle multiple different aspects of the game which increased complexity
    * I did not create a 'square' component and everything related to player turns was handled by GameBoard component as a whole
    * I implemented different kind of checks(row, column, diagonal) to check for a winner or winning state, in the game.
    * I used a Map data structure to keep track of previous states

  - Better ways (to keep in mind for future projects):
    * Even though making first symbol random was a good idea, I could use the 'moveCount % 2' method to determine the current player symbol if the game always started from 'X' or 'O'.
    * Instead of creating multiple different states, it would have been better to create as few states as possible (current move & game state history) and establish a relation between other game aspects and the created states. This would have greatly reduced complexity.
    * Creating a tinier square component which would have served as the basis for the GameBoard component could have increased code modularity, readability and scalability.
    * In the case of checks, I still think that my approach would be better if the complexity of the game increases in future (like more rows and columns). Better to check for currently possible winning states with logic rather than checking for a match from all of the pre-defined hardcoded ones.
    * I could have used a simple Array data structure instead of a Map, to make the code simpler when working with previous game states.

  - Insights:
    * Think of state as the minimal set of changing data that your app needs to remember.
    * How to Identify the ones that are not State:
      1) Does it remain unchanged over time? If so, it isn’t state.
      2) Is it passed in from a parent via props? If so, it isn’t state. (i.e don't pass it in useState hook)
      3) Can you compute it based on existing state or props in your component? If so, it definitely isn’t state!
      
    * Instead of passing too many state values and methods to set them, if the states are closely related and work together, we can pass down a single function from the 'Parent' component that will be triggered from the child component where the Parent component's function will have access to all required states (due to scope and closure). Exlusive Data required from child component can be passed as argument to this called function. (Good example in Docs: Square -> Board -> Game) 

*/

function App() {

  const [playerSymbol, setPlayerSymbol] = useState(Math.random() > 0.5 ? 'X' : 'O');
  const [gameOver, setGameOver] = useState(false);
  const [playerVictory, setPlayerVictory] = useState(false);
  const [gameBoardState, setGameBoardState] = useState([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [savedStatesMap, setSavedStatesMap] = useState(new Map());
  const [selectedGameStateId, setSelectedGameStateId] = useState(null);

  useEffect(() => {
    if (selectedGameStateId == null) return;

    const { player: symbol, gameBoardState: boardState, gameOver: gameEnded } = savedStatesMap.get(selectedGameStateId);
    setGameBoardState(boardState.map(row => [...row]));
    setPlayerSymbol(symbol);
    setGameOver(gameEnded);
    setPlayerVictory(gameEnded);

  }, [selectedGameStateId])

  return (
    <div
      className="flex gap-12 absolute top-8 left-16"
    >
      
      <div className="flex flex-col gap-1">
        <span>{!playerVictory ? "Next Player:" : "Winner:"} <b>{playerSymbol}</b></span>
        <GameBoard
          selectedGameStateId={selectedGameStateId}
          setSelectedGameStateId={setSelectedGameStateId}

          savedStatesMap={savedStatesMap}
          setSavedStatesMap={setSavedStatesMap}

          playerSymbol={playerSymbol}
          setPlayerSymbol={setPlayerSymbol}

          gameBoardState={gameBoardState}
          setGameBoardState={setGameBoardState}
          
          gameOver={gameOver}
          setGameOver={setGameOver}
          setPlayerVictory={setPlayerVictory}
        />
      </div>

      <NavigationList
        savedStatesMap={savedStatesMap}
        setSelectedGameStateId={setSelectedGameStateId}
      />

    </div>
  )
}

export default App;

// More Info from the Docs: In Notes Folder...
