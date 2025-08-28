var stanfordSleepiness = {
  on_load: () => {
    // The last option is just for reference an cannot be clicked.
    // Here, we disable the radiobutton and make it grey.
    lastOption = document.getElementById("jspsych-survey-multi-choice-response-0-7")
    lastOption.disabled = true;
    lastOption.style.backgroundColor = "#9b9b9b"
  },
  type: jsPsychSurveyMultiChoice,
  questions: [{
    prompt: () => sss_prompt,
    name: 'stanford_sleepiness',
    options: () => sssOptions,
    required: true
  }],
  button_label: () => cont_text,
  data: { trial: 'stanford_sleepiness' },
  on_finish: function(data) {
    delete data.question_order;
    // Turn response into numeric score
    var sleepiness_string = data.response.stanford_sleepiness;
    var index = sssOptions.indexOf(sleepiness_string);
    // Convert to SSS score from 1 - 7
    data.response = index + 1;
  }
};

const timeline = [stanfordSleepiness];