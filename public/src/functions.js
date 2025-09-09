function startExperiment() {
  jsPsych.run(timeline);
}

/**
 * @param {Array<string>} list: Full list of Words
 * @param {number} rlist: List that will be remembered: 1 or 2
 * @param {number} tmrsound: Sound that is played alongside remember Words and is played during sleep (1, 2, 3, 4)
 * @param {number} tmfsound: Sound that is played alongside forget Words and is played during sleep (1, 2, 3, 4)
 * @param {number} rsound: Sound that is played alongside remember Words (1, 2, 3, 4)
 * @param {number} fsound: Sound that is played alongside forget Words (1, 2, 3, 4)
 * @returns {Array<Object>}: Array in the timelinevariable Format of {word: string, instruction: string, sound: int}
 */
function createWordLists(list, rlist, tmrsound, tmfsound, rsound, fsound) {
  var wordList = list;
  var length = wordList.length;
  var listcomplete = [];
  var listA = jsPsych.randomization.repeat(wordList.slice(0, length / 2), 1);
  var listB = jsPsych.randomization.repeat(
    wordList.slice(length / 2, length),
    1
  );

  if (rlist === 1) {
    var listA_tmrsound = listA.slice(0, length / 4);
    var listA_r = listA.slice(length / 4, length / 2);

    var listB_tmf = listB.slice(0, length / 4);
    var listB_f = listB.slice(length / 4, length / 2);

    for (let i = 0; i < length / 4; i++) {
      listcomplete.push({
        word: listA_tmrsound[i],
        instruction: "EEE",
        sound: tmrsound,
      });
      listcomplete.push({
        word: listA_r[i],
        instruction: "EEE",
        sound: rsound,
      });
      listcomplete.push({
        word: listB_tmf[i],
        instruction: "VVV",
        sound: tmfsound,
      });
      listcomplete.push({
        word: listB_f[i],
        instruction: "VVV",
        sound: fsound,
      });
    }
  } else if (rlist === 2) {
    var listA_tmf = listA.slice(0, length / 4);
    var listA_f = listA.slice(length / 4, length / 2);

    var listB_tmrsound = listB.slice(0, length / 4);
    var listB_r = listB.slice(length / 4, length / 2);

    for (let i = 0; i < length / 4; i++) {
      listcomplete.push({
        word: listA_tmf[i],
        instruction: "VVV",
        sound: tmfsound,
      });
      listcomplete.push({
        word: listA_f[i],
        instruction: "VVV",
        sound: fsound,
      });
      listcomplete.push({
        word: listB_tmrsound[i],
        instruction: "EEE",
        sound: tmrsound,
      });
      listcomplete.push({
        word: listB_r[i],
        instruction: "EEE",
        sound: rsound,
      });
    }
  }
  return listcomplete;
}

/**
 * @param {Array<Object>} stimuli: Array in the following format: {word: string, instruction: string, sound: int}
 * @returns {Array<Object>}: Shuffled array of stimuli with 3x "VVV" and 3x "EEE" in the first and last 6 positions
 */
function counteractPrimRecEffects(stimuli) {
  let poolVVV = stimuli.filter((s) => s.instruction === "VVV");
  let poolEEE = stimuli.filter((s) => s.instruction === "EEE");

  function sample(arr, n) {
    return jsPsych.randomization.sampleWithoutReplacement(arr, n);
  }

  let firstVVV = sample(poolVVV, 3);
  poolVVV = poolVVV.filter((s) => !firstVVV.includes(s));
  let firstEEE = sample(poolEEE, 3);
  poolEEE = poolEEE.filter((s) => !firstEEE.includes(s));
  let blockFirst = jsPsych.randomization.shuffle([...firstVVV, ...firstEEE]);

  let lastVVV = sample(poolVVV, 3);
  poolVVV = poolVVV.filter((s) => !lastVVV.includes(s));
  let lastEEE = sample(poolEEE, 3);
  poolEEE = poolEEE.filter((s) => !lastEEE.includes(s));
  let blockLast = jsPsych.randomization.shuffle([...lastVVV, ...lastEEE]);

  let blockMiddle = jsPsych.randomization.shuffle([...poolVVV, ...poolEEE]);

  return [...blockFirst, ...blockMiddle, ...blockLast];
}

