
let callsM1 = 0;

function m1(a) {
    callsM1++;

    if (a.length <= 1) return a.length;

    const mid = a.length >> 1;

    return m1(a.slice(0, mid)) +
           m1(a.slice(mid)) + 1;
}

const array = [1, 2, 3, 4, 5, 6, 7, 8];

callsM1 = 0;
console.log("M1 Return:", m1(array));
console.log("M1 Calls:", callsM1);



let callsM2 = 0;

function m2(n) {
    callsM2++;

    if (n === 0) return 1;

    return n - mm(m2(n - 1));
}

function mm(n) {
    callsM2++;

    if (n === 0) return 0;

    return n - m2(mm(n - 1));
}

callsM2 = 0;
console.log("M2 Return:", m2(20));
console.log("M2 Calls:", callsM2);




let callsM3 = 0;

function m3(n) {
    callsM3++;

    if (n <= 1) return 1;

    return m3(n - 1) + m3(n - 1);
}

callsM3 = 0;
console.log("M3 Return:", m3(20));
console.log("M3 Calls:", callsM3);



// Zgjidhja e tabeles 
//   Function	       Returns    	Calls
//    m1, length 8	     15	          15
//    m2(20)	         13	         1,627
//    m3(20)           	524,288  	1,048,575  //