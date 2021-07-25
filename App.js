
function App() {

    const [quotes, setQuotes] = React.useState([])
    const [randomQuote, setRandomQuote] = React.useState("")
    const [bgImage, setBgImage] = React.useState("https://source.unsplash.com/user/joshuaearle/1980x1080")
    const [color, setColor] = React.useState("#16a085")
    React.useEffect(() => {
        async function fetchdata() {
            const response = await fetch("https://type.fit/api/quotes")
            const data = await response.json()

            setQuotes(data);
            let randIndex = Math.floor(Math.random() * quotes.length)
            setRandomQuote(data[randIndex])
        }
        fetchdata()
    }, [])
    const colors = [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#73A857'
    ];
    const handleClick = () => {
        let randIndex = Math.floor(Math.random() * quotes.length)
        setRandomQuote(quotes[randIndex])
        let randomDimensions = `${Math.floor(Math.random() * 600) + 1400}x${Math.floor(Math.random() * 400) + 900}`
        setBgImage(`https://source.unsplash.com/user/joshuaearle/${randomDimensions}`)
        let randColor = Math.floor(Math.random() * colors.length)
        setColor(colors[randColor])
    }
    const bodyStyles = {
        background: `linear-gradient(to right, #2229, #2229), url(${bgImage}) no-repeat top center/cover`,
        height: "100vh"
    }
    document.body.style.background = color;

    return (
        <div id="body" style={bodyStyles}>
            <h1 id="heading">Random Quote Machine</h1>
            <div id="quote-box">
                {
                    randomQuote ?
                        <>
                            <em id="text"  ><i className="fas fa-quote-left"></i> {randomQuote.text}</em>
                            {randomQuote.author ? <h2 id="author" >~ {randomQuote.author}</h2> : <p id="author">No author</p>}
                        </> : <p className="text-center">Loading...</p>
                }
                <div className="btns-container">
                    <button className="button" style={{ background: color }} id="new-quote" onClick={handleClick} >New Quote</button>
                    <div className="links-container">
                        <a
                            className="button" style={{ background: color }}
                            id="tweet-quote"
                            title="Tweet this quote!"
                            target="_blank"
                            href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                            encodeURIComponent('"' + randomQuote.text + '" ' + randomQuote.author)}

                        >
                            <i style={{ color: "white" }} className="fab fa-twitter"></i>
                        </a>
                        <a
                            className="button" style={{ background: color }}
                            id="tumblr-quote"
                            title="Post this quote on tumblr!"
                            target="_blank"
                            href={'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
                            encodeURIComponent(randomQuote.author) +
                            '&content=' +
                            encodeURIComponent(randomQuote.text) +
                            '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'}
                        >
                            <i className="fab fa-tumblr"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )

}

ReactDOM.render(<App />, document.getElementById("app"))