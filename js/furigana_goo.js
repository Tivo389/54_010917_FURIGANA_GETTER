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
        "Content-Type": "application/x-www-form-urlencoded"
      },
      // ATTEMPT 001 : The below is a JSON format not a urlencoded format.
      // body: JSON.stringify({
      //   "app_id": gooAppId,
      //   "sentence": input.value,
      //   "output_type": "katakana"
      // })
      // ATTEMPT 002 : The below was done manually.
      // body: `app_id=${gooAppId}&sentence=${input.value}&output_type=katakana`
      // ATTEMPT 003 : BETTER!
      body: jQuery.param({
        "app_id": gooAppId,
        "sentence": input.value,
        "output_type": "katakana"
      })
    })
      .then((response) => {
        if(response.ok) {
          response.json().then(data => {
            const katakana = data.converted;
            console.log(katakana);
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