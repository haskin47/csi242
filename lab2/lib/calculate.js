const deliminters = new RegExp(/([*|/|+|\-|^|)|(])/);
const numbers = new RegExp(/([0-9])/);
const invalidToken = new RegExp(/([a-zA-Z]+)/);
const brackets = [new RegExp(/[(]/), new RegExp(/[)]/)];
const isString = new RegExp(/"/);

function calculate(newExpression){
  var newTokens = infixToPostFixed(newExpression); //converts expression from infix to postfixed
  var newTokenTree = parseTokens(newTokens);
  return newTokenTree;
}
function parseTokens(expressionArray){
  var stack = new Stack;
  for(let i = 0; i < expressionArray.length; i++){
    let token = expressionArray[i];
    var newNode = new Node(token);
    // console.log(newNode);
    if(newNode.type === "num"){
      stack.push(newNode);
    }else if(newNode.type === "operator"){
        newNode.rightNode = stack.pop();
        newNode.leftNode = stack.pop();
        stack.push(newNode);
    }
  }
  return newNode;
}
function recombineNegatives(array){
  var newArray = new Array();
  for(var index = 0; index < array.length; index++){
    if(array[index] === "-" && (deliminters.test(array[index - 1]) || index === 0) && !brackets[1].test(array[index-1])){
      newArray.push("-1");
      newArray.push("*");
    }else{
      newArray.push(array[index]);
    } 
  }
  return newArray;
}
function getPrecedence(value){
        switch(value){ //PEMDAS
            case "log": return 5;
            case "^": return 4;
            case "/": return 3;
            case "*": return 3;
            case "+": return 2;
            case "-": return 2;
            case "(": return 0;
        } 
}
class Stack {
  array;
  range; //position size 
  constructor(){
    this.array = new Array();
    this.range = -1;
  }
  push(data){
    this.range++;
    this.array[this.range] = data;
  }
  pop(){
    var data = this.array[this.range];
    this.range--;
    return data;
  }
  peek(){
    return this.array[this.range];
  }
}

class Node {
    leftNode;
    rightNode;
    value;
    type;
    constructor(value){ //pass in 3
        this.value = value; //value of this node = 3
        if(this.value === "pi"){
          this.type = "num"; 
        }
        if(this.value === "e"){
          this.type = "num";
        }
        if(numbers.test(this.value)){
            this.value = Number(this.value);
            this.type = "num";
        }else 
        if(deliminters.test(this.value)) {
            this.type = "operator";
            if(brackets[0].test(this.value)){
                this.type = "openBraces";
            }
            if(brackets[1].test(this.value)){
                this.type = "closingBraces";
            }
        }
        if(this.value === "log"){
          this.type = "operator";
        }
    }
    eval(){
        if(this.type === "num"){
          if(this.value === "pi"){
            return 22/7;
          }
          if(this.value === "e"){
            return 2.7182818284;
          }
          return this.value;
        }else if(this.type === "operator"){
                switch(this.value){
                case "^": return Math.pow(this.leftNode.eval(), this.rightNode.eval());
                case "*": return this.leftNode.eval() * this.rightNode.eval();
                case "/": return this.leftNode.eval() / this.rightNode.eval();
                case "+": return this.leftNode.eval() + this.rightNode.eval();
                case "-": return this.leftNode.eval() - this.rightNode.eval();
                case "log": return Math.log10(this.rightNode.eval());
            } 
        }
    }
}
function infixToPostFixed(expression){
  expression = expression.split(deliminters); 
  expression = removeEmptyIndices(expression);
  expression = recombineNegatives(expression);
  expression = removeEmptyIndices(expression);
  expression = trimStringInArray(expression);
  var postFixed = new Array();
  var operationStack = new Stack();
  for(var index = 0; index < expression.length; index++){
    var token = expression[index];
    if(numbers.test(token) || token === "pi"|| token === "e"){ //if number
      postFixed.push(token)
    }else if(brackets[0].test(token)){ //if open brackets
      operationStack.push(token);
    }
    else if(brackets[1].test(token)){ //if closing brackers
      while(operationStack.peek() !== "("){
        postFixed.push(operationStack.pop());
      }
      operationStack.pop();
    }
    else{
      // console.log(eval(getPrecedence(operationStack.peek()) >= getPrecedence(token)));
      while(getPrecedence(operationStack.peek()) >= getPrecedence(token)){
        postFixed.push(operationStack.pop());
      }
      operationStack.push(token);
    }
  }
  while(typeof(operationStack.peek()) !== "undefined"){
    postFixed.push(operationStack.pop());
  }
  // console.log(postFixed);
return postFixed;
}
function removeEmptyIndices(array) {
  //clean array if nothing is detected on indexes
  var newArray = new Array();
  for (index = 0; index < array.length; index++) {
    if (!(array[index].trim().length === 0)) {
      newArray.push(array[index]);
    }
  }
  return newArray;
}
function trimStringInArray(array) {
  for (index = 0; index < array.length; index++) {
    array[index] = array[index].trim();
  }
  return array;
}