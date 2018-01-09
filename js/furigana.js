document.addEventListener("DOMContentLoaded", function(event) {
  const form = document.querySelector('form');
  const getFurigana = (e) => {
    const input = document.querySelector('#name__kanji');
    const destination = document.querySelector('#name__furigana');
    const yahooAppId = "dj00aiZpPVJ4MGI4SVhsTWFWciZzPWNvbnN1bWVyc2VjcmV0Jng9ZTQ-";
    const fetchUrl = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20'https%3A%2F%2Fjlp.yahooapis.jp%2FFuriganaService%2FV1%2Ffurigana%3Fappid%3D${yahooAppId}%26grade%3D1%26sentence%3D${input.value}'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
    e.preventDefault();
    fetch(fetchUrl)
      .then((response) => {
        if(response.ok) {
          response.json().then(data => {

            const wordArray = data.query.results.ResultSet.Result.WordList.Word;
            // console.log(wordArray);
            let hiraganaArray = [];
            for (var i = 0; i < wordArray.length; i++) {
              // console.log(wordArray[i].Furigana);
              hiraganaArray.push(wordArray[i].Furigana);
            }
            // console.log(hiraganaArray);
            const hiragana = hiraganaArray.join('　');
            // console.log(hiragana);
            const katakana = hiraganaToKatakana(hiragana);
            // console.log(katakana);
            function hiraganaToKatakana(hiragana) {
              return hiragana.replace(/[\u3041-\u3096]/g, function(match) {
                var chr = match.charCodeAt(0) + 0x60;
                return String.fromCharCode(chr);
              });
            }
            destination.value = katakana;
          })
        } else {
          throw new Error();
        }
      })
      .catch((error) => console.log(error));
  };

  form.addEventListener('submit', getFurigana);

});