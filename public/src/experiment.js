// Initialisierung von jsPsych und der Timeline
var timeline = [];
const jsPsych = initJsPsych({
  use_webaudio: false,
  on_finish: function () {
    // VPN-Nummer speichern
    const responses = jsPsych.data
      .get()
      .filter({ trial_type: "survey-html-form" })
      .values()[0].response;
    const vpnNumber = responses["VPN-Nummer"];

    // Dateiname erstellen
    const filename = `IntentionalesVergessen1_VP${vpnNumber}.csv`;

    // Daten als CSV speichern
    jsPsych.data.get().localSave("csv", filename);
  },
});

function startExperiment() {
  jsPsych.run(timeline);
}

// Variablen
var freeRecallList = [];

// Preload
var preload = {
  type: jsPsychPreload,
  auto_preload: true,
};

// Wörterlisten

var Beispiel = [];

var testdurchgang = [];

var Bedingung_1_piano = [
  "Ecke",
  "Gift",
  "Brett",
  "Dampf",
  "Tier",
  "Grab",
  "Hose",
  "Erde",
];

var Bedingung_1_saxophon = [
  "Baden",
  "Berg",
  "Seil",
  "Vieh",
  "Boden",
  "Haut",
  "Auto",
  "Blut",
];

var Bedingung_2_guitar = [
  "Gold",
  "Kalk",
  "Fluss",
  "Geld",
  "Ofen",
  "Kind",
  "Meer",
  "Heer",
];

var Bedingung_2_violine = [
  "Apfel",
  "Buch",
  "Moor",
  "Pelz",
  "Eisen",
  "Luft",
  "Allee",
  "Wald",
];

var Stimuli = [];

/**
 * @param {Array<Object>} stimuli
 * @returns {Array<Object>}
 */
function counteractPrimRecEffects(stimuli) {
  let poolVVV = stimuli.filter((s) => s.Anweisung === "VVV");
  let poolEEE = stimuli.filter((s) => s.Anweisung === "EEE");

  function sample(arr, n) {
    return jsPsych.randomization.sampleWithoutReplacement(arr, n);
  }

  let firstVVV = sample(poolVVV, 3);
  poolVVV = poolVVV.filter((s) => !firstVVV.includes(s));
  let firstEEE = sample(poolEEE, 3);
  poolEEE = poolEEE.filter((s) => !firstEEE.includes(s));
  let blockFirst = jsPsych.randomization.shuffle([...firstVVV, ...firstEEE]);

  let lastVVV = sample(poolVVV, 3);
  poolVVV = poolVVV.filter((s) => !lastVVV.includes(s));
  let lastEEE = sample(poolEEE, 3);
  poolEEE = poolEEE.filter((s) => !lastEEE.includes(s));
  let blockLast = jsPsych.randomization.shuffle([...lastVVV, ...lastEEE]);

  let blockMiddle = jsPsych.randomization.shuffle([...poolVVV, ...poolEEE]);

  return [...blockFirst, ...blockMiddle, ...blockLast];
}

timeline.push({
  type: jsPsychFullscreen,
  fullscreen_mode: true,
});

// Sound-Dateien als Variablen definieren
const soundFiles = {
  guitar: "../sounds/guitar.mp3",
  piano: "../sounds/piano.mp3",
  saxophon: "../sounds/saxophon.mp3",
  violine: "../sounds/violine.mp3",
};

var guitar = new Audio(soundFiles.guitar);
var piano = new Audio(soundFiles.piano);
var saxophon = new Audio(soundFiles.saxophon);
var violine = new Audio(soundFiles.violine);

// Sounds für jsPsych vorladen
const preloadSounds = {
  type: jsPsychPreload,
  audio: [
    soundFiles.guitar,
    soundFiles.piano,
    soundFiles.saxophon,
    soundFiles.violine,
  ],
};

timeline.push(preloadSounds);

