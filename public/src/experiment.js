var timeline = [];
const jsPsych = initJsPsych({
  use_webaudio: false,
  on_finish: function () {
    const responses = jsPsych.data
      .get()
      .filter({ trial_type: "survey-html-form" })
      .values()[0].response;
    const vpnNumber = responses["VPN-Nummer"];
    const filename = `IntentionalesVergessen1_VP${vpnNumber}.csv`;
    jsPsych.data.get().localSave("csv", filename);
  },
});

timeline.push(preloadSounds);
timeline.push(demographics);
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
timeline.push(
  pvt_start_screen,
  pvt_practice_outer,
  pvt_main_instructions,
  pvt_core,
  pvt_end_screen
);
timeline.push(stanfordSleepiness);
timeline.push(pittsburgh1, pittsburgh2);
timeline.push(
  meq_instructions,
  mornEveItem1,
  mornEveItem7,
  mornEveItem10,
  mornEveItem18,
  mornEveItem19
);
timeline.push(Debriefing);
