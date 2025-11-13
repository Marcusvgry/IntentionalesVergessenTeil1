var listToRemember,
  selected_tmrsound,
  selected_tmfsound,
  selected_rsound,
  selected_fsound,
  selected_sound5;

const soundFiles = {
  sound1: "../sounds/tone_A.wav",
  sound2: "../sounds/tone_B.wav",
  sound3: "../sounds/tone_C.wav",
  sound4: "../sounds/tone_D.wav",
  sound5: "../sounds/tone_E.wav",
};

selected_sound5 = soundFiles.sound5;

var sound1 = new Audio(soundFiles.sound1);
var sound2 = new Audio(soundFiles.sound2);
var sound3 = new Audio(soundFiles.sound3);
var sound4 = new Audio(soundFiles.sound4);
var sound5 = new Audio(soundFiles.sound5);
var settingsDone = false;

const cont_text = "Weiter";
const prev_text = "zurück";

// PVT

const default_background = "#fff";

const pvt_time_limit = 3 * 60000; // Task duration: 3 min
let pvt_start;

// Counting how many (practice) trials were valid.
var pvt_lapse_count = 0;
// only collects early responses during stopwatch trials, not during ITI
var pvt_premature_stopwatch_count = 0;
// only collects responses during the ITI, not during the stopwatch trials
var pvt_premature_iti_count = 0;
var repeat_practice = false;
var pvt_practice_round_counter = 0;
var pvt_practice_trial_counter = 0;
let pvt_failed_practice;
let n_practice_trials = 3;
let practice_correct_threshold = 2;
let max_practice_rounds = 2;

// Minimum and maximum waiting interval (ITI when the stopwatch is not counting up).
var min_wait = 2000;
var max_wait = 10000;

let psqi_components = {
  PSQIDURAT: null,
  PSQIDISTB: null,
  PSQILATEN: null,
  PSQIDAYDYS: null,
  PSQIHSE: null,
  PSQISLPQUAL: null,
  PSQIMEDS: null,
};

const EXCLUSION_CONFIG = {
  exclusionCriteria: {
    // Demografie
    age: "<18|>35",

    // Lebenssituation (braucht Rücksprache/VL)
    living_situation: "betreut|heim|jva|wohnungslos",

    // Sprache
    fluency: "=no",

    // Zyklus/Schwangerschaft
    pregnancy: "ja",

    // Substanzen heute/gestern
    drugs_today:
      "ja|/\\b(thc|cannabis|cocaine|kokain|mdma|amphet|opiat|benzodiazepin|z-?drug|ketamin)\\b/i",
    alcohol_today: "ja",
    alcohol_yesterday: "ja", // optional nur soft (s.u.)
    smoking_today: "ja", // i.d.R. soft; harte Rule z.B. späte Uhrzeit
    caffeine_time: "/^(1[6-9]|2[0-3]):/", // Koffein nach 16:00 (24h), harte Zeitnähe

    // Medikamente (psychoaktiv/schlafwirksam)
    medication_what:
      "/(ssri|snri|trizykl|tca|maoi|mirtaz|buprop|antipsych|neurolept|benzodiaz|zopiclone?|zolpidem|pregabalin|gabapentin|modafinil|methylphenidat|atomoxetin|beta.?block)/i",
    medication_today: "ja", // markiert „Medis aktuell“ (Details s.o.)

    // Schlaf / Tagesrhythmus
    wake_time: "/^(1[2-9]|2[0-3]):/", // Aufstehen ≥12:00 → eher ungünstig
    sleep_quality: "1|2", // sehr/ziemlich schlecht
    sleep_change: "ja",
    recent_stress: "ja",

    // (falls rechtshändig benötigt)
    handedness: "links|beid",
  },
  softHardMap: {
    age: "hard",
    living_situation: "hard",
    fluency: "hard",
    pregnancy: "hard",
    drugs_today: "hard",
    alcohol_today: "hard",
    alcohol_yesterday: "soft",
    smoking_today: "soft",
    caffeine_time: "hard",
    medication_what: "hard",
    medication_today: "soft",
    wake_time: "soft",
    sleep_quality: "soft",
    sleep_change: "soft",
    recent_stress: "soft",
    handedness: "soft",
  },
};

const toNum = (v) => Number(String(v ?? "").replace(",", "."));
