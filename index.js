let historyValue = document.getElementById("history-value");
let outputValue = document.getElementById("output-value");

// history value
function gethistoryValue() {
  return historyValue.innerText;
}
function printhistoryValue(num) {
  historyValue.innerText = num;
}

// output value
function getoutputValue() {
  return outputValue.innerText;
}
function printoutputValue(num) {
  if (num == "") {
    // if string is empty
    outputValue.innerText = num;
  } else {
    outputValue.innerText = getFormatedNumber(num);
  }
}

// return string seprated with comma
function getFormatedNumber(num) {
  if (num == "-") {
    return "";
  }
  let n = Number(num);
  let value = n.toLocaleString();
  return value;
}

//  function to remove comma (to show result without comma...)
function reverseNumberFormat(num) {
  return Number(num.replace(",", ""));
}

//checking arraow function this keyword
// this.id = 1;
// console.log(window.id);
let operator = document.getElementsByClassName("operator");
for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener("click", function () {
    if (this.id == "clear") {
      // clear both history and output
      printoutputValue("");
      printhistoryValue("");
    } else if (this.id == "backspace") {
      let output = reverseNumberFormat(getoutputValue()).toString();
      if (output) {
        //if output has value
        output = output.slice(0, output.length - 1);
        printoutputValue(output);
      }
    } else {
      //operators in the calculator does not work if output is empty
      let output = getoutputValue();
      let history = gethistoryValue();
      if (output == "" && history != "") {
        // checking last digi is a number or not (reason : if we want to replace the last operator then)
        if (isNaN(history[history.length - 1])) {
          // removing the last character using substring function
          history = history.slice(0, history.length - 1);
        }
      }
      if (output != "" || history != "") {
        // check if the output is not empty

        // if history is not empty wheras the output is empty
        // it will converted to a number format if the output has a value and we do that by using the conditional operator
        // condition?true:false
        output = output == "" ? output : reverseNumberFormat(output);
        // when a operator is clicked the output value is first added to the history
        history += output;
        if (this.id == "=") {
          // if user clicks on the equal sign their history is evaluated and pass to the printoutputValue and history is set to empty
          let result = eval(history);
          printoutputValue(result);
          printhistoryValue("");
        } else {
          // for other operators the operator gets added to the history and the output is set to empty
          history += this.id;
          printhistoryValue(history);
          printoutputValue("");
        }
      }
    }
  });
}

// number that user clicks just gets concatenated
let number = document.getElementsByClassName("number");
for (let i = 0; i < number.length; i++) {
  number[i].addEventListener("click", function () {
    // first get output with commas removed
    let output = reverseNumberFormat(getoutputValue());
    // console.log(output);
    if (output != NaN) {
      //if output is a number
      output += this.id; //concatenate the id to the output and pass to printoutputValue, here this is number[i] object
      printoutputValue(output);
    }
  });
}
