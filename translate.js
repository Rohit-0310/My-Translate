    var select3;
    var select4;
    async function OutputLanguage() {

        let input = await fetch(
            "https://libretranslate.de/languages"
            );

        let data = await input.json();

        let select1 = document.getElementById("select1");
        let select2 = document.getElementById("select2");
        data.forEach(({ code, name }) => {

            let option1 = document.createElement("option");
            option1.value = code;
            option1.innerHTML = name;
    
            let option2 = document.createElement("option");
            option2.value = code;
            option2.innerHTML = name;
            select1.append(option1);
            select2.append(option2);
        });

        select3 = select1.value;
        select4 = select2.value;
    }

    OutputLanguage();
  
    function getInp() {

        select3 = select1.value;
    }
    var b;
    function outInp() {

        select4 = select2.value;
    }
  
    async function Translate() {
        let query = document.getElementById("query").value;

        let obj = {
            q: query,
            source: select3,
            target: select4,
        };
        let input = await fetch("https://libretranslate.de/translate", {

            method: "POST",

            body: JSON.stringify(obj),
            headers: { "Content-Type": "application/json" },
        });
        let { translatedText } = await input.json();
        document.getElementById("output").value = translatedText;
    }
    function speak() {
        let msg = document.getElementById("output").value;
        let speech = new SpeechSynthesisUtterance();
        speech.lang = select4
        speech.text = msg;
        speech.volume = 2;
        speech.rate = 1;
        speech.pitch = 2;
        window.speechSynthesis.speak(speech);
    }
    function speechToText() {
        let query = document.getElementById("query");

        let mic = document.getElementById("mic");

        var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  
        let recognition = new SpeechRecognition();
  
        recognition.onstart = () => {
            mic.innerHTML = `<span class="material-icons-outlined">mic</span>`;
        };
        recognition.onspeechend = () => {
            mic.innerHTML = '<span class="material-icons-outlined">mic_off</span>';
            recognition.stop();
        };
  
        recognition.onresult = ({ results }) => {
  
            query.value = results[0][0].transcript;
        };
        recognition.start();
    }
    