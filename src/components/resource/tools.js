export const toMoney = (val) =>{
    let result = val;
    if (val > 999) {
        result = convertToMoney(val)
    }
    return result;
}

const convertToMoney = (num) =>{
    const arr = (num).toString().split("");
    const temp_arr = arr;
    let i = -1;
    let txt = ''

    temp_arr.slice().reverse().forEach(element => {
         if (i === 2) {
            txt = `${element},${txt}`;
            i = 0;
         }else{
            txt = `${element}${txt}`;
            i++;
         }
    });

    return txt;
}