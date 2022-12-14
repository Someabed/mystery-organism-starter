// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Creates multiple Objects that represent P. aequor
const pAequorFactory = (number, arr) => {
  return {
    specimenNum: number,
    dna: arr,
    // Chooses 1 random base and change it to a new and not the same base
    mutate(){
      let rand = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      while (arr[rand] === newBase){
        newBase = returnRandBase();
      };
      arr[rand] = newBase;
      return this.dna;
    },
    // takes another pAequor object and comapres similar bases and return percentage
    compareDNA(otherPaequor){
      let count = 0;
      for (let i = 0; i < arr.length; i++){
        if(arr[i] === otherPaequor.dna[i]){
          count++;
        }
      }
      //console.log(count);
      let percent = Math.round(count / 15 * 100);
      return percent;
      /* console.log(`specimen #${this.specimenNum} and specimen #${otherPaequor.specimenNum} have ${percent}% DNA in common`); // commented to return percent*/ 
    },
    // Gets percentage of 'C' & 'G' bases in DNA
    willLikelySurvive(){
      let surviveCount = 0;
      for (let i = 0; i < arr.length; i++){
        if(arr[i] === 'C' || arr[i] === 'G'){
          surviveCount++;
        }
      }
      //console.log(surviveCount);
      let survivePercent = Math.round(surviveCount / 15 * 100);
      //console.log(survivePercent);
      if (survivePercent >= 60){
        return true;
      } else {
        return false;
      }
    },
    // Returns complementary DNA strand switching 'A's & 'T's - 'C's & 'G's and viceversa
    complementStrand(){
      compStrand = [];
      this.dna.forEach(element => {
        switch (element){
          case 'A':
            compStrand.push('T');
            break;
          case 'T':
            compStrand.push('A');
            break;
          case 'C':
            compStrand.push('G');;
            break;
          case 'G':
            compStrand.push('C');;
            break;
        }
      });
      return compStrand;
    }
  };
}

let pAequorSurviveArray = [] // Array to take 30 numbered specimens created randomly but must be likely to survive
for (let i = 1; i < 31; i++){
  let newElement = pAequorFactory(i, mockUpStrand());
  while (!newElement.willLikelySurvive()){
    newElement = pAequorFactory(i, mockUpStrand());
  }
  pAequorSurviveArray.push(newElement);
}

// Display the 30 specimen DNA that are likely to survive, and the complemantary strand
for (let i = 0; i < 30; i++){
  console.log(`Specimen Number ${pAequorSurviveArray[i].specimenNum}`);
  console.log(`Chance of Survival: ${pAequorSurviveArray[i].willLikelySurvive()}`);
  console.log(`Original Strand is      : ${pAequorSurviveArray[i].dna}`);
  console.log(`Complementary Strand is : ${pAequorSurviveArray[i].complementStrand()}`);
}

// To find the 2 most related instances
let compare = 0;
let s1 = 0;
let s2 = 0;
for (let i = 0; i < 30; i++){
  for (let j = 1; j < 30; j++){
    if (i === j){
      continue;
    }
    if (pAequorSurviveArray[i].compareDNA(pAequorSurviveArray[j]) > compare){
      compare = pAequorSurviveArray[i].compareDNA(pAequorSurviveArray[j]);
      s1 = i+1;
      s2 = j+1;
    }
  }  
}

console.log(`The two most related instances of pAequor are Specimen number ${s1} & number ${s2}`);
