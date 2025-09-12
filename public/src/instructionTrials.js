// Erste Instruktionen
const CBC_VPNNummer = {
  type: jsPsychSurveyHtmlForm,
  preamble: ``,
  html: `
        <div class="survey-container">
    <p>VPN-Nummer</p>
    <input type="number" id="VPN-Nummer" name="VPN-Nummer" required class="input-field"/>

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

const instructions = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p> Liebe Teilnehmerin, lieber Teilnehmer,  </p>
        <p> zunächst einmal ganz herzlichen Dank für Ihre Bereitschaft, an dieser Studie teilzunehmen. </p>
        <p> In dieser Studie geht es darum, wie gut man Wörter erinnern und auch zielgerichtet wieder vergessen kann. </p>
        <p> Die Studie besteht aus mehreren Phasen. </p>
        <p> Bitte lesen Sie die folgenden Instruktionen gründlich durch. Wenn Sie während der Studie Fragen haben, können Sie sich jederzeit an die Versuchsleitung wenden. </p>
 </div>`,
    `<div class="instructions">
        <p> Die Studie beginnt mit einer Lernphase. Dabei sehen Sie eine Reihe von einzelnen Wörtern, die nacheinander auf dem Bildschirm erscheinen. </p>
        <p> Ihre Aufgabe wird es sein, sich einen Teil der Wörter für einen späteren Gedächtnistest zu merken. </p>
        </div>`,
    `<div class="instructions">
        <p> Von den Wörtern, die Ihnen gleich im Lerndurchgang gezeigt werden, sollen nur bestimmte Wörter gelernt werden. </p>
        <p> Folgt auf ein Wort die Buchstabenkombination "EEE" sollen Sie sich später an das vorangegangene Wort erinnern (E = erinnern). </p>
        <p> Erscheint nach einem Wort die Buchstabenkombination "VVV" sollen Sie sich das vorangegangene Wort bitte NICHT merken, sondern direkt wieder vergessen (V = vergessen). </p>
        <p> Gleichzeitig mit den Wörtern werden außerdem Töne von verschiedenen Musikinstrumenten abgespielt. Diese Töne haben keine Bedeutung für Sie oder Ihre Aufgabe. </p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Weiter",
  allow_backward: false,
};

const instructions_2 = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p> In diesem Beispiel hätten Sie sich nur das Wort "Sonne" für den späteren Gedächtnistest merken sollen, das Wort „Rose“ jedoch nicht. </p>
        </div>`,
    `<div class="instructions">
        <p> Zusammenfassung: </p>
        </p> Sie sehen gleich eine Reihe von Wörtern hintereinander. Von diesen Wörtern sollen Sie sich nur die Wörter einprägen, auf die die Buchstabenkombination "EEE" folgt.
 </p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Weiter",
  allow_backward: false,
};

const instructions_3 = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p> Bevor der richtige Lerndurchgang beginnt, folgt nun ein Übungsdurchgang, in dem Sie sich mit Ihrer Aufgabe vertraut machen können. </p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Übungsdurchgang beginnen",
  allow_backward: false,
};

const instructions_4 = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p> Nun folgt der Gedächtnistest. Zunächst einmal bitten wir Sie, alle Wörter, die Sie auch erinnern sollten, frei aus dem Gedächtnis abzurufen. </p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Gedächtnistest beginnen",
  allow_backward: false,
};

const instructions_5 = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p> In der vorherigen Lernphase hatten wir Ihnen 6 Wörter präsentiert, die Sie erinnern sollten. <br>
         Wir zeigen Ihnen von diesen Wörtern jetzt jeweils die ersten beiden Buchstaben und möchten Sie bitten, das Wort 
         dann entsprechend zu vervollständigen. <br> Auch wenn sie das Wort eben schon korrekt erinnert haben, sollen Sie es
          trotzdem noch einmal in diesem Test vervollständigen., </p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Vervollständigungsaufgabe beginnen",
  allow_backward: false,
};

const instructions_6 = {
  type: jsPsychInstructions,
  pages: [
    `<div class="instructions">
        <p> Haben Sie noch Fragen zur Lernphase oder zu Ihrer Aufgabe? </p>
        <p> Falls Sie noch Fragen haben, wenden Sie sich bitte jetzt an die Versuchsleitung. </p>
        <p> Wenn Sie keine Fragen mehr haben, drücken Sie die Leertaste, um die Wörter für den späteren Gedächtnistest zu lernen. </p>
        <p> Bitte stellen Sie sich darauf ein, dass Sie jetzt in dieser Lernphase mehr Wörter präsentiert bekommen werden als in den Übungsdurchgängen </p>
        </div>`,
  ],
  show_clickable_nav: true,
  button_label_next: "Lernphase beginnen",
  allow_backward: false,
};
