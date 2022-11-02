import React from 'react'
export default function Meme(){
    const [meme,setMeme] = React.useState(
        {
            topText: "",
            bottomText:"",
            randomImage: ""
        }
    )
    React.useEffect(()=> {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemeImages(data.data.memes))
    },[])
    const [allMemeImages, setAllMemeImages] = React.useState([])
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        const url = allMemeImages[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    return (
        <main>
            <div className='inputs'>
                <input type="text" 
                    className="input" 
                    placeholder='Top text'
                    name='topText'
                    value={meme.topText}
                    onChange={handleChange}
                    />
                <input type="text" 
                    className="input" 
                    placeholder='Bottom text'
                    name='bottomText'
                    value={meme.bottomText}
                    onChange={handleChange}
                    />
                <button onClick={getMemeImage} className='button'>Get a new Meme image🖼</button>
            </div>
            <div className='meme-img'>
                <img  className='img' src={meme.randomImage} alt=""/>
                <h2 className='meme--text top'>{meme.topText}</h2>
                <h2 className='meme--text bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    )
}