function takeLongTime(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(n + 200), n);
    });
}

function step1(n) {
    console.log(`step1 with ${n}`);
    return takeLongTime(n);
}

function step2(m, n) {
    console.log(`step2 with ${m} and ${n}`);
    return takeLongTime(m + n);
}

function step3(k, m, n) {
    console.log(`step3 with ${k}, ${m} and ${n}`);
    return takeLongTime(k + m + n);
}

time1 =300;
step1(time1).then(n=>{
    return step2(n, 200).then(time2=>[time2, time1]);
}).then(o=>{
    return step3(100,o[0],o[1]);
}).then(x=>{
        console.log('final' + x);
    });;