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

// ALPHABETICALLY SORTS GENERATION-ENUMERATED ARRAY

const alphaSort = (str)=>{
  let arr = genEnumArr(str);

  // IDENTIFIES PARENT OF EACH GENERATION (FUNCTION FOUND BELOW)
  let gen2Parent = parentIdentifier(arr, gen1, 1);
  let gen3Parent = parentIdentifier(arr, gen2, 2);

  // SEPARATES GENERATIONS 0, 1, AND 2 AND REMOVES ENUMERATION (FUNCTION FOUND BELOW)
  let gen2, gen3;
  let genSep = genSeparator(arr, gen2, gen3);
  let gen1 = genSep[0];
  let gen2 = genSep[1];
  let gen3 = genSep[2];

  // SORTS GENERATIONS 0, 1, AND 2
  gen1.sort();
  gen2.sort();
  gen3.sort();

  // ADDS GENERATION ARRAYS TO newArr AND ADDS ENUMERATION (FUNCTION FOUND BELOW)
  const gen2ParentNum = gen1.indexOf(gen2Parent)
  gen1 = addGeneration(gen1, gen2ParentNum, gen2, 2);

  const gen3ParentNum = gen1.indexOf(gen3Parent)
  gen1 = addGeneration(gen1, gen3ParentNum, gen3, 3);

  return gen1;
}

const parentIdentifier = (arr, gen, num)=>{
  // once the generation number increases, the word directly previous to the increased number is designated parent of the new generation
  for (var i=0; i<arr.length; i++){
    if (arr[i-1]===num){
      return gen.parent = arr[i-2];
    }
  }
  return gen.parent;
}

const genSeparator = (arr, gen2, gen3)=>{
  let gen1 = [];
  for (var i=0; i<arr.length; i++){
    if (typeof arr[i]==='number'){
      continue;
    }
    if (arr[i-1]===0){
      gen1.push(arr[i]);
    }
    if (arr[i-1]===1){
      gen2.siblings.push(arr[i])
    }
    if (arr[i-1]===2){
      gen3.siblings.push(arr[i])
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
