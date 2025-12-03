const preloadSounds = {
  type: jsPsychPreload,
  audio: [
    soundFiles.sound1,
    soundFiles.sound2,
    soundFiles.sound3,
    soundFiles.sound4,
    soundFiles.sound5,
    soundFiles.bsp_e,
    soundFiles.bsp_v,
  ],
  show_progress_bar: false,
};

// Erste Instruktionen
const CBC_VPNNummer = {
  type: jsPsychSurveyHtmlForm,
  preamble: ``,
  html: `
        <style>
          .cbc-form { width: 100%; max-width: 1100px; margin: 0 auto; }
          .cbc-row { display: flex; gap: 16px; flex-wrap: wrap; }
          .cbc-row .field { flex: 1 1 260px; min-width: 220px; }
          .cbc-grid { display: grid; grid-template-columns: repeat(4, minmax(220px, 1fr)); gap: 16px; margin-top: 16px; }
          .cbc-grid .title { font-weight: bold; text-align: center; }
          .cbc-grid .cell label { display: block; margin-bottom: 4px; text-align: center; }
          .cbc-grid .cell select { width: 100%; }
        </style>
        <div class="survey-container cbc-form">
    <div class="cbc-row">
      <div class="field">
        <p>Probandennummer</p>
        <input type="number" id="Probandennummer" name="Probandennummer" required class="input-field"/>
      </div>
      <div class="field">
        <p>Heutiges Datum</p>
        <input type="date" id="Heutiges-Datum" name="Heutiges-Datum" required class="input-field"/>
      </div>
      <div class="field">
        <p>Name der Messperson</p>
        <input type="text" id="Name-der-Messperson" name="Name-der-Messperson" required class="input-field"/>
      </div>
    </div>

    <div class="cbc-grid">
      <div class="title">Erinnert + Reaktiviert</div>
      <div class="title">Vergessen + Reaktiviert</div>
      <div class="title">Erinnert + Nicht-Reaktiviert</div>
      <div class="title">Vergessen + Nicht-Reaktiviert</div>

      <div class="cell">
        <label for="Erinnert-Reaktiviert-Ton">Ton</label>
        <select name="Erinnert + Reaktiviert Ton" id="Erinnert-Reaktiviert-Ton" required class="condition-select">
          <option value="">-</option>
          <option value="1">Sound 1</option>
          <option value="2">Sound 2</option>
          <option value="3">Sound 3</option>
          <option value="4">Sound 4</option>
        </select>
      </div>
      <div class="cell">
        <label for="Vergessen-Reaktiviert-Ton">Ton</label>
        <select name="Vergessen + Reaktiviert Ton" id="Vergessen-Reaktiviert-Ton" required class="condition-select">
          <option value="">-</option>
          <option value="1">Sound 1</option>
          <option value="2">Sound 2</option>
          <option value="3">Sound 3</option>
          <option value="4">Sound 4</option>
        </select>
      </div>
      <div class="cell">
        <label for="Erinnert-NichtReaktiviert-Ton">Ton</label>
        <select name="Erinnert + Nicht-Reaktiviert Ton" id="Erinnert-NichtReaktiviert-Ton" required class="condition-select">
          <option value="">-</option>
          <option value="1">Sound 1</option>
          <option value="2">Sound 2</option>
          <option value="3">Sound 3</option>
          <option value="4">Sound 4</option>
        </select>
      </div>
      <div class="cell">
        <label for="Vergessen-NichtReaktiviert-Ton">Ton</label>
        <select name="Vergessen + Nicht-Reaktiviert Ton" id="Vergessen-NichtReaktiviert-Ton" required class="condition-select">
          <option value="">-</option>
          <option value="1">Sound 1</option>
          <option value="2">Sound 2</option>
          <option value="3">Sound 3</option>
          <option value="4">Sound 4</option>
        </select>
      </div>

      <div class="cell">
        <label for="Erinnert-Reaktiviert-Liste">Liste</label>
        <select name="Erinnert + Reaktiviert Liste" id="Erinnert-Reaktiviert-Liste" required class="condition-select">
          <option value="">-</option>
          <option value="1">Liste 1</option>
          <option value="2">Liste 2</option>
          <option value="3">Liste 3</option>
          <option value="4">Liste 4</option>
        </select>
      </div>
      <div class="cell">
        <label for="Vergessen-Reaktiviert-Liste">Liste</label>
        <select name="Vergessen + Reaktiviert Liste" id="Vergessen-Reaktiviert-Liste" required class="condition-select">
          <option value="">-</option>
          <option value="1">Liste 1</option>
          <option value="2">Liste 2</option>
          <option value="3">Liste 3</option>
          <option value="4">Liste 4</option>
        </select>
      </div>
      <div class="cell">
        <label for="Erinnert-NichtReaktiviert-Liste">Liste</label>
        <select name="Erinnert + Nicht-Reaktiviert Liste" id="Erinnert-NichtReaktiviert-Liste" required class="condition-select">
          <option value="">-</option>
          <option value="1">Liste 1</option>
          <option value="2">Liste 2</option>
          <option value="3">Liste 3</option>
          <option value="4">Liste 4</option>
        </select>
      </div>
      <div class="cell">
        <label for="Vergessen-NichtReaktiviert-Liste">Liste</label>
        <select name="Vergessen + Nicht-Reaktiviert Liste" id="Vergessen-NichtReaktiviert-Liste" required class="condition-select">
          <option value="">-</option>
          <option value="1">Liste 1</option>
          <option value="2">Liste 2</option>
          <option value="3">Liste 3</option>
          <option value="4">Liste 4</option>
        </select>
      </div>
    </div>

    <p>Unasoziierter Ton</p>
    <select name="Unasoziierter Ton" id="Unasoziierter Ton" required class="condition-select">
      <option value="">-</option>
      <option value="1">Sound 1</option>
      <option value="2">Sound 2</option>
      <option value="3">Sound 3</option>
      <option value="4">Sound 4</option>
      <option value="5">Sound 5</option>
    </select>

    
</div>
    
`,
  on_finish: function (data) {
    const responses = data.response;
    const toNumber = (val, fallback) => {
      const n = Number(val);
      return Number.isFinite(n) ? n : fallback;
    };

    selected_tmrsound = toNumber(responses["Erinnert + Reaktiviert Ton"], 1);
    selected_tmfsound = toNumber(responses["Vergessen + Reaktiviert Ton"], 2);
    selected_rsound = toNumber(
      responses["Erinnert + Nicht-Reaktiviert Ton"],
      3
    );
    selected_fsound = toNumber(
      responses["Vergessen + Nicht-Reaktiviert Ton"],
      4
    );
    selected_sound5 = toNumber(responses["Unasoziierter Ton"], 5);

    selected_tmr_list = toNumber(responses["Erinnert + Reaktiviert Liste"], 1);
    selected_tmf_list = toNumber(responses["Vergessen + Reaktiviert Liste"], 2);
    selected_r_list = toNumber(
      responses["Erinnert + Nicht-Reaktiviert Liste"],
      3
    );
    selected_f_list = toNumber(
      responses["Vergessen + Nicht-Reaktiviert Liste"],
      4
    );
    listToRemember = null;
    confidenceCheckTonesTimeline.timeline_variables =
      buildConfidenceToneTimelineVariables();
    settingsDone = true;
  },
};

