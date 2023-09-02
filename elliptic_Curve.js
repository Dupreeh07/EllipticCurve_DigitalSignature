import {createCharts} from './components/charts.js'
import {findAPoint, findSubgroupOrder, findDivisors} from './components/encryptProcesses.js'

let aCoeff = document.getElementById("a");
let bCoeff = document.getElementById("b");
let P = document.getElementById("p");

let Ax = document.getElementById("Ax");
let Ay = document.getElementById("Ay");
let multiplier = document.getElementById("n");
let kA = document.getElementById("kA");



aCoeff.addEventListener('change', (event) => {  
  createCharts(
    parseInt(event.target.value), 
    parseInt(bCoeff.value), 
    parseInt(P.value)
  );
});


bCoeff.addEventListener('change', (event) => {  
  createCharts(parseInt(aCoeff.value), 
    parseInt(event.target.value), 
    parseInt(P)
  );
});


P.addEventListener('change', (event) => {  
    createCharts(parseInt(aCoeff.value), 
    parseInt(bCoeff.value), 
    parseInt(event.target.value)
  );
  //console.log(typeof parseInt(event.target.value))
  let primeNumber = document.getElementById("choosePrime");
  let divisors = findDivisors(event.target.value);
  divisors.length > 2 ? 
  primeNumber.innerText = "Not a prime number": primeNumber.innerText = ""
});

Ax.addEventListener('change', () => { 
    let res = findAPoint(parseInt(aCoeff.value), 
    parseInt(bCoeff.value), parseInt(P.value),  
    parseInt(multiplier)
  );
  kA.innerText=`(${res[0]},${res[1]})`
  let N = document.getElementById("N");
  let SubgroupOrder = document.getElementById("SubgroupOrder");
  let sGOrder = findSubgroupOrder(
    parseInt(aCoeff.value), 
    parseInt(bCoeff.value),
    parseInt(P.value), 
    parseInt(N.value)
    );
  SubgroupOrder.innerText = sGOrder;

});

Ay.addEventListener('change', () => { 
    let res = findAPoint(parseInt(aCoeff.value), 
    parseInt(bCoeff.value), parseInt(P.value), 
    parseInt(multiplier)
  );
  kA.innerText=`(${res[0]},${res[1]})`;
  let N = document.getElementById("N");
  let SubgroupOrder = document.getElementById("SubgroupOrder");
  let sGOrder = findSubgroupOrder(
    parseInt(aCoeff.value),
    parseInt(bCoeff.value), 
    parseInt(P.value), 
    parseInt(N.value)
  );
  SubgroupOrder.innerText = sGOrder;
});

multiplier.addEventListener('change', () => {
  let res = findAPoint(
    parseInt(aCoeff.value), 
    parseInt(bCoeff.value), parseInt(P.value), 
    parseInt(multiplier)
);
  kA.innerText=`(${res[0]},${res[1]})`;
});

createCharts(parseInt(aCoeff.value), parseInt(bCoeff.value), parseInt(P.value));