// Erste Instruktionen
const CBC_VPNNummer = {
  type: jsPsychSurveyHtmlForm,
  preamble: ``,
  html: `
        <div class="survey-container">
    <p>Versuchspersonennummer</p>
    <input type="number" id="VPN-Nummer" name="VPN-Nummer" required class="input-field"/>

    <p>Bedingung</p>
    <div class="condition-radio">
  <input type="radio" id="Bedingung1" name="Bedingung" value="1" required class="condition-radio-input"/>
  <label for="Bedingung1" class="condition-label">1</label>

  <input type="radio" id="Bedingung2" name="Bedingung" value="2" required class="condition-radio-input"/>
  <label for="Bedingung2" class="condition-label">2</label>
</div>


  <!-- Reaktivierter Ton erinnern -->
  <p>Reaktivierter Ton erinnern</p>
  <select name="ReaktivierterTon" id="ReaktivierterTon" required class="condition-select">
    <option value=""  –</option>
    <option value="Klavier (Bed. 1)">Klavier (Bed. 1)</option>
    <option value="Saxophon (Bed. 1)">Saxophon (Bed. 1)</option>
    <option value="Gitarre (Bed. 2)">Gitarre (Bed. 2)</option>
    <option value="Violine (Bed. 2)">Violine (Bed. 2)</option>
  </select>

  <!-- Reaktivierter Ton vergessen -->
  <p>Reaktivierter Ton vergessen</p>
  <select name="ReaktivierterTon2" id="ReaktivierterTon2" required class="condition-select">
    <option value=""  –</option>
    <option value="Klavier (Bed. 2)">Klavier (Bed. 2)</option>
    <option value="Saxophon (Bed. 2)">Saxophon (Bed. 2)</option>
    <option value="Gitarre (Bed. 1)">Gitarre (Bed. 1)</option>
    <option value="Violine (Bed. 1)">Violine (Bed. 1)</option>
  </select>
</div>
    
`,
  on_finish: function (data) {
    const responses = data.response;
    selectedCondition = responses["Bedingung"];
    if (selectedCondition === "1") {
      Beispiel.push({ Wort: "Sonne", Anweisung: "EEE", sound: "piano" });
      Beispiel.push({ Wort: "Rose", Anweisung: "VVV", sound: "guitar" });

      testdurchgang.push(
        { Wort: "Prinz", Anweisung: "VVV", sound: "guitar" },
        { Wort: "Tropfen", Anweisung: "EEE", sound: "piano" },
        { Wort: "Arbeit", Anweisung: "EEE", sound: "saxophon" },
        { Wort: "Hase", Anweisung: "VVV", sound: "violine" },
        { Wort: "Wein", Anweisung: "EEE", sound: "piano" },
        { Wort: "Montag", Anweisung: "VVV", sound: "guitar" },
        { Wort: "Herd", Anweisung: "VVV", sound: "violine" },
        { Wort: "Kälte", Anweisung: "EEE", sound: "saxophon" },
        { Wort: "Kabel", Anweisung: "VVV", sound: "guitar" },
        { Wort: "Banane", Anweisung: "EEE", sound: "piano" },
        { Wort: "Tür", Anweisung: "EEE", sound: "saxophon" },
        { Wort: "Uhr", Anweisung: "VVV", sound: "violine" }
      );

      // Bedingung 1
      for (let i in Bedingung_1_piano) {
        Stimuli.push({
          Wort: Bedingung_1_piano[i],
          Anweisung: "EEE",
          sound: "piano",
        });
      }
      for (let i in Bedingung_1_saxophon) {
        Stimuli.push({
          Wort: Bedingung_1_saxophon[i],
          Anweisung: "EEE",
          sound: "saxophon",
        });
      }
      for (let i in Bedingung_2_guitar) {
        Stimuli.push({
          Wort: Bedingung_2_guitar[i],
          Anweisung: "VVV",
          sound: "guitar",
        });
      }
      for (let i in Bedingung_2_violine) {
        Stimuli.push({
          Wort: Bedingung_2_violine[i],
          Anweisung: "VVV",
          sound: "violine",
        });
      }

      const shuffled = counteractPrimRecEffects(Stimuli);
      Stimuli.splice(0, Stimuli.length, ...shuffled);
      console.log(Stimuli);
    } else if (selectedCondition === "2") {
      Beispiel.push({ Wort: "Sonne", Anweisung: "EEE", sound: "guitar" });
      Beispiel.push({ Wort: "Rose", Anweisung: "VVV", sound: "piano" });

      // Bedingung 2
      for (let i in Bedingung_1_piano) {
        Stimuli.push({
          Wort: Bedingung_1_piano[i],
          Anweisung: "VVV",
          sound: "piano",
        });
      }

      testdurchgang.push(
        { Wort: "Prinz", Anweisung: "VVV", sound: "piano" },
        { Wort: "Tropfen", Anweisung: "EEE", sound: "guitar" },
        { Wort: "Arbeit", Anweisung: "EEE", sound: "violine" },
        { Wort: "Hase", Anweisung: "VVV", sound: "saxophon" },
        { Wort: "Wein", Anweisung: "EEE", sound: "guitar" },
        { Wort: "Montag", Anweisung: "VVV", sound: "piano" },
        { Wort: "Herd", Anweisung: "VVV", sound: "saxophon" },
        { Wort: "Kälte", Anweisung: "EEE", sound: "violine" },
        { Wort: "Kabel", Anweisung: "VVV", sound: "piano" },
        { Wort: "Banane", Anweisung: "EEE", sound: "guitar" },
        { Wort: "Tür", Anweisung: "EEE", sound: "violine" },
        { Wort: "Uhr", Anweisung: "VVV", sound: "saxophon" }
      );

      for (let i in Bedingung_1_saxophon) {
        Stimuli.push({
          Wort: Bedingung_1_saxophon[i],
          Anweisung: "VVV",
          sound: "saxophon",
        });
      }

      for (let i in Bedingung_2_guitar) {
        Stimuli.push({
          Wort: Bedingung_2_guitar[i],
          Anweisung: "EEE",
          sound: "guitar",
        });
      }
      for (let i in Bedingung_2_violine) {
        Stimuli.push({
          Wort: Bedingung_2_violine[i],
          Anweisung: "EEE",
          sound: "violine",
        });
      }

      const shuffled = counteractPrimRecEffects(Stimuli);
      Stimuli.splice(0, Stimuli.length, ...shuffled);
      console.log(Stimuli);
    }
  },
};

