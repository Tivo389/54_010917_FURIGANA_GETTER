document.addEventListener("DOMContentLoaded", function(event) {
  const form = document.querySelector('form');
  const getFurigana = (e) => {
    const input = document.querySelector('#name__kanji');
    const destination = document.querySelector('#name__furigana');
    const gooAppId = "6389a0c7a6a5634dc41ccb93db9c5a1c3924e6ed79b92a249458047b91d7f0af";
    const fetchUrl = "https://labs.goo.ne.jp/api/hiragana";

    e.preventDefault();

    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: JSON.stringify({
        "app_id": gooAppId,
        "sentence": input.value,
        "output_type": "katakana"
      })
    })
      .then((response) => {
        if(response.ok) {
          response.json().then(data => {
            console.log(data);
            // const wordArray = data.query.results.ResultSet.Result.WordList.Word;
            // console.log(wordArray);
            // let hiragana = "";
            // if(wordArray.length === undefined) {
            //   hiragana = wordArray.Furigana;
            //   // console.log(hiragana);
            // } else {
            //   let hiraganaArray = [];
            //   for (var i = 0; i < wordArray.length; i++) {
            //     // console.log(wordArray[i].Furigana);
            //     hiraganaArray.push(wordArray[i].Furigana);
            //   }
            //   // console.log(hiraganaArray);
            //   hiragana = hiraganaArray.join('　');
            //   // console.log(hiragana);
            // }
            // const katakana = hiraganaToKatakana(hiragana);
            // // console.log(katakana);
            // function hiraganaToKatakana(hiragana) {
            //   return hiragana.replace(/[\u3041-\u3096]/g, function(match) {
            //     var chr = match.charCodeAt(0) + 0x60;
            //     return String.fromCharCode(chr);
            //   });
            // }
            // destination.value = katakana;
          })
        } else {
          throw new Error();
        }
      })
      .catch((error) => console.log(error));
  };
  form.addEventListener('submit', getFurigana);
});