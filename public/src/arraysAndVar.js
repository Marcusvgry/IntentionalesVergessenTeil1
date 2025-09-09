var listToRemember,
  selected_tmrsound,
  selected_tmfsound,
  selected_rsound,
  selected_fsound;

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
