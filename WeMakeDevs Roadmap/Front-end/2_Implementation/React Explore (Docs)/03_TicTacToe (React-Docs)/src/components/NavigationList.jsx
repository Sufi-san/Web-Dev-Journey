
function NavigationList({ savedStatesMap, setSelectedGameStateId }) {

    return (
        <ol type="i" className="pt-3 list-decimal text-[18px]">
            {
                [...savedStatesMap.keys()].map((id) =>
                    <li key={id}>
                        <button
                            className="border-gray-500 border-[1px] rounded-[5px] bg-gray-200 px-[5px] text-sm"
                            onClick={() => setSelectedGameStateId(id)}
                        >
                            {id > 0 ? `Go to move #${id}` : "Go to game start"}
                        </button>
                    </li>
                )
            }

        </ol>
    )
}

export default NavigationList