/**
 * @param {Array<Object>} list: Array in the following format: {word: string, instruction: string, sound: int}
 * @param {number} rlist: List that will be remembered: 1 or 2
 * @param {number} tmrsound: Sound that is played alongside remember Words and is played during sleep (1, 2, 3, 4)
 * @param {number} tmfsound: Sound that is played alongside forget Words and is played during sleep (1, 2, 3, 4)
 * @param {number} rsound: Sound that is played alongside remember Words (1, 2, 3, 4)
 * @param {number} fsound: Sound that is played alongside forget Words (1, 2, 3, 4)
 * @param {boolean} counterPrimRec: Whether to counteract primacy and recency effects
 */
function createLearningPhase(
  list,
  rlist,
  tmrsound,
  tmfsound,
  rsound,
  fsound,
  counterPrimRec
) {
  var learningTimeline = [];
  if (counterPrimRec) {
    learningTimeline = counteractPrimRecEffects(learningTimeline);
  } else {
    learningTimeline = createWordLists(
      list,
      rlist,
      tmrsound,
      tmfsound,
      rsound,
      fsound
    );
    learningTimeline = jsPsych.randomization.shuffle(learningTimeline);
  }
  return {
    timeline: [
      {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div style="font-size: 60px;">+</div>',
        choices: "NO_KEYS",
        trial_duration: 500,
      },
      {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: jsPsych.timelineVariable("word"),
        choices: "NO_KEYS",
        trial_duration: 1200,
        stimulus_duration: 1200,
        css_classes: ["stimulus-large-text"],
        on_load: function () {
          const sound = jsPsych.evaluateTimelineVariable("sound");
          switch (sound) {
            case 1:
              piano.play();
              setTimeout(function () {
                piano.pause();
                piano.currentTime = 0;
              }, 1000);
              break;
            case 2:
              saxophon.play();
              setTimeout(function () {
                saxophon.pause();
                saxophon.currentTime = 0;
              }, 1000);
              break;
            case 3:
              guitar.play();
              setTimeout(function () {
                guitar.pause();
                guitar.currentTime = 0;
              }, 1000);
              break;
            case 4:
              violine.play();
              setTimeout(function () {
                violine.pause();
                violine.currentTime = 0;
              }, 1000);
              break;
          }
        },
      },
      {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: jsPsych.timelineVariable("Anweisung"),
        choices: "NO_KEYS",
        trial_duration: 800,
        css_classes: ["stimulus-large-text"],
      },
    ],
    timeline_variables: learningTimeline,
  };
}

/**
 * @param {Array<Object>} list: complete List
 * @param {number} rlist: List that will be remembered: 1 or 2
 * @return {Array<Object>} Array with the words, that will be remembered
 */
function getRememberedWords(list, rlist) {
  return rlist === 1
    ? list.slice(0, Math.floor(list.length / 2))
    : list.slice(Math.floor(list.length / 2));
}








// Fragebogen 


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


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// PVT timer function
function startTimer() {
  var start = Date.now();

  // Interval in a variable so it can be reset
  timer_interval = setInterval(timer, 1); // now set the value of the timer_interval variable, which also starts the timer

  function timer() {
    // get the number of seconds that have elapsed since
    // startTimer() was called
    diff = (Date.now() - start) | 0;
    diff = String(diff);

    // add 00s if necessary
    if (diff.length == 4) {
      disp = `<span style="color: rgb(104, 30, 30)">0</span><span style="color:  rgb(241, 26, 26);">${diff}</span>`;
    } else if (diff.length == 3) {
      disp = `<span style="color: rgb(104, 30, 30)">00</span><span style="color:  rgb(241, 26, 26)">${diff}</span>`;
    } else if (diff.length == 2) {
      disp = `<span style="color: rgb(104, 30, 30)">000</span><span style="color:  rgb(241, 26, 26)">${diff}</span>`;
    } else if (diff.length == 1) {
      disp = `<span style="color: rgb(104, 30, 30)">0000</span><span style="color:  rgb(241, 26, 26)">${diff}</span>`;
    }

    display = document.querySelector("#time");
    display.innerHTML = disp;
  }
  // we don't want to wait a full second before the timer starts
  minutes = timer();
}