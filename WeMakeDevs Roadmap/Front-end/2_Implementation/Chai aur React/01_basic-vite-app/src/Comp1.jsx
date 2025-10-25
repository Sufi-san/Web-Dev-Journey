
function Comp1() {
    const randomNum = parseInt(Math.random() * 20);
    return (
        <a href='https://youtu.be/k3KqQvywToE?feature=shared' target='_blank'>Visit Youtube {randomNum}</a> // using {} for including variables inside JSX
    )
}

export default Comp1