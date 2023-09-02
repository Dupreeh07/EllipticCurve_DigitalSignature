const getModule = (x, p) => { 
  if(x < 0){
    x = p - (-x % p)
    return x;
  }else if ( x > 0){
    x = x % p;
    return x;
  }else {
    x = 0;
    return x;
  }
}

  
const divModule = (x, y, p) => { 
  /* later try to use Euclidean algorithm instead O(k), don't forget*/
  let reciprocalNumber = 0;
  let res;
  if(x == 0 || y == 0 || x ==0 && y == 0){
    res = 0;
  } else {
    while((reciprocalNumber * getModule(x, p)) % p !== 1){
      reciprocalNumber++;
      res = (reciprocalNumber * getModule(y, p)) % p 
    }
 }
  return res;
}

const extendedEuclidean = (a, b) => { 
  if (b === 0) {
      return [a, 1, 0];
  } else {
      const [d, x, y] = extendedEuclidean(b, a % b);
      return [d, y, x - Math.floor(a / b) * y];
  }
};

const divEuclAlg = (x, y, p) => {
  const [gcd, inverse, _] = extendedEuclidean(y, p);
  
  if (gcd !== 1) {
    console.log("Inverse does not exist");
  }
  
  const res = (x * inverse + p) % p;
  if(res < 0){
    console.log(getModule(res, p));
    return getModule(res, p)
  }else {
  console.log("divModuleNew", res);
  return res;
  }
};


/*only works for identical points: A+A=2A*/
  /**
   * if dy = 0 (in differentiated expression (y^2)' = 2y^1), 
   * then tangent == vertical asymptote.
   * so asymptote intersects the curve at the point of infinity???
   */
const add2IdenPoints = (x, y, a, p) => {  //only works for identical points  A+A=2A
  if (divModule((y * 2), 1, p) == 0){
    return[0, 0]
  }else{ 
  let slope = getModule(((( 3* x**2 + a) * divModule((y * 2), 1, p)) % p), p); 
  let xMul2 = getModule(((slope**2 - x - x) % p), p);   //(3^2 - 7 - 7) (3 * (7 - 6) - 8)          
  let yMul2 = getModule(((slope * ( x - xMul2) - (y)) % p), p);      
  return  [xMul2, yMul2];
}
}


const add2DiffPoints = (x1, y1, x2, y2, p) => {
  if(x1 !== x2){
  let slope = getModule((((y2 - y1) * (divModule((x2 - x1), 1, p) )) % p), p);
  let x3 = getModule(((slope**2 - x1 - x2) % p), p);
  let y3 = getModule((slope * ( x1 - x3) - y1), p); 
  return [x3, y3];
  }else{ 
    return [0, 0]
  }
}

const getBinary = (num) => {
  let binary = (num >>> 0).toString(2);
  let digits = binary.split('');
  return digits;
}

/**
*  DoubleAndAdd algorithm work correct except for the case 0 * P(x,y)
*  so added multiplier == 0? checker
*  generatorPoint * k (integer) == one of the points of generated subgroup 
*
*/

/**
 * 
 * DoubleAndAdd algorithm for finding 16P
 * 16 = binary [1, 0, 0, 0, 0]
 * first digit == 1 skiped, first digit is always skipped
 * second == 0 means double: add2IdenPoints P+P=2P 
 * 0 2P + 2P = 4P
 * 0 4p + 4P = 8P
 * 0 8p + 4P = 16P 
 * 
 */
function calcDoubleAddAlg(x, y, p, a, multiplier){ 
  let newPoint = [x, y];

  let currMultiplier = 1;
  if (multiplier !== 0) {
  const digits = getBinary(multiplier); 
  for(let i = 1; i < digits.length; i++){
    if (digits[i] == "0"){
      newPoint = add2IdenPoints(newPoint[0], newPoint[1], a, p);
      currMultiplier += currMultiplier;
    } else {
      newPoint = add2IdenPoints(newPoint[0], newPoint[1], a, p);
      currMultiplier += currMultiplier;;
      if(newPoint[0] == x && newPoint[1] == y){
        currMultiplier += 1;
        newPoint = add2IdenPoints(newPoint[0], newPoint[1], a, p);
      }else{
        if (newPoint[0] == 0 && newPoint[1] == 0){// if (7k)P = (2*7k)P = 0 => (7k + 1)P = (2*7K + 1)P = P
          newPoint = [x,y]; 
        }else{
        newPoint = add2DiffPoints(newPoint[0], newPoint[1], x, y, p);
        currMultiplier += 1;
        }
      }
    }
  }
  return newPoint;
  } else {
    return [0, 0]; 
  }
}

export {divModule, getModule, add2DiffPoints, add2IdenPoints, calcDoubleAddAlg}