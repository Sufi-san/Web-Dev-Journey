import { useState, useEffect } from "react";

function GameBoard(
    {
        selectedGameStateId,
        setSelectedGameStateId,
        savedStatesMap,
        setSavedStatesMap,
        playerSymbol,
        setPlayerSymbol,
        gameBoardState,
        setGameBoardState,
        gameOver,
        setGameOver,
        setPlayerVictory
    }
) {

    const rowCheck = (rowInd, symbol) => {
        for (let i = 0; i < gameBoardState[0].length; i++) {
            if (gameBoardState[rowInd][i] != symbol) return false;
        }
        return true;
    }

    const colCheck = (colInd, symbol) => {
        for (let i = 0; i < gameBoardState.length; i++) {
            if (gameBoardState[i][colInd] != symbol) return false;
        }
        return true;
    }

    const diagsCheck = (symbol) => {
        // Checking first diagonal
        let allSame = true;
        for (let i = 0, j = 0; i < gameBoardState.length; i++, j++) {
            if (gameBoardState[i][j] != symbol) {
                allSame = false;
                break;
            }
        }
        if (allSame) return true;

        // Checking second diagonal
        for (let i = 0, j = gameBoardState[0].length - 1; i < gameBoardState.length && j >= 0; i++, j--) {
            if (gameBoardState[i][j] != symbol) return false;
        }
        return true;
    }


    const checkGameStatus = (rowInd, colInd) => {

        const symbol = gameBoardState[rowInd][colInd];
        let gameOver = rowCheck(rowInd, symbol);
        gameOver |= colCheck(colInd, symbol);
        gameOver |= diagsCheck(symbol);

        setPlayerVictory(gameOver); // till here we checked for game over by a player winning

        // below, if moveCount is equal to 9, we know more moves are not possible and game is definitely over
        return (moveCount == 9) ? true : gameOver;
    }


    const updateGameGrid = (rowInd, colInd) => {
        const newGameBoardState = [...gameBoardState];
        newGameBoardState[rowInd][colInd] = playerSymbol;
        setGameBoardState(newGameBoardState);
    }


    const [moveCount, setMoveCount] = useState(0);

    const addToStatesMap = (key, newState) => {
        setSavedStatesMap((prev) => new Map(prev.set(key, newState)));
        // Using callback is necessary to keep state consistent on 'handleClick()' when selectedGameId != null
    }

    useEffect(() => {
        addToStatesMap(moveCount, { player: playerSymbol, gameBoardState: gameBoardState.map(row => [...row]), gameOver: gameOver });
    }, []);

    const changeSymbol = (symbol) => {
        return (symbol == "O") ? "X" : "O"
    }

    const updateGameStates = (moveCount, rowInd, colInd) => {
        setMoveCount(moveCount);
        updateGameGrid(rowInd, colInd);
        addToStatesMap(moveCount, { player: changeSymbol(playerSymbol), gameBoardState: gameBoardState.map(row => [...row]), gameOver: gameOver });
    }

    const handleClick = (rowInd, colInd) => {

        if ((gameOver && selectedGameStateId == null) || gameBoardState[rowInd][colInd]) return;
        // change to game board will be permitted when navigating, even if game is over in the latest game state
        // will never allow click interaction with gameboard if selected slot is already filled.

        if (selectedGameStateId != null) {
            setSelectedGameStateId(null);
            setGameOver(gameOver && selectedGameStateId == moveCount);

            setSavedStatesMap((prevSavedStatesMap) => {
                const newSavedStatesMap = new Map(prevSavedStatesMap);
                for (let i = selectedGameStateId + 1; i <= moveCount; i++) newSavedStatesMap.delete(i);
                return newSavedStatesMap;
            });

            // When restarting play from a previous state, clear future states from savedStatesMap.
            // Initially, direct mutation (savedStatesMap.delete(i)) worked but violated React's immutability rules.
            // Using setSavedStatesMap with a new Map correctly clears future states.
            // The bug occurred because 'updateGameStates', called after this, used the old 'savedStatesMap'
            // (not yet updated due to React's asynchronous state updates) when adding the new move,
            // reintroducing cleared states. Fixed by updating 'addToStatesMap' (called inside 'updateGameStates') to use functional updates:
            // setSavedStatesMap((prev) => new Map(prev.set(key, newState))).
        }

        const id = selectedGameStateId ?? moveCount;
        updateGameStates(id + 1, rowInd, colInd);

        const gameEnded = checkGameStatus(rowInd, colInd);
        if (gameEnded) {
            setGameOver(true);
            addToStatesMap(id + 1, { ...savedStatesMap.get(id + 1), player: playerSymbol, gameOver: true });
            return;
        }

        setPlayerSymbol(changeSymbol(playerSymbol));
    }

    // useEffect(() => console.log(savedStatesMap), [savedStatesMap]);


    const gameGrid = (
        gameBoardState?.map((rows, rowInd) =>
            rows.map((cols, colInd) =>
                <div
                    key={rowInd + "" + colInd}
                    className={"flex items-center justify-center text-xl p-0 w-[35px] h-[30px] border-gray-400 border-[1px] font-bold"}
                    onClick={() => handleClick(rowInd, colInd)}
                >
                    {gameBoardState[rowInd][colInd]}
                </div>
            )
        )
    )

    return (
        <div className={"grid grid-cols-3"}>
            {gameGrid}
        </div>
    )
}

export default GameBoard;