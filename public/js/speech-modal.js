const recordBtn = document.querySelectorAll(".record");
const result = document.querySelector(".result");
const interim = document.querySelector(".interim");

let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition,
  recording = false;
  recognition = new SpeechRecognition();

function speechToText(i) {
  try {
    recognition = new SpeechRecognition();
    recognition.interimResults = false;
    console.log(i)
    i.classList.add("recording");
    i
      .querySelector("img")
      .setAttribute("src", "../public/img/recordingicon.svg");
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
      speechToText(i);
    };
    recognition.onerror = (event) => {
      console.log(event);
      i.querySelector("img").setAttribute("src", "../public/img/micIcon.svg");
      stopRecording(i);
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

for (let i of recordBtn) {
  i.addEventListener("click", (e) => {
    if (!recording) {
      speechToText(i);
      recording = true;
    } else {
      stopRecording(i);
    }
  });
}

function stopRecording(i) {
  recognition.stop();
  console.log(i)
  i.querySelector("img").setAttribute("src", "../public/img/micIcon.svg");
  i.classList.remove("recording");
  recording = false;
  result.innerHTML = "";
  interim.innerHTML = "";
}