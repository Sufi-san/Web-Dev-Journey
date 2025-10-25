function Card(props) { // We can also destructure {cardDetails, greetInConsole, strVal, strVal2}
    // In functions, we can also assign default values while destructuring objects {cardDetails, greetInconsole, strVal='default val 1', strVal2='default val 2'}

    console.log(props)
    console.log(typeof props);
    console.log(Object.entries(props));
    props.greetInConsole("Hello World!");

    return (
        <div className="flex flex-col rounded-xl p-4 m-12"
          style={{
            border: '0.88px solid',
    
            backdropFilter: 'saturate(180%) blur(14px)',
            background: ' #ffffff0d',
          }}
        >
          <div>
            <img
              src="https://res.cloudinary.com/ddcg0rzlo/image/upload/v1652470298/9StaF0UBJfih_df0248.gif"
              alt="nft-gif"
              width="full"
              height="400"
              className="rounded-xl"
            />
          </div>
          <div className="flex flex-col  rounded-b-xl py-4 ">
            <div className="flex justify-between">
              <h1 className="font-RubikBold ">Bored ape nft accidental</h1>
              <h1 className="font-bold font-RubikBold">Price</h1>
            </div>
            <div className="flex  justify-between font-mono">
              <p>{props.cardDetails.cardId}</p>
              <p>{props.cardDetails.cardPrice}</p>
            </div>
          </div>
        </div>
    )
}

export default Card