
const express = require("express")
const bodyParser = require("body-parser");
const ejs = require("ejs");
const request = require("request");
const _= require("lodash");
const rp = require('request-promise');
const cheerio = require('cheerio');
const puppeteer = require("puppeteer");
const app = express();

let songArtist = '';
let songSelector = '';
let isLyrics = '';
let paragraphs =[];
let languageSelector = "Lyrics"


app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));

app.get("/", function(req, res){
 res.sendFile(__dirname+"/index.html")

}
);

app.post("/server", async function(req,res){
    songSelector =(req.body.songName).toLowerCase().replace(" ", "-");
    songArtist = (req.body.songArtist).toLowerCase().replace(" ", "-");
    // if(languageSelector!== "Lyrics"){
    // languageSelector = req.body.choco;
    // }
    console.log(req.body);
  console.log(languageSelector);
    console.log(songArtist);
    console.log(songSelector);

    paragraphs = await getParagraphs();
        console.log(paragraphs);
  res.redirect("http://localhost:3000/lyrics")
});




app.get("/lyrics",async (req,res)=> {
  let languageArray = [];
  let translation = [];
  paragraphs.forEach(element=>{
    languageArray.push(element.languageName);
    translation.push(element.translation)
  })
  res.send({paragraphs, languageArray})
});





app.get("/lyrics",function(req,res){
  res.render("renderSong",{lyrics:isLyrics.translation})
})

async function getParagraphs(){
  const browser = await puppeteer.launch({headless:true});
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://www.lyrical-nonsense.com/"+languageSelector+"/"+songArtist+"/"+songSelector+"/")
  const html =await page.content();
  const $ =await cheerio.load(html);

 const lyricsBody = $("#langtabs").map((index,element)=>{
//    const languageElement = $(element).children("div");
//    const selectLanguage = $(languageElement).map((index,element)=>{
// // inside every children of #langtabs
//
//      const languageName =$(element).attr("id");
//      const translationElement = $(element).find(".olyrictext").contents().filter("br");
//      console.log($(translationElement).text())
//      // const translation = $(translationElement).text();
//      return {languageName, translation}


//back up code
const languageElement = $(element).children("div");
const selectLanguage = $(languageElement).map((index,element)=>{
// inside every children of #langtabs
let translation = []
  const languageName =$(element).attr("id");
  const translationElement = $(element).find(".olyrictext").children().map((index,element)=>{
    // translationEl make a copy of the object, so it can be modified and returned later

    let translationEl = $(element).html().replace("<br>","\n").replace("<br>","\n").replace("<br>","\n").replace("<br>","\n").replace("<br>","\n").replace("<br>","\n");

    // the .hmtl gets translationEl, our custom html element, and the .text() gets only the text of the html.
    translation.push($(element).html(translationEl).text().replace("","\n"));
    console.log($(element).text());

  });
  console.log(translation[0])

  return {languageName, translation}


}).get();
return selectLanguage;
}).get();

return lyricsBody;
};
//geting the song Lyrics
const port = 5000;
app.listen(port,function(req, res){
  console.log("server running on port "+port);
})
