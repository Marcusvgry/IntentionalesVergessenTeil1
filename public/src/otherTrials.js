const preloadSounds = {
  type: jsPsychPreload,
  audio: [
    soundFiles.guitar,
    soundFiles.piano,
    soundFiles.saxophon,
    soundFiles.violine,
  ],
  show_progress_bar: false,
};

// Erste Instruktionen
const CBC_VPNNummer = {
  type: jsPsychSurveyHtmlForm,
  preamble: ``,
  html: `
        <div class="survey-container">
    <p>Participant-ID</p>
    <input type="number" id="Participant-ID" name="Participant-ID" required class="input-field"/>

    <p> Heutiges Datum</p>
    <input type="date" id="Heutiges-Datum" name="Heutiges-Datum" required class="input-field"/>

    <p> Name der Messperson</p>
    <input type="text" id="Name-der-Messperson" name="Name-der-Messperson" required class="input-field"/>

    <p>Wortliste Lernen</p>
    <div class="condition-radio">
  <input type="radio" id="Wortliste1" name="Wortliste" value="1" required class="condition-radio-input"/>
  <label for="Wortliste1" class="condition-label">1</label>

  <input type="radio" id="Wortliste2" name="Wortliste" value="2" required class="condition-radio-input"/>
  <label for="Wortliste2" class="condition-label">2</label>
</div>

  <p>Auswahl sound 1</p>
  <select name="AuswahlSound1" id="AuswahlSound1" required class="condition-select">
    <option value=""  –</option>
    <option value="1">Sound 1</option>
    <option value="2">Sound 2</option>
    <option value="3">Sound 3</option>
    <option value="4">Sound 4</option>
  </select>

  <p>Auswahl sound 2</p>
  <select name="AuswahlSound2" id="AuswahlSound2" required class="condition-select">
    <option value=""  –</option>
    <option value="1">Sound 1</option>
    <option value="2">Sound 2</option>
    <option value="3">Sound 3</option>
    <option value="4">Sound 4</option>
  </select>

  <p>Auswahl sound 3</p>
  <select name="AuswahlSound3" id="AuswahlSound3" required class="condition-select">
    <option value=""  –</option>
    <option value="1">Sound 1</option>
    <option value="2">Sound 2</option>
    <option value="3">Sound 3</option>
    <option value="4">Sound 4</option>
  </select>

  <p>Auswahl sound 4</p>
  <select name="AuswahlSound4" id="AuswahlSound4" required class="condition-select">
    <option value=""  –</option>
    <option value="1">Sound 1</option>
    <option value="2">Sound 2</option>
    <option value="3">Sound 3</option>
    <option value="4">Sound 4</option>
  </select>
</div>
    
`,
  on_finish: function (data) {
    const responses = data.response;
    selected_tmrsound = responses["AuswahlSound1"];
    selected_tmfsound = responses["AuswahlSound2"];
    selected_rsound = responses["AuswahlSound3"];
    selected_fsound = responses["AuswahlSound4"];
    selectedCondition = responses["Wortliste"];
    settingsDone = true;
  },
};

const freeRecallWoerter = {
  type: freeRecall,
  prompt:
    "Geben Sie die Wörter ein und bestätigen Sie Ihre Eingabe mit der Enter-Taste.",
  button_label: "Fertig",
};

// Cued-Recall Phase
const cuedRecallTrial = {
  type: cuedRecall,
  prompt:
    "Vervollständigen sie das Wort und bestätigen sie ihre Eingabe mit der Enter-Taste.",
  button_label: "Fertig",
  string_to_display: ["Wein", "Tropfen", "Arbeit", "Tür", "Banane", "Kälte"],
};

const Debriefing = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return `
            <div class="instructions">
                <p>Die Lernphase ist nun abgeschlossen.</p>
                <p>Wir werden Sie morgen früh bitten, die Wörter, denen ein EEE folgte, aus dem Gedächtnis abzurufen.</p>
            </div>
        `;
  },
  choices: ["ArrowDown"],
};
