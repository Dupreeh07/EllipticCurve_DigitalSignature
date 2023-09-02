import {calcDoubleAddAlg, divModule, add2IdenPoints, add2DiffPoints, getModule} from './modularArithmetic.js'


let signVerfBtn = document.getElementById("signVerf");

const signVerf = () => {

    let msg = document.getElementById("Msg");

    let r = document.getElementById("r");
    let s = document.getElementById("s");

    let AxOutput = document.getElementById("Ax");
    let AyOutput = document.getElementById("Ay");
    let pblKey = document.getElementById("PblKey");

    const pblKeyCoord = pblKey.value.split(",");
    let err = document.getElementById("Err");

    let SubgroupOrder = document.getElementById("SubgroupOrder");
    let P = document.getElementById("p");
    let aCoeff = document.getElementById("a");
    console.log(s.value == "", msg.value == "", r.value == "")
    //if (s.value !== "" || msg.value !== "" || r.value !== ""){

    let inverseSVal = divModule(parseInt(s.value), 1, parseInt(SubgroupOrder.value));
    console.log("inverseSVal",inverseSVal);
    let V = getModule((inverseSVal * (parseInt(r.value))), parseInt(SubgroupOrder.value));

    let U =  getModule((inverseSVal * (parseInt(msg.value))), parseInt(SubgroupOrder.value));

    console.log("V", V, "U", U);
    

    let C1 = calcDoubleAddAlg( 
        parseInt(pblKeyCoord[0]), 
        parseInt(pblKeyCoord[1]),  
        parseInt(P.value),  
        parseInt(aCoeff.value), 
        V
    ); 

    let C2 = calcDoubleAddAlg( 
        parseInt(AxOutput.value), 
        parseInt(AyOutput.value),  //pblKey.value
        parseInt(P.value),  
        parseInt(aCoeff.value), 
        U
    );
    
    err.innerText = "";
    
    
    if(C1[0] == C2[0] && C1[1] == C2[1]){
        let C = add2IdenPoints(
            C1[0], C1[1],  
            parseInt(aCoeff.value), 
            parseInt(P.value)
        );
        console.log("C", C);
        return C;
    }else{
        let C = add2DiffPoints(
            C1[0], C1[1], C2[0], C2[1], parseInt(P.value)
        );
        console.log("C", C);
        return C;
    }
    // }else {
    //     err.innerText = "fill in all the fields";
    // }    
}

const CompareVals = (Ccoord) => {
    let r = document.getElementById("r");
    let compare = document.getElementById("Compare");
    let SubgroupOrder = document.getElementById("SubgroupOrder"); 
    
    
    if(parseInt(r.value) == Ccoord[0] % parseInt(SubgroupOrder.value)){
        compare.innerText = `Verification confirmed, ${r.value} = ${Ccoord[0]} mod ${SubgroupOrder.value}`
    }else{
        compare.innerText = `Verification rejected, ${r.value } != ${ Ccoord[0]} mod ${SubgroupOrder.value}`
    }
}

signVerfBtn.addEventListener('click',  () => {
    let C = document.getElementById("C");
    let Ccoord = signVerf();
    C.innerText = `${Ccoord[0]}, ${Ccoord[1]}`
    CompareVals(Ccoord);
});