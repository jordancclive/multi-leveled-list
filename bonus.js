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

// ALPHABETICALLY SORTS GENERATION-ENUMERATED ARRAY

const alphaSort = (str)=>{
  let arr = genEnumArr(str);
  let gen1 = {
    parent: '',
    siblings: []
  }
  let gen2 = {
    parent: '',
    siblings: []
  }
  // IDENTIFIES PARENT OF EACH GENERATION (FUNCTION FOUND BELOW)
  let gen1Parent = parentIdentifier(arr, gen1, 1);
  let gen2Parent = parentIdentifier(arr, gen2, 2);

  // SEPARATES GENERATIONS 0, 1, AND 2 AND REMOVES ENUMERATION (FUNCTION FOUND BELOW)
  let genSep = genSeparator(arr, gen1, gen2);
  let newArr = genSep[0];
  gen1 = genSep[1];
  gen2 = genSep[2];

  // SORTS GENERATIONS 0, 1, AND 2
  newArr.sort();
  gen1.siblings.sort();
  gen2.siblings.sort();

  // ADDS GENERATION ARRAYS TO newArr AND ADDS ENUMERATION (FUNCTION FOUND BELOW)
  const gen1ParentNum = newArr.indexOf(gen1Parent)
  newArr = addGeneration(newArr, gen1ParentNum, gen1, 1);

  const gen2ParentNum = newArr.indexOf(gen2Parent)
  newArr = addGeneration(newArr, gen2ParentNum, gen2, 2);

  return newArr;
}

const parentIdentifier = (arr, gen, num)=>{
  for (var i=0; i<arr.length; i++){
    if (arr[i-1]===num){
      return gen.parent = arr[i-2];
    }
  }
  return gen.parent;
}

const genSeparator = (arr, gen1, gen2)=>{
  let newArr = [];
  for (var i=0; i<arr.length; i++){
    if (typeof arr[i]==='number'){
      continue;
    }
    if (arr[i-1]===0){
      newArr.push(arr[i]);
    }
    if (arr[i-1]===1){
      gen1.siblings.push(arr[i])
    }
    if (arr[i-1]===2){
      gen2.siblings.push(arr[i])
    }
  }
  return [newArr, gen1, gen2];
}

const addGeneration= (arr, genparent, gen, num)=>{
  for (var i=gen.siblings.length-1; i>=0; i--){
    arr.splice(genparent+1, 0, num, gen.siblings[i]);
  }
  return arr;
}

// GENERATES OUTPUT STRING

function outputStr(str){
  let arr = alphaSort(str);
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

/*
WHAT ABOUT FOR A STRING INCLUDING MORE SUBLISTS, DEEPER SUBLISTS, ETC?

IMPROVING THIS SOLUTION:
1. FAMILY TREE COUNTER
2. VARIABLE ARGUMENT parentIdentifier
3. VARIABLE ARGUMENT genSeparator
4. VARIABLE ARGUMENT siblingsSorter
5. VARIABLE ARGUMENT addGeneration
*/
