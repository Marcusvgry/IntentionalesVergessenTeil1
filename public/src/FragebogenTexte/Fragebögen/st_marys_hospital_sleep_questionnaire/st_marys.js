// When selecting from multiple options, participants can often choose the option "other", which usually 
// needs further specification, i.e., a text field needs to pop up etc., which is handled by this function
function checkOther(val, comparison, div_id = null, text_ids = null, select_ids = null) {
  // Normalize to arrays
  if (text_ids && !Array.isArray(text_ids)) text_ids = [text_ids];
  if (select_ids && !Array.isArray(select_ids)) select_ids = [select_ids];

  const showExtraFields = comparison.includes(val);

  // Show/hide additional div if applicable
  if (div_id) {
    const div = document.getElementById(div_id);
    if (div) {
      div.style.display = showExtraFields ? "block" : "none";

      // If hiding: clear all inputs and selects inside the div
      if (!showExtraFields) {
        const elements = div.querySelectorAll("input, select, textarea");
        elements.forEach(el => {
          el.value = "";
          el.removeAttribute("required");
        });
      }
    }
  }

  // Handle text fields
  if (text_ids) {
    text_ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.style.display = showExtraFields ? "block" : "none";
        if (showExtraFields) {
          el.setAttribute("required", "required");
        } else {
          el.removeAttribute("required");
          el.value = "";
        }
      }
    });
  }

  // Handle select fields
  if (select_ids) {
    select_ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (showExtraFields) {
          el.setAttribute("required", "required");
        } else {
          el.removeAttribute("required");
          el.value = "";
        }
      }
    });
  }
}

var stMarys = {
  type: jsPsychSurveyHtmlForm,
  preamble: () => st_marys_premable,
  html: () => st_marys_text,
  button_label: () => cont_text,
  data: { trial: 'st_marys' },
  on_finish: (data) => {
    // Needs to be stringified, because arrays cannot be saved in a .csv file.
    data.response = JSON.stringify(data.response);
  }
};

const timeline = [stMarys];