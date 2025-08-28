// SETTINGS ----------------------------------------------------------------------------------------------

/* "p" or "m" for letter but in principle, you could choose whatever letter you like */
const verbal_fluency_cue = "p"
const verbal_fluency_duration = 2 * 60000; // 2 min

let verbal_fluency_start;

// TRIALS -----------------------------------------------------------------------------------------------

var rwt_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => rwt_instructions_text(verbal_fluency_cue),
  choices: () => [cont_text],
  data: { trial: 'rwt_instructions' },
  on_finish: () => verbal_fluency_start = + new Date()
};

var verbal_fluency = {
  on_load: () => {
    // Auto focus input field
    let inputField = document.getElementById('verbal-fluency');
    inputField.focus();
  },
  type: jsPsychSurveyHtmlForm,
  /* Dynamically adjust trial duration to remaining time; ensures the trial will end in time even 
  when no response is made. */
  trial_duration: () => verbal_fluency_duration - (+ new Date() - verbal_fluency_start),
  html: () => rwt_trial_text(verbal_fluency_cue),
    button_label: 'ok',
    data: { trial: 'verbal_fluency'},
    on_finish: function(data) {
        // Clean response
        data.response = data.response['verbal-fluency'];
        data.verbal_fluency_cue = verbal_fluency_cue;
    }
};

// Run until time is up
var verbal_fluency_loop = {
    timeline: [verbal_fluency],
    loop_function: () => (+ new Date() - verbal_fluency_start) < verbal_fluency_duration
};

const timeline = [rwt_instructions, verbal_fluency_loop]
