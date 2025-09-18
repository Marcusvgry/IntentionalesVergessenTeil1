// --- jsPsych init & Datenspeicherung am Ende ---
var timeline = [];

const jsPsych = initJsPsych({
  use_webaudio: false,
  on_finish: function () {
    try {
      const vpnForm =
        jsPsych.data.get().filter({ form_id: "vpn" }).last(1).values()[0] ||
        jsPsych.data
          .get()
          .filter({ trial_type: "survey-html-form" })
          .first(1)
          .values()[0];

      const responses = vpnForm && vpnForm.response ? vpnForm.response : null;

      if (responses && responses["Participant-ID"]) {
        const vpnNumber = responses["Participant-ID"];
        const filename = `DirFor1_VP${vpnNumber}.csv`;
        jsPsych.data.get().localSave("csv", filename);
      } else {
        jsPsych.data.get().localSave("csv", "DirFor1_NoVPN.csv");
      }
    } catch (error) {
      console.error("Error in on_finish:", error);
      jsPsych.data.get().localSave("csv", "DirFor1_Error.csv");
    }
  },
});

// --- Baut den Rest NACH dem VPN-Trial an ---
const buildFromVPNTrial = {
  type: jsPsychCallFunction, // bei ESM: type: callFunction
  async: true,
  func: (done) => {
    const proceed = () => {
      const vpnData =
        jsPsych.data.get().filter({ form_id: "vpn" }).last(1).values()[0] ||
        jsPsych.data
          .get()
          .filter({ trial_type: "survey-html-form" })
          .last(1)
          .values()[0];

      const resp = vpnData && vpnData.response ? vpnData.response : {};

      const listToRemember = resp["Wortliste"] || "1";
      const selected_tmrsound = resp["AuswahlSound1"] || "Sound 1";
      const selected_tmfsound = resp["AuswahlSound2"] || "Sound 2";
      const selected_rsound = resp["AuswahlSound3"] || "Sound 3";
      const selected_fsound = resp["AuswahlSound4"] || "Sound 4";

      jsPsych.data.addProperties({
        listToRemember,
        selected_tmrsound,
        selected_tmfsound,
        selected_rsound,
        selected_fsound,
      });

      const rest = [
        //demographics_block,
        preloadSounds,
        instructions,
        createLearningPhase(
          wordListExample,
          listToRemember,
          selected_tmrsound,
          selected_tmfsound,
          selected_rsound,
          selected_fsound,
          false
        ),
        instructions_2,
        instructions_3,
        createLearningPhase(
          wordListTest,
          listToRemember,
          selected_tmrsound,
          selected_tmfsound,
          selected_rsound,
          selected_fsound,
          false
        ),
        instructions_4,
        freeRecallWoerter,
        instructions_5,
        cuedRecallTrial,
        instructions_6,
        createLearningPhase(
          wordList,
          listToRemember,
          selected_tmrsound,
          selected_tmfsound,
          selected_rsound,
          selected_fsound,
          true
        ),
        pvt_start_screen,
        pvt_practice_outer,
        pvt_main_instructions,
        pvt_core,
        pvt_end_screen,
        stanfordSleepiness,
        pittsburgh1,
        pittsburgh2,
        meq_instructions,
        mornEveItem1,
        mornEveItem7,
        mornEveItem10,
        mornEveItem18,
        mornEveItem19,
        Debriefing,
      ];

      // *** FIX FÜR v8: statt jsPsych.addNodeToEndOfTimeline(...) ***
      timeline.push(...rest); // oder: timeline.push(rest) für einen verschachtelten Block

      done(); // beendet den call-function-Trial
    };

    if (settingsDone && typeof settingsDone.then === "function") {
      settingsDone.then(proceed).catch((e) => {
        console.error(e);
        proceed();
      });
    } else {
      proceed();
    }
  },
};

// --- Starte mit fixen ersten Schritten; der Rest kommt dynamisch danach ---
function createTimeline() {
  timeline.length = 0;
  timeline.push(
    playUnrelatedSound,
    {
      ...CBC_VPNNummer,
      data: { ...(CBC_VPNNummer.data || {}), form_id: "vpn" },
    },
    /*
    demographics_block
    */
    buildFromVPNTrial
  );
}
