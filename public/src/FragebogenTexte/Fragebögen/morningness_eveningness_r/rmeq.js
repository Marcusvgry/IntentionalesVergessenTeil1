var meq_instructions = {
  type: jsPsychHtmlButtonResponse,
  stimulus: () => meq_instr_text,
  choices: () => [cont_text],
  data: { trial: 'meq_instructions' }
};

// Items -----------------------------------------------------------------------------------------------

// Items are numbered according to Horne & Ostberg, 1976
var mornEveItem1 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: () => meq_1_text,
  min: 0,
  max: 28,
  steps: 1,
  slider_start: 0,
  labels: () => meq_labels1,
  require_movement: true,
  button_label: () => cont_text,
  data: {meq_item: 1, trial: "meq_item"},
  on_finish: function(data) {
    data.response_label = meq_labels1_data[data.response]
    // Calculate questionnaire score
    if (data.response <= 6) {
      data.meq_item_score = 5;
    } else if (data.response <= 11) {
      data.meq_item_score = 4;
    } else if (data.response <= 19) {
      data.meq_item_score = 3;
    } else if (data.response <= 24) {
      data.meq_item_score = 2;
    } else {
      data.meq_item_score = 1;
    }
  }
};

var mornEveItem7 = {
  type: jsPsychSurveyLikert,
  questions: [{
    prompt: () => meq_7_prompt, 
    labels: () => meq_7_labels,
    required: true
  }],
  data: {meq_item: 7, trial: "meq_item"},
  button_label: () => cont_text,
  on_finish: function(data) {
    // Clean up: Question order is not needed because it's only a single item
    delete data.question_order;
    data.response = data.response['Q0'];
    data.response_label = meq_7_labels[data.response];
    // Calculate score
    data.meq_item_score = data.response + 1;
  }
};

var mornEveItem10 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: () => meq_10_text,
  min: 0,
  max: 28,
  slider_start: 0,
  steps: 1,
  labels: meq_labels10,
  require_movement: true,
  button_label: () => cont_text,
  data: {meq_item: 10, trial: "meq_item"},
  on_finish: function(data) {
    data.response_label = meq_labels10_data[data.response]
    // Calculate questionnaire score
    if (data.response <= 4) {
      data.meq_item_score = 5;
    } else if (data.response <= 9) {
      data.meq_item_score = 4;
    } else if (data.response <= 19) {
      data.meq_item_score = 3;
    } else if (data.response <= 24) {
      data.meq_item_score = 2;
    } else {
      data.meq_item_score = 1;
    }
  }
};

var mornEveItem18 = {
  type: jsPsychHtmlSliderResponse,
  stimulus: () => meq_18_text,
  min: 0,
  max: 24,
  slider_start: 0,
  steps: 1,
  labels: () => meq_labels18,
  require_movement: true,
  button_label: () => cont_text,
  data: {meq_item: 18, trial: "meq_item"},
  on_finish: function(data) {
    data.response_label = meq_labels18_data[data.response]
    // Calculate questionnaire score
    if (data.response <= 4) {
      data.meq_item_score = 1;
    } else if (data.response <= 7) {
      data.meq_item_score = 5;
    } else if (data.response <= 9) {
      data.meq_item_score = 4;
    } else if (data.response <= 16) {
      data.meq_item_score = 3;
    } else if (data.response <= 21) {
      data.meq_item_score = 2;
    } else {
      data.meq_item_score = 1;
    }
  }
};

var mornEveItem19 = {
  type: jsPsychSurveyLikert,
  questions: [{
    prompt: () => meq_19_prompt, 
    labels: () => meq_19_labels,
    required: true
  }],
  button_label: () => cont_text,
  data: {meq_item: 19, trial: "meq_item"},
  on_finish: function(data) {
    delete data.question_order;
    data.response = data.response['Q0'];
    data.response_label = meq_19_labels[data.response];
    data.meq_item_score = Math.abs((data.response - 3)) * 2;

    // calculate total meq score
    let itemResponses = jsPsych.data.get().filterCustom(function(trial){
      return trial.trial === 'meq_item';
    });

    itemResponses = itemResponses.trials.map(({ meq_item_score }) => meq_item_score);
    const meq_score = itemResponses.reduce((a, b) => a + b, 0);

    data.meq_total_score = meq_score;

    let meq_type;
    
    if (meq_score >= 22) {
      meq_type = meq_types_en[0];
    } else if (meq_score >= 18) {
      meq_type = meq_types_en[1];
    } else if (meq_score >= 12) {
      meq_type = meq_types_en[2];
    } else if (meq_score >= 8) {
      meq_type = meq_types_en[3];;
    } else if (meq_score >= 4) {
      meq_type = meq_types_en[4];;
    }

    data.meq_type = meq_type;
  }
};

const timeline = [meq_instructions, mornEveItem1, mornEveItem7, mornEveItem10, mornEveItem18, mornEveItem19];
