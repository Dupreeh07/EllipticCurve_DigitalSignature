import {findSubgroupOrder} from './encryptProcesses.js'


const createCharts = (a, b, p) => {
  // const existingElCurve = Chart.getChart("curve-chart");
  // if (existingElCurve) {
  //   existingElCurve.destroy();
  // }

  // let xValuesElCurve = [];
  // let yValuesElCurve = [];
  // let negYValuesElCurve = [];
  // let itterarion = p/100
  // for(let x = 0; x <= p; x+= itterarion){
  //   for(let y = 0; y <= p; y += itterarion){
  //     if (y  == x**3 + a * x + b ){
  //       if (!isNaN(y) ) {
  //         xValuesElCurve.push(x);    //expression has 2 polynomials
  //         yValuesElCurve.push(y);    //positive y values
  //         negYValuesElCurve.push(-y);//negative y values
  //       }
  //     }   
  //   }
  // }

  // const ellipCurve = document.getElementById("curve-chart");
  // const ctxElCurve = ellipCurve.getContext("2d");
  // new Chart(ctxElCurve, {
  //   type: 'line',
  //   data: {
  //     labels: xValuesElCurve,
  //     datasets: [          {
  //       data: negYValuesElCurve,
  //       backgroundColor: 'rgba(0, 0, 0, 0)',
  //       borderColor: 'blue',
  //       label: '',
  //       borderWidth: 5
  //       },
  //       {
  //       label: 'Elliptic curve',
  //       data: yValuesElCurve,
  //       backgroundColor: 'rgba(0, 0, 0, 0)',
  //       borderColor: 'blue',
  //       borderWidth: 5  
  //       }
  //     ]
  //   },
  //   options: {
  //     resposive: true,
  //     maintainAspectRatio: true,
  //     scales: {
  //       x: {
  //         beginAtZero: false,
  //         max: xValuesElCurve[xValuesElCurve.length - 1] + 10,
  //         min: xValuesElCurve[0] - 5,
  //       },
  //       y: {
  //         beginAtZero: false,
  //         max: yValuesElCurve[yValuesElCurve.length - 1] + 10,
  //         min: negYValuesElCurve[yValuesElCurve.length - 1] - 10,
  //       }
  //       }
  //     }
  // });


  let xValuesFiniteField = [];
  let yValuesFiniteField = [];
  const existingFiniteField= Chart.getChart("finiteField");
  if (existingFiniteField) {
    existingFiniteField.destroy();
  }
  //try to use double and add alg instead "for" itterations o(k)
  for(let x = 0; x <= p - 1; x++){// 0 =< A(x,y) < p-1
    for(let y = 0; y <=p - 1; y++){ 
      if (y**2 % p === (x**3 + (a) * x + (b)) % p){
        xValuesFiniteField.push(x);
        yValuesFiniteField.push(y);

      }   
    }
  }

  let Ax = document.getElementById("Ax");
  let Ay = document.getElementById("Ay");
  let kA = document.getElementById("kA");
  let SubgroupOrder = document.getElementById("SubgroupOrder");

  let N = document.getElementById("N");
  N.value = yValuesFiniteField.length + 1;
  Ax.value = parseInt(xValuesFiniteField[1]);
  Ay.value = parseInt(yValuesFiniteField[1]);
  kA.innerText=`(${Ax.value},${Ay.value})`;

 
  let sGOrder = findSubgroupOrder(a, b, p, parseInt(N.value));
  SubgroupOrder.innerText = sGOrder;


  const finiteField = document.getElementById("finiteField");
  const ctxFiniteField = finiteField.getContext("2d");
  new Chart(ctxFiniteField, {
  data: {
    labels: xValuesFiniteField,
    datasets: [          
      {
        type: 'scatter',
        mode: 'markers',
        label: `Finite field of Elliptic curve: y²=x³+ax+b 𝔽(${p})`,
        data: yValuesFiniteField,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: '#63a9cc',
        borderWidth: 5  
      },
      {
        radius: 0,
        label: 'y = p / 2',
        data:  xValuesFiniteField.map(x => p/2),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderColor: 'red',
        borderWidth: 2,
        borderDash: [20, 5], 
        mode: 'linear',
        type: 'line',
      }
    ]
  },
  options: {
    resposive: true,
    maintainAspectRatio: true,
    scales: {
    }
  }
  }
 )
 ;}

export {createCharts}