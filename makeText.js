/** Command-line tool to generate Markov text. */
const fs = require("fs")
const {MarkovMachine} = require("./markov") 
const axios = require("axios")

function markovText(data){
    let mm = new MarkovMachine(data)
    mm.makeText()
}

function makeText(file){
    fs.readFile(file,"utf8", function(err, data){
        if(err){
            console.log(`There was an error reading ${file} : ${err}`)
            process.exit(1)
        } else {
            markovText(data)
        }
    })
}

async function makeURLText(url){
    let resp;
    try {
        resp = await axios.get(url);
    } catch(err){
        console.log(`Error reading URL ${url}: ${err}`)
        process.exit(1)
    }
    markovText(resp.data)
}

if (process.argv[2] === "file"){
    makeText(process.argv[3])
} else if (process.argv[2] === "url"){
    makeURLText(process.argv[3])
} else {
    console.log("Invalid. Must be file or url")
    process.exit(1)
}