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
timeline.push({
  type: jsPsychFullscreen,
  fullscreen_mode: true,
});
timeline.push(preloadSounds);
timeline.push(CBC_VPNNummer);
timeline.push(instructions);
timeline.push(
  createLearningPhase(
    wordListExample,
    listToRemember,
    selected_tmrsound,
    selected_tmfsound,
    selected_rsound,
    selected_fsound,
    false
  )
);
timeline.push(instructions_2);
timeline.push(instructions_3);
timeline.push(
  createLearningPhase(
    wordListTest,
    listToRemember,
    selected_tmrsound,
    selected_tmfsound,
    selected_rsound,
    selected_fsound,
    false
  )
);
timeline.push(instructions_4);
timeline.push(freeRecallWoerter);
timeline.push(instructions_5);
timeline.push(cuedRecallTrial);
timeline.push(instructions_6);
timeline.push(
  createLearningPhase(
    wordList,
    listToRemember,
    selected_tmrsound,
    selected_tmfsound,
    selected_rsound,
    selected_fsound,
    true
  )
);
timeline.push(Debriefing);
