const recordBtn = document.querySelector(".record")
const addBtn = document.querySelector(".add")
const result = document.querySelector(".result")
const interim = document.querySelector(".interim")
const clearBtn = document.querySelector(".clear");
const body = document.getElementById("body")

let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition,
  recognition,
  recording = false;


function speechToText() {
  try {
    recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recordBtn.classList.add("recording");
    //doc.queryselect.style = red
    // recordBtn.querySelector("p").innerHTML = "Listening...";
    recognition.start();
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      //detect when intrim results
      if (event.results[0].isFinal) {
        result.innerHTML += " " + speechResult;

      // const contentToInsert = result.innerHTML
      // console.log(result.innerHTML)
      tinyMCE.execCommand('mceInsertContent',false,speechResult + " ");
      tinyMCE.activeEditor.selection.select(tinyMCE.activeEditor.getBody(), true);
      tinyMCE.activeEditor.selection.collapse(false);

      } else {
        //creative p with class interim if not already there
        if (!document.querySelector(".interim")) {
          const interim = document.createElement("p");
          interim.classList.add("interim");
          result.appendChild(interim);
        }
        //update the interim p with the speech result
        document.querySelector(".interim").innerHTML = " " + speechResult;
      }

    };
    recognition.onspeechend = () => {
      speechToText();
    };
    recognition.onerror = (event) => {
        console.log(event)
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

recordBtn.addEventListener("click", () => {
  if (!recording) {
    speechToText();
    recording = true;
  } else {
    stopRecording();
  }
});

function stopRecording() {
  recognition.stop();
  //style=green
  // recordBtn.querySelector("p").innerHTML = "Start Listening";
  recordBtn.classList.remove("recording");
  recording = false;
  result.innerHTML = "";
  interim.innerHTML = "";
}

clearBtn.addEventListener("click", () => {
  result.innerHTML = "";

});