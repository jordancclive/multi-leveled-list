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
  let generation = 0;
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

  // SEPARATES GENERATIONS 0, 1, AND 2 AND REMOVES ENUMERATION (FUNCTION FOUND BELOW)
  let genSep = genSeparator(arr);
  let gen1 = genSep[0];
  let gen2 = genSep[1];
  let gen3 = genSep[2];

  // SORTS GENERATIONS 0, 1, AND 2
  gen1.sort();
  gen2.sort();
  gen3.sort();

  // IDENTIFIES PARENT OF EACH GENERATION (FUNCTION FOUND BELOW)
  let gen2Parent = parentIdentifier(arr, gen2, 2);
  let gen3Parent = parentIdentifier(arr, gen3, 3);

  // ADDS GENERATION ARRAYS TO gen1 AND ADDS ENUMERATION (FUNCTION FOUND BELOW)
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

const genSeparator = (arr)=>{
  let gen1 = [];
  let gen2 = [];
  let gen3 = [];
  // takes different generations from a three-generation array and produces three different generation-specific arrays
  for (var i=0; i<arr.length; i++){
    if (typeof arr[i]==='number'){
      continue;
    }
    if (arr[i-1]===1){
      gen1.push(arr[i]);
    }
    if (arr[i-1]===2){
      gen2.push(arr[i])
    }
    if (arr[i-1]===3){
      gen3.push(arr[i])
    }
  }
  return [gen1, gen2, gen3];
}

const addGeneration= (arr, genparent, gen, num)=>{
  // inserts younger generations where they correspond to the correct sibling in older generations
  for (var i=gen.length-1; i>=0; i--){
    arr.splice(genparent+1, 0, num, gen[i]);
  }
  return arr;
}

// GENERATES OUTPUT STRING

function outputStr(str){
  let arr = alphaSort(str);
  let newStr = '';
  // produces a string in the desired output format by putting as many dashes as the generation of a word in front of it and a line break after each word
  for (var i=0; i<arr.length; i++){
    if (typeof arr[i]==='string'){
      newStr+=arr[i]+'\n';
    }
    if (typeof arr[i]==='number'){
      newStr+='-'.repeat(arr[i]-1)+' ';
    }
  }
  return newStr;
}

console.log(outputStr('(id,created,employee(id,firstname,employeeType(id), lastname),location)'));

/*
IMPROVING THIS SOLUTION:
- Consider using a stack data structure instead of generation-enumerated arrays
- Figure out how to create a recursive function for the bonus solution
- Start out projects like this with listed assumptions in beginning comments (so that the evaluator can make sure that if I have misunderstandings, I'm going about them intelligently)
- Add more comments throughout each function
- Use foreach and map instead of several of the for loops?

WHAT ABOUT FOR A STRING INCLUDING MORE SUBLISTS, DEEPER SUBLISTS, ETC?
*/
