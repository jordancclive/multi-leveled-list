// CREATES ITERABLE ARRAY FROM INPUT STRING

const neatArray = (str)=>{
  str = str.replace(/\(/gi, ",(,").replace(/\)/gi, ",)");
  let separators = [' ', '\\,'];
  let regExpSeparators = new RegExp(separators.join('|'));
  let arr = str.split(regExpSeparators);
  arr = arr.filter(function(cell){return cell!==''});
  return arr;
}

// CREATES A GENERATION-ENUMERATED ARRAY

const genEnumArr = (str)=>{
  let arr = neatArray(str);
  let newArr = [];
  let generation = -1;
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
  let arr = genEnumArr(str);
  let newStr = '';
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

console.log(outputStr('(id,created,employee(id,firstname,employeeType(id), lastname),location)'));
