'use strict'

// document.getElementById("form").select.onchange = function() {
//   location.href = document.getElementById("form").select.value;
// }


document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("prefecture");
    const button = document.getElementById("movepage");

    let selectedPrefCode = "";

    if (input && button) {
        // 選択された値を保存
        input.addEventListener("change", function () {
            selectedPrefCode = input.value;
            console.log("選択されたコード:", selectedPrefCode);
        });

        // ボタンを押したときに遷移
        button.addEventListener("click", function () {
            if (!selectedPrefCode) {
                alert("都道府県を選択してください");
                return;
            }

            const targetUrl = `main.html?pref=${selectedPrefCode}`;
            console.log("遷移先:", targetUrl);
            //alert(targetUrl); //確認用
            location.href = targetUrl;
        });
    } else {
        console.error("要素が見つかりません");
    }
});
