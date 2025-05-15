// Initialisierung von jsPsych und der Timeline
var timeline = [];
const jsPsych = initJsPsych({
    on_finish: function () {
        // VPN-Nummer speichern
        const responses = jsPsych.data.get().filter({trial_type: 'survey-html-form'}).values()[0].response;
        const vpnNumber = responses["VPN-Nummer"];

        // Dateiname erstellen
        const filename = `IntentionalesVergessen1_VP${vpnNumber}.csv`;

        // Daten als CSV speichern
        jsPsych.data.get().localSave("csv", filename);
    }
});

function startExperiment() {
    jsPsych.run(timeline);
}

// Variablen
var freeRecallList = [];

// Preload
var preload = {
    type: jsPsychPreload,
    auto_preload: true
};

// Wörterlisten

var Beispiel = [
    {Wort: "Sonne", Anweisung: "EEE"},
    {Wort: 'Rose', Anweisung: "VVV"},
];

var testdurchgang = [
    { Wort: "Prinz",   Anweisung: "VVV" },
    { Wort: "Tropfen", Anweisung: "EEE" },
    { Wort: "Arbeit",  Anweisung: "EEE" },
    { Wort: "Hase",    Anweisung: "VVV" },
    { Wort: "Wein",    Anweisung: "EEE" },
    { Wort: "Montag",  Anweisung: "VVV" },
    { Wort: "Herd",    Anweisung: "VVV" },
    { Wort: "Kälte",   Anweisung: "EEE" },
    { Wort: "Kabel",   Anweisung: "VVV" },
    { Wort: "Banane",  Anweisung: "EEE" },
    { Wort: "Tür",     Anweisung: "EEE" },
    { Wort: "Uhr",     Anweisung: "VVV" }
  ];
  

  var Bedingung_1 = [ 
    "Auto", "Baden", "Berg", "Blut", 
    "Boden", "Brett", "Dampf", "Ecke", 
    "Erde", "Gift", "Grab", "Haut", 
    "Hose", "Seil", "Tier", "Vieh" 
  ];
  
  var Bedingung_2 = [ 
    "Allee", "Apfel", "Buch", "Wald", 
    "Eisen", "Fluss", "Geld", "Gold", 
    "Heer", "Kalk", "Kind", "Luft", 
    "Meer", "Moor", "Ofen", "Pelz" 
  ];

var Stimuli = [];

timeline.push({
    type: jsPsychFullscreen,
    fullscreen_mode: true
  });

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
        <label for="Bedingung1" class="condition-label">1</label>
        <input type="radio" id="Bedingung1" name="Bedingung" value="1" required class="condition-radio-input"/>
        <label for="Bedingung2" class="condition-label">2</label>
        <input type="radio" id="Bedingung2" name="Bedingung" value="2" required class="condition-radio-input"/>
    </div>
    
</div>
`,
    on_finish: function (data) {
        const responses = data.response;
        selectedCondition = responses["Bedingung"];
        if (selectedCondition === "1") {
            // Bedingung 1
            for (let i in Bedingung_1) {
                Stimuli.push({ Wort: Bedingung_1[i], Anweisung: "EEE" });
            }
            for (let i in Bedingung_2) {
                Stimuli.push({ Wort: Bedingung_2[i], Anweisung: "VVV" });
            }
        } else if (selectedCondition === "2") {
            // Bedingung 2
            for (let i in Bedingung_1) {
                Stimuli.push({ Wort: Bedingung_1[i], Anweisung: "VVV" });
            }
            for (let i in Bedingung_2) {
                Stimuli.push({ Wort: Bedingung_2[i], Anweisung: "EEE" });
            }
        }
    }
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
        <p> Zwischen der Lernphase für die Wörter und dem Gedächtnistest wird eine kurze Allgemeinwissensaufgabe zu bearbeiten sein. </p>  
        </div>`,
        `<div class="instructions">
        <p> Von den Wörtern, die Ihnen gleich im Lerndurchgang gezeigt werden, sollen nur bestimmte Wörter gelernt werden. </p>
        <p> Folgt auf ein Wort die Buchstabenkombination "EEE" sollen Sie sich später an das vorangegangene Wort erinnern (E = erinnern). </p>
        <p> Erscheint nach einem Wort die Buchstabenkombination "VVV" sollen Sie sich das vorangegangene Wort bitte NICHT merken, sondern direkt wieder vergessen (V = vergessen). </p>
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
            trial_duration: 500
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: jsPsych.timelineVariable('Wort'),
            choices: "NO_KEYS",
            trial_duration: 1000,
            stimulus_duration: 1000,
            css_classes: ['stimulus-large-text']  
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: jsPsych.timelineVariable('Anweisung'),
            choices: "NO_KEYS",
            trial_duration: 800,
            css_classes: ['stimulus-large-text']  
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
            trial_duration: 500
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: jsPsych.timelineVariable('Wort'),
            choices: "NO_KEYS",
            trial_duration: 1000,
            stimulus_duration: 1000,
            css_classes: ['stimulus-large-text']  
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: jsPsych.timelineVariable('Anweisung'),
            choices: "NO_KEYS",
            trial_duration: 800,
            css_classes: ['stimulus-large-text']  
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
    prompt: "Geben Sie die Wörter ein und bestätigen Sie Ihre Eingabe mit der Enter-Taste.",
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
    prompt: "Vervollständigen sie das Wort und bestätigen sie ihre Eingabe mit der Enter-Taste.",
    button_label: "Fertig",
    string_to_display:  ["Wein", "Tropfen", "Arbeit", "Tür", "Banane", "Kälte"],
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
            trial_duration: 500
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: jsPsych.timelineVariable('Wort'),
            choices: "NO_KEYS",
            trial_duration: 1000,
            stimulus_duration: 1000,
            css_classes: ['stimulus-large-text']  
        },
        {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: jsPsych.timelineVariable('Anweisung'),
            choices: "NO_KEYS",
            trial_duration: 800,
            css_classes: ['stimulus-large-text']  
        },
    ],
    timeline_variables: Stimuli,
    randomize_order: true
};



// Hilfsfunktion zur Bestimmung des Zeittexts basierend auf der selektierten Bedingung
const getZeitText = (condition) => {
    switch (condition) {
      case "1":
        return "heute Abend";
      case "2":
        return "morgen früh";
      default:
        return "[unbekannte Zeit]";
    }
  };
  
const Debriefing = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        const zeitText = getZeitText(selectedCondition);
        return `
            <div class="instructions">
                <p>Die Lernphase ist nun abgeschlossen.</p>
                <p>Wir werden Sie ${zeitText} bitten, die Wörter, denen ein EEE folgte, aus dem Gedächtnis abzurufen.</p>
            </div>
        `;
    },
    choices: ['ArrowDown'],
}
  

// Timeline
timeline.push(preload);
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
