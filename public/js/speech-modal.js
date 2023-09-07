const recordBtn = document.querySelector(".record");
const result = document.querySelector(".result");
const interim = document.querySelector(".interim");

let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition,
  recording = false;
  recognition = new SpeechRecognition();

function speechToText() {
  try {
    recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recordBtn.classList.add("recording");
    recordBtn.querySelector("img").setAttribute("src", "../public/img/recordingicon.svg");
    recognition.start();
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;

      if (event.results[0].isFinal) {
        result.innerHTML += " " + speechResult;
        tinyMCE.execCommand("mceInsertContent", false, speechResult + " ");
        tinyMCE.activeEditor.selection.select(
          tinyMCE.activeEditor.getBody(),
          true
        );
        tinyMCE.activeEditor.selection.collapse(false);
      } else {

        if (!document.querySelector(".interim")) {
          const interim = document.createElement("p");
          interim.classList.add("interim");
          result.appendChild(interim);
        }

        document.querySelector(".interim").innerHTML = " " + speechResult;
      }
    };
    recognition.onspeechend = () => {
      speechToText();
    };
    recognition.onerror = (event) => {
      console.log(event);
      const theme = document.querySelector('html').getAttribute('data-bs-theme')
      if
      (theme == 'dark-mode'){recordBtn.querySelector("img").setAttribute("src", "../public/img/miceWhite.svg"); } else {
        recordBtn.querySelector("img").setAttribute("src", "../public/img/micIcon.svg");
    }
      stopRecording();
      if (event.error === "no-speech") {
        alert("No speech was detected. Stopping...");
      } else if (event.error === "audio-capture") {
        alert(
          "No microphone was found. Ensure that a microphone is installed."
        );
      } else if (event.error === "not-allowed") {
        alert("Permission to use microphone is blocked.");
      } else if (event.error === "aborted") {
        alert("Listening Stopped.");
      } else {
        alert("Error occurred in recognition: " + event.error);
      }
    };
  } catch (error) {
    recording = false;

    console.log(error);
  }
}

recordBtn.addEventListener("click", (e) => {
if (!recording) {
    speechToText();
    recording = true;
    } else {
    stopRecording();
    }
});


function stopRecording() {
  recognition.stop();
  console.log()
  const theme = document.querySelector('html').getAttribute('data-bs-theme')
      if (theme == 'dark-mode')
      {recordBtn.querySelector("img").setAttribute("src", "../public/img/miceWhite.svg")} else {
      recordBtn.querySelector("img").setAttribute("src", "../public/img/micIcon.svg")
    }
  recordBtn.classList.remove("recording");
  recording = false;
  result.innerHTML = "";
  interim.innerHTML = "";
}