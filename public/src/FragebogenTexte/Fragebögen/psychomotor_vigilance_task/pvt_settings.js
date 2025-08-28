const default_background = "#fff"

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

/* If participants fail the three practice trials twice (less than 2 out of 3 correct), 
the practice phase counts as failed. They are able to continue to the main task, but 
a note will be made in the data. Thresholds are defined as follows (in ms). We usually use 
these thresholds for exclusions (more than 20% lapses or 20% prematures). Note that 
for final analysis, 500 ms count as lapse (we defined exclusions more lenient on purpose). */
var lapse_time = 1000;
var premature_time = 100;

// Minimum and maximum waiting interval (ITI when the stopwatch is not counting up).
var min_wait = 2000;
var max_wait = 10000;
