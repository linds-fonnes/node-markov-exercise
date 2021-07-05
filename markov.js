/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = {} ;
    
    for (let i = 0; i < this.words.length; i++){
      let word = this.words[i]
      if(!chain[word]){
        chain[word] = []
      }
      if(this.words[i + 1]){
        chain[word].push(this.words[i + 1])
      } else {
        chain[word].push(null)
      }
    }
    console.log(chain)
    this.chain = chain;
  }

  randomNum(keys){
    return Math.floor(Math.random() * keys.length);
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(Object.keys(this.chain));
    let key = keys[this.randomNum(keys)]
    let output = [];

    while (output.length < numWords && key !== null){
      output.push(key)
      key = keys[this.randomNum(keys)]
    }
    console.log(output)
    return output.join(" ")
}
}

module.exports = { MarkovMachine }