// Weitere Phasen und Instruktionen
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

const beispiel = {
  timeline: [
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style="font-size: 60px;">+</div>',
      choices: "NO_KEYS",
      trial_duration: 500,
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: jsPsych.timelineVariable("Wort"),
      choices: "NO_KEYS",
      trial_duration: 1000,
      stimulus_duration: 1000,
      css_classes: ["stimulus-large-text"],
      on_load: function () {
        const sound = jsPsych.evaluateTimelineVariable("sound");
        if (sound === "piano") {
          piano.play();
          setTimeout(function () {
            piano.pause();
            piano.currentTime = 0;
          }, 1000);
        } else if (sound === "saxophon") {
          saxophon.play();
          setTimeout(function () {
            saxophon.pause();
            saxophon.currentTime = 0;
          }, 1000);
        } else if (sound === "guitar") {
          guitar.play();
          setTimeout(function () {
            guitar.pause();
            guitar.currentTime = 0;
          }, 1000);
        } else if (sound === "violine") {
          violine.play();
          setTimeout(function () {
            violine.pause();
            violine.currentTime = 0;
          }, 1000);
        }
      },
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: jsPsych.timelineVariable("Anweisung"),
      choices: "NO_KEYS",
      trial_duration: 800,
      css_classes: ["stimulus-large-text"],
    },
  ],
  timeline_variables: Beispiel,
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

