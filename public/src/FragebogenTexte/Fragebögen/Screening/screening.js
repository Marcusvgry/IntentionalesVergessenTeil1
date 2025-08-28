// When selecting from multiple options, participants can often choose the option "other", which usually
// needs further specification, i.e., a text field needs to pop up etc., which is handled by this function
function checkOther(
  val,
  comparison,
  div_id = null,
  text_ids = null,
  select_ids = null
) {
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
        elements.forEach((el) => {
          el.value = "";
          el.removeAttribute("required");
        });
      }
    }
  }

  // Handle text fields
  if (text_ids) {
    text_ids.forEach((id) => {
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
    select_ids.forEach((id) => {
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

/* function checkOther(val, comparison, div_id, text_id, select_id) {
    text_field = document.getElementById(text_id);
    if (typeof select_field !== "undefined" && select_field != null) select_field = document.getElementById(select_id);
  
    if (comparison.includes(val)) {
      if (typeof div_id !== "undefined" && div_id != null) document.getElementById(div_id).style.display = "block";
      text_field.style.display = "block";
      text_field.setAttribute('required','required');
      if (typeof select_field !== "undefined" && select_field != null) select_field.setAttribute('required','required');
    } else {
      if (typeof div_id !== "undefined" && div_id != null) document.getElementById(div_id).style.display = "none";
      text_field.style.display = "none";
      text_field.removeAttribute('required');
      text_field.value = "";
      if (typeof select_field !== "undefined" && select_field != null) select_field.removeAttribute('required');
      if (typeof select_field !== "undefined" && select_field != null) select_field.value = "";
    }
  }; */

var screening = {
  type: jsPsychSurveyHtmlForm,
  html: () => text_screening,

  button_label: () => cont_text,
  data: { trial: "screening" },

  on_finish: function (data) {
    // Needs to be stringified, because arrays cannot be saved in a .csv file.
    data.response = JSON.stringify(data.response);
  },
};

var timeline = [screening];
