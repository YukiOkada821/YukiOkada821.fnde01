'use strict'

const codeList = {
  北海道: "016000",
  青森: "020000",
  岩手: "030000",
  宮城: "040000",
  秋田: "050000",
  山形: "060000",
  福島: "070000",
  茨城: "080000",
  栃木: "090000",
  群馬: "100000",
  埼玉: "110000",
  千葉: "120000",
  東京: "130000",
  神奈川: "140000",
  新潟: "150000",
  富山: "160000",
  石川: "170000",
  福井: "180000",
  山梨: "190000",
  長野: "200000",
  岐阜: "210000",
  静岡: "220000",
  愛知: "230000",
  三重: "240000",
  滋賀: "250000",
  京都: "260000",
  大阪: "270000",
  兵庫: "280000",
  奈良: "290000",
  和歌山: "300000",
  鳥取: "310000",
  島根: "320000",
  岡山: "330000",
  広島: "340000",
  山口: "350000",
  徳島: "360000",
  香川: "370000",
  愛媛: "380000",
  高知: "390000",
  福岡: "400000",
  佐賀: "410000",
  長崎: "420000",
  熊本: "430000",
  大分: "440000",
  宮崎: "450000",
  鹿児島: "460100",
  沖縄: "471000",
};

// Jmap jQuery pluginの設定
$(document).ready(function () { //HTML=DOMの読み込みが終わったらfunction()の中の処理を実行
  $("#jmap").jmap({ //$（"#jmap"）はHTML内のIDがjmapの要素
    backgroundColor: "#AFDFE4", // 地図の背景色:Aqua
    prefectureBackgroundColor: "#00B16B", // 地図の色:Green
    // 都道府県が選択された際の処理
    onSelect: function (e, data) {
      getWeather(codeList[data.name]);
    },
  });
});

async function getWeather(code) {
  // fetchでデータ取得
  const response = await fetch(`https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${code}.json`);
  const json = await response.json(); //操作できるようにJSON形式に変換
  // DOM操作
  document.querySelector("h1").textContent = json.targetArea; //都道府県名
  document.querySelector("#time").textContent = json.reportDatetime //発表時間
    .replace("T", " ")
    .replace("+09:00", "");
  document.querySelector("#text").innerHTML = json.text.replace(/\n|\r/g, "<br>"); //概要
  document.querySelector("#pubOffice").textContent = json.publishingOffice; //情報発表元
}

function showCurrentTime () { //現在時刻入れる
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  const currentTime = `現在の時刻は ${hour}時${minutes}分 です。`; //'ではだめ。バッククォート使う
  console.log(currentTime);
  document.querySelector("#currentTime").textContent = currentTime;
}

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const prefCode = params.get("pref");

    if (prefCode) {
       console.log("受け取った県コード:", prefCode);
         getWeather(prefCode); //初期値は愛知県
       const display = document.getElementById("prefDisplay");
       if (display) {
           display.textContent = `選択された県コード: ${prefCode}`;
       }
    } else {
        console.warn("県コードがURLに含まれていません");
    }
});

showCurrentTime();




// //メモ
// async：非同期処理：「待たずに次のことを進める」処理のこと。データを取りに行ってる間に違うことやる
// await：データが返ってくるまで待つ
// ・fetch()はJSでサーバーとの通信を行うためのメソッド。指定したURLからデータを取得
// 　サーバーに対してHTTPリクエストを送信、その結果を受け取る役割
// /\n|\r/gで改行

// fetchで今回取ってくる情報の中身の例
// {
//   "publishingOffice": "沖縄気象台",
//   "reportDatetime": "2025-06-18T16:36:00+09:00",
//   "targetArea": "沖縄本島地方",
//   "headlineText": "",
//   "text": "【沖縄本島地方】\n　沖縄本島地方は、高気圧のへりを回り込む湿った空気の影響でおおむね曇っています。\n\n　１８日は、高気圧のへりを回り込む湿った空気の影響でおおむね曇り、雨や雷雨となる所があるでしょう。\n\n　１９日は、太平洋高気圧に覆われておおむね晴れますが、所によりにわか雨や雷雨がある見込みです。\n\n【沖縄地方】\n　日本の南に高気圧があって、ほとんど停滞しています。\n\n　沖縄本島地方と先島諸島はおおむね曇っています。大東島地方は晴れています。\n\n　１８日は、沖縄本島地方と先島諸島では、高気圧のへりを回り込む湿った空気の影響でおおむね曇り、雨や雷雨となる所があるでしょう。大東島地方は、太平洋高気圧に覆われておおむね晴れますが、所によりにわか雨や雷雨がある見込みです。\n\n　１９日は、沖縄本島地方と先島諸島では高気圧に覆われておおむね晴れますが、所によりにわか雨や雷雨があるでしょう。大東島地方では高気圧を回り込む湿った空気の影響でおおむね曇り、雨や雷雨となる所がある見込みです。\n\n　沖縄地方の沿岸の海域では、多少波があるでしょう。"
// }