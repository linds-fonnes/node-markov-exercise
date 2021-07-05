const {MarkovMachine} = require("./markov")

describe("tests that Markov Machine Class works", function(){
    let mm;
    beforeAll(function(){
        mm = new MarkovMachine("testing testing one two three")
    })

    test("should return chains for instantiated markov machine", function(){
        expect(mm.chain).toEqual({testing: ["testing","one"], one: ["two"], two: ["three"], three: [null]})
    })

    test("should return a random number between 0 and arr length", function(){
        let random = mm.randomNum([1,2,3,4,5])
        expect(random).toBeGreaterThanOrEqual(0)
        expect(random).toBeLessThan(6)
    })

    test("should return text the length of input & containing text from chain", function(){
        let test1 = mm.makeText();
        let test2 = mm.makeText(numWords=15);
        
        expect(test1.split(" ").length).toEqual(100)
        expect(test2.split(" ").length).toEqual(15)

        expect(test1).toContain("testing" || "one" || "two" || "three")
        expect(test1).toContain("testing" || "one" || "two" || "three")
    })
})