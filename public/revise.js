let text = ""; // eventually put into print function
let nrOfQuestions = 0;

async function getData() {
  const response = await fetch('/dataStorage');
  const data = await response.json();
  text = "";
  /* Loop that writes html text which is put into print function.
  Set unique number id to each question -> access later with randomQ() function */
  for (let i = 0; i < data.length; i++) {
    text += `<pre id='${i + 1}'> ${i + 1}. ${data[i].question}</pre>
    <button onclick='toggle(${i})'>Show/Hide</button>
    <button onclick='deleteQ("${data[i].question}","${data[i].answer}")'>Delete</button>  
    <div class='myDIV'><pre>${data[i].answer}</pre></div><hr>`;
  }
  print(text);
  nrOfQuestions = data.length; // update mainArray length
}

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

function deleteQ(q, a) {
  if (confirm('Are you sure you want to delete this question?')) {
    const data = { "question": q, "answer": a };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/dataDelete', options).then(response => {
      console.log(response);
      getData();
    });
  }
}

function pushData() {
  let question = document.getElementById("question").value;
  let answer = document.getElementById("answer").value;
  if (question.length < 1 || answer.length < 1) {
    alert("Fill in both boxes!");
  } else {
    const data = { question, answer };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch('/dataStorage', options).then(response => {
      console.log(response);
    });
    alert("Added!");
    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
    getData();
  }
}

let rndId;
function getRandomInt(max) {
  // Loop to not repeat previous random number. Probably a better way to do it but it works ;)
  for (let i = 0; i < 100; i++) {
    console.log(rndId);
    let answ = Math.floor(Math.random() * Math.floor(max) + 1);
    if (answ !== rndId) { return answ; } else { i++; }
  }
}

// function for the randomizer button
function randomQ() {
  let randomizer = document.getElementById("randomizer"); // random question button
  rndId = getRandomInt(nrOfQuestions);
  randomizer.setAttribute("href", "#" + rndId)
  document.getElementById(rndId).style.background = "#FF9505"; // change the selected question's background for 0,5 seconds 
  setTimeout(function () { document.getElementById(rndId).style.background = "#E5E5E5"; }, 500);
}

getData();