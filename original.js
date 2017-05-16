// CREATES ITERABLE ARRAY FROM INPUT STRING

const neatArray = (str)=>{
  // separates parenthesis with commas
  str = str.replace(/\(/gi, ",(,").replace(/\)/gi, ",)");
  // establishes spaces and commas as separators
  let separators = [' ', '\\,'];
  // establishes a variable meaning 'space or comma'
  let regExpSeparators = new RegExp(separators.join('|'));
  // creates an array out of the string with the content between spaces or commas
  let arr = str.split(regExpSeparators);
  // filters out empty cells
  arr = arr.filter(function(cell){return cell!==''});
  return arr;
}

// CREATES A GENERATION-ENUMERATED ARRAY

const genEnumArr = (str)=>{
  // takes a string formatted like the provided example and makes a workable, neat array out of it
  let arr = neatArray(str);
  let newArr = [];
  let generation = -1;
  // replaces all parenthesis with generation numbers and adds generation numbers before every work not surrounded with parentheses
  for (var i=0; i<arr.length; i++){
    if (arr[i]==='('){
      generation++;
    } else if (arr[i]===')'){
      generation--;
    } else {
      newArr.push(generation);
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

// GENERATES OUTPUT STRING

function outputStr(str){
  // takes a string formatted like the provided example and outputs an array with generation numbers preceding all cells with words
  let arr = genEnumArr(str);
  let newStr = '';
  // produces a string in the desired output format by putting as many dashes as the generation of a word in front of it and a line break after each word
  for (var i=0; i<arr.length; i++){
    if (typeof arr[i]==='string'){
      newStr+=arr[i]+'\n';
    }
    if (typeof arr[i]==='number'){
      if (arr[i]===0){
        continue;
      } else {
        newStr+='-'.repeat(arr[i])+' ';
      }
    }
  }
  return newStr;
}

// console.log(outputStr('(id,created,employee(id,firstname,employeeType(id), lastname),location)'));
