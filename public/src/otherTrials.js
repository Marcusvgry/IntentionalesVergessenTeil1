const preloadSounds = {
  type: jsPsychPreload,
  audio: [
    soundFiles.guitar,
    soundFiles.piano,
    soundFiles.saxophon,
    soundFiles.violine,
  ],
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
