import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Axios from "axios";

function GetLyrics(){
  const [lyrics,setLyrics] = useState([])
const [language,setLanguage] = useState([])
const [getL,setL]=useState([]);

  useEffect(()=>{

    async function serverResponse(){
      Axios.get("/lyrics").then(async response=>{
        const data = await response.data;
        console.log(data)
        setLyrics(data.paragraphs);
        setLanguage(data.languageArray)
      })};
      serverResponse();
    },[])

function getTranslation(languageElement){
  let result = lyrics.filter(element=>{
    return element.languageName === languageElement
  })
  console.log(lyrics);
setL(result[0].translation)
}

    return (
      <div>
      {language.map((language)=>{
        return(
      <button  onClick={()=>{getTranslation(language);}}  value={language}>{language}</ button>
    )})}

      <p className = "LyricsBox" style={{margin: "1% 20% 1%", color:"#E0E0E0", backgroundColor:"#080808", whiteSpace:"pre-wrap"}}>{getL}</p>
      </div>
)
  }





export default GetLyrics;
