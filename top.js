'use strict'

// document.getElementById("form").select.onchange = function() {
//   location.href = document.getElementById("form").select.value;
// }


const input = document.getElementById("prefecture");
    if (input) {
        input.onchange = function() {
        console.log(input.value); //県コード
        const codeOfPref = input.value;
        
        //URLパラメータとして渡す
        location.href = `index.html?pref=${codeOfPref}`;
    };
    } else {
        console.error("要素が見つかりません");
    }
