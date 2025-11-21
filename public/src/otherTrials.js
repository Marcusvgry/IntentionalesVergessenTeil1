const preloadSounds = {
  type: jsPsychPreload,
  audio: [
    soundFiles.sound1,
    soundFiles.sound2,
    soundFiles.sound3,
    soundFiles.sound4,
    soundFiles.sound5,
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

  <p>Erinnert + Reaktiviert</p>
  <select name="Erinnert + Reaktiviert" id="Erinnert + Reaktiviert" required class="condition-select">
    <option value=""  –</option>
    <option value="1">Sound 1</option>
    <option value="2">Sound 2</option>
    <option value="3">Sound 3</option>
    <option value="4">Sound 4</option>
    <option value="5">Sound 5</option>
  </select>

  <p>Vergessen + Reaktiviert</p>
  <select name="Vergessen + Reaktiviert" id="Vergessen + Reaktiviert" required class="condition-select">
    <option value=""  –</option>
    <option value="1">Sound 1</option>
    <option value="2">Sound 2</option>
    <option value="3">Sound 3</option>
    <option value="4">Sound 4</option>
    <option value="5">Sound 5</option>
  </select>

  <p>Erinnert + Nicht-Reaktiviert</p>
  <select name="Erinnert + Nicht-Reaktiviert" id="Erinnert + Nicht-Reaktiviert" required class="condition-select">
    <option value=""  –</option>
    <option value="1">Sound 1</option>
    <option value="2">Sound 2</option>
    <option value="3">Sound 3</option>
    <option value="4">Sound 4</option>
    <option value="5">Sound 5</option>
  </select>

  <p>Vergessen + Nicht-Reaktiviert</p>
  <select name="Vergessen + Nicht-Reaktiviert" id="Vergessen + Nicht-Reaktiviert" required class="condition-select">
    <option value=""  –</option>
    <option value="1">Sound 1</option>
    <option value="2">Sound 2</option>
    <option value="3">Sound 3</option>
    <option value="4">Sound 4</option>
    <option value="5">Sound 5</option>
  </select>

  <p>Unasoziierter Ton</p>
  <select name="Unasoziierter Ton" id="Unasoziierter Ton" required class="condition-select">
    <option value=""  –</option>
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
    selected_tmrsound = responses["Erinnert + Reaktiviert"];
    selected_tmfsound = responses["Vergessen + Reaktiviert"];
    selected_rsound = responses["Erinnert + Nicht-Reaktiviert"];
    selected_fsound = responses["Vergessen + Nicht-Reaktiviert"];
    selected_sound5 = responses["Unasoziierter Ton"];
    selectedCondition = responses["Wortliste"];
    confidenceCheckTonesTimeline.timeline_variables =
      buildConfidenceToneTimelineVariables();
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
  string_to_display: cuedRecallTestList,
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
  trial_duration: 2500,
  on_start: function (trial) {
    trial.stimulus = resolveUnrelatedSoundStimulus();
  },
};

const playUnrelatedSoundTimeline = {
  timeline: [playUnrelatedSound],
  repetitions: 12,
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
            </div>
        `;
  },
  choices: ["ArrowDown"],
};
