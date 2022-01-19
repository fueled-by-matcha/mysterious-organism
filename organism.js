// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

function pAequorFactory(number, dnaArray){
  const pAequor = {
    specimenNum: number,
    dna: dnaArray,
    mutate(){
      const base = Math.floor(Math.random() * 15);
      const random = Math.floor(Math.random() * 3);
      let bases = [];
      switch(this.dna[base]){
        case 'A':
          bases = ['T', 'C', 'G'];
          this.dna[base] = bases[random];
          break;
        case 'T':
          bases = ['A', 'C', 'G'];
          this.dna[base] = bases[random];
          break;
        case 'C':
          bases = ['A', 'T', 'G'];
          this.dna[base] = bases[random];
          break;
        default:
          bases = ['A', 'T', 'C'];
          this.dna[base] = bases[random];
          break;
      }
      return this.dna;
    },
    compareDNA(obj){
      const strandLength = this.dna.length;
      let count = 0;
      for(let i = 0; i < strandLength; i++){
        if(this.dna[i] === obj.dna[i]){
          count++;
        }
      }
      const percentSimilar = (count / strandLength) * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${obj.specimenNum} have ${Math.floor(percentSimilar)}% DNA in common`);
    },
    willLikelySurvive(){
      let count = 0;
      for(let i = 0; i < this.dna.length; i++){
        if(this.dna[i] === 'C' || this.dna[i] === 'G'){
          count++;
        }
      }
      if(count / this.dna.length >= 0.6){
        return true;
      }
      else{
        return false;
      }
    }
  };
  return pAequor;
}
//test
let dnaTest = pAequorFactory(1, mockUpStrand());
//console.log(dnaTest);
console.log(dnaTest.mutate());
let dnaCompare = pAequorFactory(2, mockUpStrand());
dnaTest.compareDNA(dnaCompare);
console.log(dnaTest.willLikelySurvive());
let survivable = [];
let num = 1;
let attempts = 1;
while(survivable.length <= 30){
  let dna = pAequorFactory(num, mockUpStrand());
  if(dna.willLikelySurvive()){
    survivable.push(dna);
  }
  num++;
  attempts++;
}
console.log(`30 organisms found.  It took ${attempts} attempts.`);
