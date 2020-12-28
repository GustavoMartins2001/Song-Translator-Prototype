import React, {useState} from "react";

function Start(){

  const [input,setInput] = useState({
    songArtist: "",
    songName: ""
  });

  function handleChange(event){

    const {name,value}= event.target;
    setInput(prevValue=>{
      return{
        ...prevValue,
        [name]:value
      };
    });
    console.log(input);
  }



    return(
<form  method="post" action="http://localhost:5000/server">
     <div>
      <p>Insert Artist</p>
    <input onChange={handleChange} type="text" name="songArtist" value={input.songArtist} />
    <p>Insert song Name</p>
    <input onChange={handleChange} type="text" name="songName" value={input.songName} />
    <button type="submit" name="button">Find</button>
    </div>
</form>
)}

export default Start;