const freeRecallWoerter = {
  type: freeRecall,
  prompt:
    'Geben Sie alle mit "EEE" markierten Wörter  ein und bestätigen Sie Ihre Eingaben mit der Enter-Taste.',
  button_label: "Fertig",
};

// Plays sound 5 12 times consecutively

const resolveUnrelatedSoundStimulus = () => {
  const selection = Number(selected_sound5);
  const key =
    Number.isFinite(selection) && selection >= 1 && selection <= 5
      ? `sound${selection}`
      : null;

  return (key && soundFiles[key]) || fallback;
};

const playUnrelatedSound = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: () => resolveUnrelatedSoundStimulus(),
  prompt: '<div style="font-size: 60px;">+</div>',

  choices: "NO_KEYS",
  trial_duration: 3500,
  on_start: function (trial) {
    trial.stimulus = resolveUnrelatedSoundStimulus();
  },
};

const playUnrelatedSoundTimeline = {
  timeline: [playUnrelatedSound],
  repetitions: 8,
};

const buildConfidenceToneTimelineVariables = () => [
  { tone_id: selected_tmrsound, number: 1 },
  { tone_id: selected_tmfsound, number: 2 },
  { tone_id: selected_rsound, number: 3 },
  { tone_id: selected_fsound, number: 4 },
];

