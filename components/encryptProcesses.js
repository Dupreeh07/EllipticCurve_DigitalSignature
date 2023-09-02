
import {calcDoubleAddAlg, divModule, getModule} from './modularArithmetic.js'

let generateBtn = document.getElementById("generatePrvKey");
let createSignatureBtn = document.getElementById("createSignature");

const findAPoint = (a, b, p) => {
    let AxOutput = document.getElementById("Ax");
    let AyOutput = document.getElementById("Ay");
    
    let AyValue = parseInt(AyOutput.value);
    let AxValue = parseInt(AxOutput.value);


    let multiplier = document.getElementById("n");
    let multiplierValue = parseInt(multiplier.value);

    let onCurveChecher = document.getElementById("onCurveChecker");

    if (AyValue**2 % p !== (AxValue**3 + a * AxValue + b) % p){
        onCurveChecher.innerText = "Not on curve"
    }else{
        onCurveChecher.innerText = ""
        let res = calcDoubleAddAlg(AxValue, AyValue, p, a, multiplierValue);
        return res;
    }
}

const findDivisors = (groupOrder) => {
    let numberDivisors = [];
    for(let i = 1; i <= Math.floor(Math.sqrt(groupOrder)); i++) {
      if(groupOrder % i === 0) {
        numberDivisors.push(i);
        if(groupOrder/i !== i) {
          numberDivisors.push(groupOrder/i);
        }
      }
    }
    
    numberDivisors.sort((a, b) => { return a - b; });
    return numberDivisors;
} 
/**
 * The subgroup order is always a divisor of the group order.
 * so we need to find all group order divisors 
 * and each divisors multiply by current point.
 * if we get Point (0,0) we found Subgroup order
 * (the group order is a prime number 
 * so the subgroup order will be equal to the group order
 * prime number divisors = [1, prime number])
 */

const findSubgroupOrder = (a, b, p, groupOrder) => {
    let AxOutput = document.getElementById("Ax");
    let AyOutput = document.getElementById("Ay");
    
    let AyValue = parseInt(AyOutput.value);
    let AxValue = parseInt(AxOutput.value);

    let onCurveChecher = document.getElementById("onCurveChecker");
    let groupOrderDivs = findDivisors(groupOrder);
    console.log(groupOrderDivs);
    for(let i = 0; i < groupOrderDivs.length; i++){
        if (AyValue**2 % p !== (AxValue**3 + a * AxValue + b) % p){
            onCurveChecher.innerText = "Not on curve"
        }else{
            let res = calcDoubleAddAlg(AxValue, AyValue, p, a, groupOrderDivs[i]);
         if(res[0] == 0 && res[1] == 0){
            return groupOrderDivs[i];
            }
        }
    }
}

function getRandomNumber() {
    let SubgroupOrder = document.getElementById("SubgroupOrder");
    return Math.floor(Math.random() * (parseInt(SubgroupOrder.value) - 1));
}

generateBtn.addEventListener('click', () => {
  
    let AxOutput = document.getElementById("Ax");
    let AyOutput = document.getElementById("Ay");
    let P = document.getElementById("p");
    let aCoeff = document.getElementById("a");

    let SubgroupOrder = document.getElementById("SubgroupOrder");
    let prvKey = document.getElementById("PrvKey"); 
    let pblKey = document.getElementById("PblKey");

    let multiplier = getRandomNumber();
    
    prvKey.innerText = multiplier;

    let pblKeyValue = calcDoubleAddAlg( 
        parseInt(AxOutput.value), 
        parseInt(AyOutput.value),  
        parseInt(P.value),  //or P
        parseInt(aCoeff.value), 
        multiplier
    );
    
    pblKey.innerText = `${pblKeyValue[0]}, ${pblKeyValue[1]}`
});

const createSignature = async () => {
   
    let msg = document.getElementById("Msg");
    let prvKey = document.getElementById("PrvKey");

    if(msg.value !== "" /*&& prvKey == ""*/){ 
        let randNumK = document.getElementById("K");
        randNumK.value = getRandomNumber();
        //console.log(randNumK.value);

        let AxOutput = document.getElementById("Ax");
        let AyOutput = document.getElementById("Ay");

        let SubgroupOrder = document.getElementById("SubgroupOrder");
        let P = document.getElementById("p");
        let aCoeff = document.getElementById("a");
        
        let RPoint = calcDoubleAddAlg(  //// R = GP * k
            parseInt(AxOutput.value), 
            parseInt(AyOutput.value),  
            parseInt(P.value),  
            parseInt(aCoeff.value), 
            parseInt(randNumK.value)
        );
        
        console.log("Rpoint", RPoint);
        let r = RPoint[0] %  parseInt(SubgroupOrder.value);//r = Rx mod n, 0 < r < n 
        if (r == 0){
            return await createSignature();
        }else{
        let s1 = getModule((parseInt(msg.value) + r * parseInt(prvKey.value)), parseInt(SubgroupOrder.value));
        let s2 = getModule(divModule(parseInt(randNumK.value), 1,
            parseInt(SubgroupOrder.value)), 
            parseInt(SubgroupOrder.value)
        );
        let s = getModule((s1 * s2),  parseInt(SubgroupOrder.value)); //s = (msg + r * prbKey) * k^(-1) mod n

        console.log("S1, S2", s1,s2);
        return [r,s];
        }
    }else{
        let warning = document.getElementById("Warning");
        warning.innerText = "Empty fields";
    }
    
}



createSignatureBtn.addEventListener('click', async () => {
 
    let signature = await createSignature();
    let r = document.getElementById("r");

    let s = document.getElementById("s");
    r.innerText = signature[0];
    s.innerText = signature[1];

});



export {findAPoint, findSubgroupOrder, findDivisors, createSignature}