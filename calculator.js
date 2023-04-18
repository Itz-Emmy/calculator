"use strict";
//To get the history value
function buffer() {
  return document.getElementById("buffer").innerText;
}
//To show the history value
function printBuffer(num) {
  document.getElementById("buffer").innerText = num;
}
//To get the output value of the calculator
function getScreen() {
  return document.getElementById("calc-display").value;
}
//To print the output value of the calculator
function calculatorScreen(num) {
  if (num == "" || (typeof num === 'string' && num[num.length - 1] === '.')) {
    document.getElementById("calc-display").value = num;
  } else {
    document.getElementById("calc-display").value = formattedNum(num);
  }
}
//Automatically format the output value in thousands, tens of thousands, etc using commas
function formattedNum(num) {
  if (num == "-") {
    //if the input is a -ve sign
    return "";
  }
  var x = Number(num);
  var value = x.toLocaleString("en");
  return value;
}

//Reverse formatted number in thousands, tens of thousands, etc upon delete
function reverseNumberFormat(num) {
  return Number(num.replace(/,/g, ""));
}


var operator = document.getElementsByClassName("operator"); //selects all operator buttons
for (var i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    //"this" refers to the operator to be checked
    //check if ID is power and clears both the current display and buffer
    if (this.id == "power") {
      printBuffer("");
      calculatorScreen("0");
      // document.getElementById("buffer").style.display = "none"; //hides the buffer display
    }
    //delete button
    else if (this.id == "clear") {
      var output = reverseNumberFormat(getScreen()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1); //reverses the formatted number upon delete
        calculatorScreen(output);
      }
    } else {
      // document.getElementById("buffer").style.display = "block"; //reveals the buffer display
      var output = getScreen();
      var calcBuffer = buffer();

      if (output == "" && calcBuffer != "") {
        //to change the value of the last operator in the buffer before evaluation
        if (isNaN(calcBuffer[calcBuffer.length - 1])) {
          //if the last xter in the buffer is an operator
          calcBuffer = calcBuffer.substr(0, calcBuffer.length - 1); //removes the last xter... refer to line 68
        }
      }
      //line 68 below
      if (output != "" || calcBuffer != "") {
        //if condition is true, first value is assigned to output else second value is assigned to the output
        output = output == "" ? output : reverseNumberFormat(output); //set output to an empty value if history is not empty & output is empty and Convert to a number format if output has a value
        calcBuffer = calcBuffer + output; //add output value to buffer
        if (this.id == "=") {
          var result = eval(calcBuffer); //evaluate  buffer is equal sign is clicked
          calculatorScreen(result); //print result to output
          printBuffer(""); //empty the buffer display
          // document.getElementById("buffer").style.display = "none";
        } else if (this.id == 'plus-minus') { //plus or minus operator
          var output = document.getElementById('calc-display').value;
          output *= -1;
          calculatorScreen(output);
        }
        else if (this.id == '%') { //percentage operator
          // var decimal = document.getElementById('decimal').innerText;
          var output = document.getElementById('calc-display').value;
          output /= 100;
          calculatorScreen(output);
        } else if (this.id == 'decimal') { //decimal operator

          var output = document.getElementById('calc-display').value;
          output += this.value;
          calculatorScreen(output);
        }

        else {
          calcBuffer = calcBuffer + this.value; //adds the operator value to the history
          printBuffer(calcBuffer); //displays the history
          calculatorScreen("0");
        }
      }
    }
  });
}
var numberInput = document.getElementsByClassName("number"); //selects all number buttons
for (var i = 0; i < numberInput.length; i++) {
  numberInput[i].addEventListener("click", function () {
    var output;
    var screen = getScreen();
    // if the button clicked is the decimal point and there has not been a decimal point
    // in the number before (only one decimal point allowed in a number)
    // concatenate the decimal point to the screen value
    if (this.value === '.' && !screen.includes('.')) {
      output = screen + this.value;
    } else {
      // if otherwise, check if the last
      output = screen[screen.length - 1] === '.' ? screen : reverseNumberFormat(screen);
      //check if output is a number
      if (output != NaN && this.value !== '.') {
        output = output + this.value; //concatenates number clicked to the current output
      }
    }
    calculatorScreen(output); //outputs the above line to the display
  });
}