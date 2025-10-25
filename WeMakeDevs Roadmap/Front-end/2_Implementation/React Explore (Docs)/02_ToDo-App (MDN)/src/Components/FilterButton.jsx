
function FilterButton({ filterName, isPressed, setFilter }) {

    return (
        <button
            type="button"
            className="btn toggle-btn"
            aria-pressed={isPressed}
            onClick={() => setFilter(filterName)}
        >
            <span className="visually-hidden">Show </span>
            <span>{filterName}</span>
            <span className="visually-hidden"> tasks</span>
        </button>
    )
}

export default FilterButton;