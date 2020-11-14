// Array that contains question-answer pair
let mainArray = [
  ["every()", `The every method works with arrays to check if every element passes a particular test.
   It returns a Boolean value - true if all values meet the criteria, false if not.

  var numbers = [1, 5, 8, 0, 10, 11];
  numbers.every(function(currentValue) {
    return currentValue < 10;
  });
  // Returns false.`],
  ["How to reverse a word?", "word = word.split('').reverse().join('')"],
  ["reduce()", `The reduce() method executes a reducer function (that you provide) on each element of
   the array, resulting in single output value.
    const array1 = [1, 2, 3, 4];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    
    // 1 + 2 + 3 + 4
    console.log(array1.reduce(reducer)); 
    // expected output: 10
    
    // 5 + 1 + 2 + 3 + 4
    console.log(array1.reduce(reducer, 5));
    // expected output: 15`],
  ["Destructuring assignment", `const user = { name: 'John Doe', age: 34 };

  const name = user.name; // name = 'John Doe'
  const age = user.age; // age = 34
  
  Here's an equivalent assignment statement using the ES6 destructuring syntax:
  
  const { name, age } = user;
  // name = 'John Doe', age = 34
  
  Destructuring allows you to assign a new variable name when extracting values.
  You can do this by putting the new name after a colon when assigning the value.`],
  ["Getters and setters", `class Thermostat {
    constructor(Fahrenheit){
      this.Fahrenheit = Fahrenheit;
    }
    get temperature(){
       return (5 / 9) * (this.Fahrenheit - 32);
    }
    set temperature(celsius){
      this.Fahrenheit = (celsius * 9.0) / 5 + 32;
    }
  };
  
  const thermos = new Thermostat(76); // Setting in Fahrenheit scale
  let temp = thermos.temperature; // 24.44 in Celsius
  thermos.temperature = 26;
  temp = thermos.temperature; // 26 in Celsius`],
  ["Set object", `The Set object lets you store unique values of any type, whether primitive values or object
   references.

  let a = [1, 3, 1, 4, 5, 6, 4];
  
  let bSet = [...new Set(a)]
  //creates array of only unique elements of a`],
  ["returns an array of a given object's own enumerable property names", `const object1 = {
    a: 'somestring',
    b: 42,
    c: false
  };
  
  console.log(Object.keys(object1));
  // expected output: Array ["a", "b", "c"]`],
  ["remove the last element from an array", `The pop() method removes the last element from an array and returns
   that element. This method changes the length of the array.

  const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
  
  console.log(plants.pop());
  // expected output: "tomato"
  
  console.log(plants);
  // expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
  
  plants.pop();
  
  console.log(plants);
  // expected output: Array ["broccoli", "cauliflower", "cabbage"]`],
  ["remove the first element from an array", `The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array.

  const array1 = [1, 2, 3];
  
  const firstElement = array1.shift();
  
  console.log(array1);
  // expected output: Array [2, 3]
  
  console.log(firstElement);
  // expected output: 1
  `],
  [`sort elements in an array by decreasing frequency of elements. If two elements have the same frequency,
   sort them by increasing value.

  solve([2,3,5,3,7,9,5,3,7]) = [3,3,3,5,5,7,7,2,9]`, `function solve(arr){
    var r={}
    for(var n of arr) r[n]=r[n]+1||1;
    return arr.slice().sort((a,b)=>r[b]-r[a]||a-b)
  }`],
  ["pop()", `The every method works with arrays to check if every element passes a particular test.
   It returns a Boolean value - true if all values meet the criteria, false if not. 
    
    var numbers = [1, 5, 8, 0, 10, 11]; 
    numbers.every(function(currentValue) { 
      return currentValue < 10; 
    }); 
    // Returns false`],
]

let text = ""; // eventually put into print function
let nrOfQuestions = mainArray.length;

function print(message) {
  let listContainer = document.getElementById("listContainer");
  listContainer.innerHTML = message;
}

// Function to toggle answer shown or hidden. 
function toggle(divNr) {
  const myDiv = document.getElementsByClassName("myDIV");
  if (myDiv[divNr].style.display !== "block") {
    myDiv[divNr].style.display = "block";
  } else {
    myDiv[divNr].style.display = "none";
  }
}

/* Loop that writes html text which is put into print function.
Set unique number id to each question -> access later with randomQ() function */
for (let i = 0; i < mainArray.length; i++) {
  text += "<pre id='" + (i + 1) + "'>" + (i + 1) + ". " + mainArray[i][0] + "</pre>" + "<button onclick='toggle(" + i + ")'>Show/Hide</button>" + "<div class='myDIV'>" + "<pre>" + mainArray[i][1] + "</pre>" + "</div>" + "<hr>";
}

print(text);



function pushData() {
  let question = document.getElementById("question").value;
  let answer = document.getElementById("answer").value;
  if (question.length < 1 || answer.length < 1) {
    alert("Fill in both boxes!");
  } else {
    const data = { question, answer }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('/dataStorage', options);
    /* mainArray.push([question, answer]); */
    /* alert("Added!"); */
    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
  }
  text = ""; // reset text and write & print the whole thing again
  for (let i = 0; i < mainArray.length; i++) {
    text += "<pre id='" + (i + 1) + "'>" + (i + 1) + ". " + mainArray[i][0] + "</pre>" + "<button onclick='toggle(" + i + ")'>Show/Hide</button>" + "<div class='myDIV'>" + "<pre>" + mainArray[i][1] + "</pre>" + "</div>" + "<hr>";
  }
  print(text);
  nrOfQuestions = mainArray.length; // update mainArray length
}

// function for the randomizer button
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

// function for the randomizer button
function randomQ() {
  let randomizer = document.getElementById("randomizer"); // random question button
  let rndId = getRandomInt(nrOfQuestions); 
  randomizer.setAttribute("href", "#" + rndId)
  document.getElementById(rndId).style.background = "#FF9505"; // change the selected question's background for 0,5 seconds 
  setTimeout(function() { document.getElementById(rndId).style.background = "initial"; }, 500);
}

console.log("hello");


/*
Ideas:
1) delete questions feature. 
- add css to Add button; position better in chrome.
2) ability to add pictures to questions & answers
- don't repeat previous random number
- background illustration to header

- add text what this site is about
- when smaller screen, go to next line instead of overflow
9) better place for sticky buttons (doesn't work with very small screens
12) if I click show answer and I have to scroll to see, auto scroll
13) if I randomize and then press f5, how to refresh page to initial
14) remove left padding from h1 and form

add to github, share
*/