const testdurchgang_trial = {
  timeline: [
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style="font-size: 60px;">+</div>',
      choices: "NO_KEYS",
      trial_duration: 500,
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: jsPsych.timelineVariable("Wort"),
      choices: "NO_KEYS",
      trial_duration: 1000,
      stimulus_duration: 1000,
      css_classes: ["stimulus-large-text"],
      on_load: function () {
        const sound = jsPsych.evaluateTimelineVariable("sound");
        if (sound === "piano") {
          piano.play();
          setTimeout(function () {
            piano.pause();
            piano.currentTime = 0;
          }, 1000);
        } else if (sound === "saxophon") {
          saxophon.play();
          setTimeout(function () {
            saxophon.pause();
            saxophon.currentTime = 0;
          }, 1000);
        } else if (sound === "guitar") {
          guitar.play();
          setTimeout(function () {
            guitar.pause();
            guitar.currentTime = 0;
          }, 1000);
        } else if (sound === "violine") {
          violine.play();
          setTimeout(function () {
            violine.pause();
            violine.currentTime = 0;
          }, 1000);
        }
      },
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: jsPsych.timelineVariable("Anweisung"),
      choices: "NO_KEYS",
      trial_duration: 800,
      css_classes: ["stimulus-large-text"],
    },
  ],
  timeline_variables: testdurchgang,
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

const freeRecallWoerter = {
  type: freeRecall,
  prompt:
    "Geben Sie die Wörter ein und bestätigen Sie Ihre Eingabe mit der Enter-Taste.",
  button_label: "Fertig",
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

// Cued-Recall Phase
const cuedRecallTrial = {
  type: cuedRecall,
  prompt:
    "Vervollständigen sie das Wort und bestätigen sie ihre Eingabe mit der Enter-Taste.",
  button_label: "Fertig",
  string_to_display: ["Wein", "Tropfen", "Arbeit", "Tür", "Banane", "Kälte"],
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

const extinction_phase = {
  timeline: [
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style="font-size: 60px;">+</div>',
      choices: "NO_KEYS",
      trial_duration: 500,
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: jsPsych.timelineVariable("Wort"),
      choices: "NO_KEYS",
      trial_duration: 1000,
      stimulus_duration: 1000,
      css_classes: ["stimulus-large-text"],
      on_load: function () {
        const sound = jsPsych.evaluateTimelineVariable("sound");
        if (sound === "piano") {
          piano.play();
          setTimeout(function () {
            piano.pause();
            piano.currentTime = 0;
          }, 1000);
        } else if (sound === "saxophon") {
          saxophon.play();
          setTimeout(function () {
            saxophon.pause();
            saxophon.currentTime = 0;
          }, 1000);
        } else if (sound === "guitar") {
          guitar.play();
          setTimeout(function () {
            guitar.pause();
            guitar.currentTime = 0;
          }, 1000);
        } else if (sound === "violine") {
          violine.play();
          setTimeout(function () {
            violine.pause();
            violine.currentTime = 0;
          }, 1000);
        }
      },
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: jsPsych.timelineVariable("Anweisung"),
      choices: "NO_KEYS",
      trial_duration: 800,
      css_classes: ["stimulus-large-text"],
    },
  ],
  timeline_variables: Stimuli,
  randomize_order: false,
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

// Timeline
timeline.push(preload);
timeline.push(preloadSounds);
timeline.push(CBC_VPNNummer);
timeline.push(instructions);
timeline.push(beispiel);
timeline.push(instructions_2);
timeline.push(instructions_3);
timeline.push(testdurchgang_trial);
timeline.push(instructions_4);
timeline.push(freeRecallWoerter);
timeline.push(instructions_5);
timeline.push(cuedRecallTrial);
timeline.push(instructions_6);
timeline.push(extinction_phase);
timeline.push(Debriefing);