const resolveToneSelectionToAudio = (toneVar) => {
  const createAudioFromKey = (key) => {
    if (!key || !soundFiles || !soundFiles[key]) {
      return null;
    }
    return new Audio(soundFiles[key]);
  };

  if (toneVar instanceof HTMLAudioElement) {
    return toneVar;
  }

  if (typeof toneVar === "number" && Number.isFinite(toneVar)) {
    return createAudioFromKey(`sound${toneVar}`);
  }

  if (typeof toneVar === "string") {
    const trimmed = toneVar.trim();
    if (!trimmed) {
      return null;
    }

    if (/\.(wav|mp3|ogg)$/i.test(trimmed)) {
      return new Audio(trimmed);
    }

    const lower = trimmed.toLowerCase();
    if (soundFiles && soundFiles[lower]) {
      return new Audio(soundFiles[lower]);
    }

    const numericMatch = lower.match(/^sound\s*(\d)$/) || lower.match(/^(\d)$/);
    if (numericMatch) {
      return createAudioFromKey(`sound${numericMatch[1]}`);
    }
  }

  return null;
};

// Trial für Confidence Check mit Ton
// Trial für Confidence Check mit Ton
const confidenceCheckTones = {
  type: jsPsychHtmlSliderResponse,
  stimulus: function () {
    return `
      <div class="instructions">
        <p>Wurde dieser Ton zusammen mit Wörtern abgespielt, die Sie erinnern oder vergessen sollten? Mit "Ton abspielen" können Sie sich den Ton erneut anhören, mit "Weiter" bestätigen Sie Ihre Antwort.</p>
        <select name="Tone" id="ListTone_${jsPsych.evaluateTimelineVariable(
          "number"
        )}" required class="condition-select">
          <option value="">-</option>
          <option value="1">Erinnern</option>
          <option value="2">Vergessen</option>
        </select>
        <br />
        <p>Wie sicher sind Sie sich?</p>
      </div>
    `;
  },
  labels: ["Sehr unsicher", "Sehr sicher"],
  button_label: "Weiter",
  prompt: `
    <div class="tone-controls">
      <button type="button" id="play-tone-btn" class="jspsych-btn secondary-btn">
        Ton abspielen
      </button>
    </div>
  `,
  on_load: function () {
    const toneVar = jsPsych.evaluateTimelineVariable("tone_id");
    console.log("tone_id in this trial:", toneVar, "typeof:", typeof toneVar);

    let audio = resolveToneSelectionToAudio(toneVar);
    if (audio) {
      console.log("Resolved tone selection to audio element:", audio);
    } else {
      const elementId = `audio-${toneVar}`;
      audio = document.getElementById(elementId);
      console.log("Trying DOM audio element with id:", elementId, audio);
    }

    const playTone = () => {
      if (!audio || typeof audio.play !== "function") {
        console.error("Audio element not found or not playable:", audio);
        return;
      }

      // Zur Sicherheit zurücksetzen und dann abspielen
      if (typeof audio.pause === "function") {
        audio.pause();
      }
      audio.currentTime = 0;

      audio.play().catch((err) => {
        console.error("Tone playback error:", err);
      });
    };

    const playBtn = document.getElementById("play-tone-btn");
    if (playBtn) {
      playBtn.addEventListener("click", playTone);
    }

    // Beim Laden des Trials direkt einmal abspielen
    playTone();
  },
};

// Timeline für alle Confidence-Ton-Trials
const confidenceCheckTonesTimeline = {
  timeline: [confidenceCheckTones],
  timeline_variables: buildConfidenceToneTimelineVariables(),
  randomize_order: false,
};

const Debriefing = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return `
            <div class="instructions">
                <p>Die erste Teil der Studie ist nun abgeschlossen.</p>
                <p>Wir werden Sie morgen früh bitten, die Wörter, denen ein EEE folgte, aus dem Gedächtnis abzurufen.</p>
                <p> Wenden Sie sich nun bitte an die Versuchsleitung </p> 
                <p> Information an die Versuchsleitung: Daten speichern mit Pfeil-nach-unten Taste</p>
            </div>
        `;
  },
  choices: ["ArrowDown"],
};
