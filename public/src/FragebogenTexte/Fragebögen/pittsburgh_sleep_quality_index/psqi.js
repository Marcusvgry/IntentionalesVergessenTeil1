
// COMPONENTS -------------------------------------------------------------------------------------------------------

// Pre-define components for scoring
let psqi_components = {
  PSQIDURAT: null,
  PSQIDISTB: null,
  PSQILATEN: null,
  PSQIDAYDYS: null,
  PSQIHSE: null,
  PSQISLPQUAL: null,
  PSQIMEDS: null
};

// PITTSBURGH SLEEP QUALITY QUESTIONNAIRE ---------------------------------------------------------------------------

var pittsburgh1 = {
  on_load: () => {
    /* Show a warning if people get up in the afternoon/evening or go to bed 
    in the morning */
    plausibleTime = function(time, id) {
      h = parseInt(time.split(':')[0]);
      // Are we talking about betime or wake time?
      if (id == 'bedtime') {
        if (h >= 4 & h <= 17) {
          // Insert fitting text for warning message
          let warningSpan = document.getElementById("warning-bedtime");
          warningSpan.innerText = psqi_bed_warning;
        } else {
          // Delete warning 
          let warningSpan = document.getElementById("warning-bedtime");
          warningSpan.innerText = "";
        }
      } else if (id == 'wake') {
        if (h >= 12 | h <= 3) {
          // Insert fitting text for warning message
          let warningSpan = document.getElementById("warning-wake");
          warningSpan.innerText = psqi_wake_up_warning;
        } else {
          // Delete warning 
          let warningSpan = document.getElementById("warning-wake");
          warningSpan.innerText = "";
        }
      }
    }

    /* Throw warning if people report more h of sleep than they spent in bed */
    sleepCheck = function() {
      // Only makes sense when bedtime, waketime and h of sleep have been filled out
      let bedtime_h = parseInt(document.getElementById("bedtime").value.split(":")[0]);
      let bedtime_m = parseInt(document.getElementById("bedtime").value.split(":")[1]);
      let wake_h = parseInt(document.getElementById("wake").value.split(":")[0]);
      let wake_m = parseInt(document.getElementById("wake").value.split(":")[1]);
      let h_of_sleep = document.getElementById("h-of-sleep").value;

      if (bedtime_h != '' & bedtime_m != '' & wake_h != '' & wake_m != '' & h_of_sleep != '') {
        // Calculate time in bed. See calculations for component 4.
        // Dummy dates, because we only know the time participants went to bed, not the day
        let bedtime = new Date('02.02.02. ' + bedtime_h + ':' + bedtime_m);
        let waketime = new Date('02.03.02. ' + wake_h + ':' + wake_m);
        
        let h_in_bed = (waketime - bedtime) / (1000 * 60 * 60);
        h_in_bed = h_in_bed >= 24 ? h_in_bed - 24 : h_in_bed;

        if (h_of_sleep > h_in_bed) {
          // Insert fitting text for warning message
          let warningSpan = document.getElementById("warning-h-sleep");
          warningSpan.innerText = psqi_sleep_warning;
        } else {
          // Delete warning 
          let warningSpan = document.getElementById("warning-h-sleep");
          warningSpan.innerText = "";
        }
      }
    }
  },
  
  type: jsPsychSurveyHtmlForm,
  preamble: () => psqi_preamble,
  html: () => psqi1_html,
  button_label: () => cont_text,
  data: {trial: 'pittsburgh1'},
  
  on_finish: function(data) {
    
    // SCORING

    /* PSQIDURAT - DURATION OF SLEEP 
      IF Q4 >= 7, THEN set value to 0 
      IF Q4 < 7 and >= 6, THEN set value to 1 
      IF Q4 < 6 and >= 5, THEN set value to 2 
      IF Q4 < 5, THEN set value to 3 
      Minimum Score = 0 (better); Maximum Score = 3 (worse) */

    let h_of_sleep = Number(data.response["h-of-sleep"]);
        
    if (h_of_sleep >= 7) {
      psqi_components.PSQIDURAT = 0;
    } else if (h_of_sleep >= 6) {
      psqi_components.PSQIDURAT = 1;
    } else if (h_of_sleep >= 5) {
      psqi_components.PSQIDURAT = 2;
    } else if (h_of_sleep < 5) {
      psqi_components.PSQIDURAT = 3;
    }

    /* PSQILATEN SLEEP LATENCY 
      First, recode Q2 into Q2new thusly: 
      IF Q2 >= 0 and <= 15, THEN set value of Q2new to 0 
      IF Q2 > 15 and <= 30, THEN set value of Q2new to 1 
      IF Q2 > 30 and <= 60, THEN set value of Q2new to 2 
      IF Q2 > 60, THEN set value of Q2new to 3  
        
    The rest of component two will be calculated in the second part of 
    the questionnaire (becasue Item Q5a is needed for that). */

    let sleep_onset = Number(data.response["sleep-onset-m"]);

    if (sleep_onset <= 15) {
      psqi_components.PSQILATEN = 0;
    } else if (sleep_onset <= 30) {
      psqi_components.PSQILATEN = 1;
    } else if (sleep_onset <= 60) {
      psqi_components.PSQILATEN = 2;
    } else if (sleep_onset > 60) {
      psqi_components.PSQILATEN = 3;
    }

    /* PSQIHSE SLEEP EFFICIENCY
    
      Diffsec = Diffsec = Difference in seconds between times for Bed Time (Q1) and 
      Getting Up Time (Q3).
      Diffhour = Absolute value of diffsec / 3600 
      newtib =IF diffhour > 24, then newtib = diffhour – 24 
      IF diffhour < 24, THEN newtib = diffhour 
      (NOTE, THE ABOVE JUST CALCULATES THE HOURS BETWEEN BED 
      TIME (Q1) AND GETTING UP TIME (Q3)
      tmphse = (Q4 / newtib) * 100 
      
      IF tmphse >= 85, THEN set value to 0 
      IF tmphse < 85 and >= 75, THEN set value to 1 
      IF tmphse < 75 and >= 65, THEN set value to 2 
      IF tmphse < 65, THEN set value to 3 
    
      Minimum Score = 0 (better); Maximum Score = 3 (worse) 
    
    Note: Why minus 24 h? If someone went to bed in the evening, and got up in the 
    morning, the day between going to bed/getting up changes. If they went to bed after 
    midnight, and got up in the morning, they go to bed/get up on the same day, which 
    is of course relevant for the time difference calculations. */

    let bedtime_h = parseInt(data.response["bedtime"].split(":")[0]);
    let bedtime_m = parseInt(data.response["bedtime"].split(":")[1]);
    let wake_h = parseInt(data.response["wake"].split(":")[0]);
    let wake_m = parseInt(data.response["wake"].split(":")[1]);

    // Dummy dates, because we only know the time participants went to bed, not the day
    let bedtime = new Date('02.02.02 ' + bedtime_h + ':' + bedtime_m);
    let waketime = new Date('02.03.02 ' + wake_h + ':' + wake_m);

    /* The difference between our times is in milliseconds, not seconds, so we need to 
    divide by 3600000 instead of 3600 */
    let h_in_bed = (waketime - bedtime) / (1000 * 60 * 60);
    h_in_bed = h_in_bed >= 24 ? h_in_bed - 24 : h_in_bed;

    // (total # of hours asleep)/(total # of hours in bed) x 100 >85%=0, 75%-84%=1, 65%-74%=2, <65%=3
    let sleep_efficiency = h_of_sleep / h_in_bed * 100;

    // Note: Because 85% is not scored according to this coding scheme, I switched > to >=
    if (h_in_bed == 0) {
      // sleep efficiency must be 0 if h in bed are 0, because otherwise, we'd divide by 0
      psqi_components.PSQIHSE = null;
    } else if (sleep_efficiency > 100) {
      // Can't calculate a meaningful value if more hours of sleep than in bed
      psqi_components.PSQIHSE = null;
    } else if (sleep_efficiency >= 85) {
      psqi_components.PSQIHSE = 0;
    } else if (sleep_efficiency >= 75) {
      psqi_components.PSQIHSE = 1;
    } else if (sleep_efficiency >= 65) {
      psqi_components.PSQIHSE = 2;
    } else if (sleep_efficiency < 65) {
      psqi_components.PSQIHSE = 3;
    }

    // Needs to be stringified, because arrays cannot be saved in a .csv file.
    data.response = JSON.stringify(data.response);
  }
};

var pittsburgh2 = {
  on_load: () => {
    lastQ = document.getElementsByName("Q9");
      
    lastQ.forEach(
      el => el.addEventListener(
        'change', 
        function() {
          if (lastQ[0].checked) {
            // Hide text field for specifications
            document.getElementById("other-div").style.display = "none";
            document.getElementById("other").removeAttribute('required');
          } else {
            // Display text field for specifications
            document.getElementById("other-div").style.display = "block";
            document.getElementById("other").setAttribute('required','required');
          }
        }
      )
    )
  },
  type: jsPsychSurveyHtmlForm,
  preamble: () => psqi_preamble,
  html: () => {
    
    // QUESTION 5, a - j
    stim = 
    `<table class="likert-table">
      <tr>
        <th align ="left" style="font-size: 14px;">${psqi_table_note}</th>`
    
    for (let i = 0; i < pittsburghOptions.length; i++) {
      stim = stim +
      `<th style="font-size: 14px; line-height: 1em;">${pittsburghOptions[i]}</th>` 
    }

    stim = stim + `</tr>`

    for (let i = 0; i < pittsburghQuestions1.length; i++) {
      stim = stim + `<tr><td align ="left" style="font-size:14px;">${pittsburghQuestions1[i]}</td>`

      for (let j = 0; j < pittsburghOptions.length; j++) {
        stim = stim +
        `<td><div class="center-radio"><input type="radio" name="Q${i}" value="${j}" required></div></td>`
      }

      stim = stim + `</tr>`
    }

    stim = stim + 
        
    `</table><br>
        
    <div name="other-div" id="other-div" style="display:none; margin-bottom:20px;">
      ${psqi_open_answer}<br>
      <textarea class="small-text-field" name="other" id="other" rows="3" cols="40"></textarea>
    </div>`

    // QUESTION 6
    stim = stim + 
    `<div style="display: flex; justify-content: center;">
      <table class="likert-table" style="font-size:14px;">
        <tr>
          <th colspan="2" style="padding-bottom: 10px;">
            <b>${psqi_sleep_q_prompt}</b>
          </th>
        </tr>`;

        for (opt in psqi_table_options) {
          stim = stim +
          `<tr>
            <td>${psqi_table_options[opt]}</td>
            <td>
              <div class="center-radio"><input type="radio" name="Q${pittsburghQuestions1.length}" value="${opt}" ${opt === 0 ? 'required' : ''}></div>
            </td>
          </tr>`;
        }

    stim = stim + `</table></div><br>`;

    // QUESTIONS 7 - 9
    stim = stim +
    `<table class="likert-table">
      <tr>
        <th align ="left" style="font-size: 14px;"></th>`
        
        for (let i = 0; i < pittsburghOptions.length; i++) {
          stim = stim +
          `<th style="font-size: 14px; line-height: 1em;">${pittsburghOptions[i]}</th>` 
        }

        stim = stim + `</tr>`

        for (let i = 0; i < pittsburghQuestions2.length; i++) {
          stim = stim + `<tr><td align ="left" style="font-size:14px;">${pittsburghQuestions2[i]}</td>`
          
          for (let j = 0; j < pittsburghOptions.length; j++) {
            stim = stim +
            `<td align = "center"><div class="center-radio"><input type="radio" name="Q${i + pittsburghQuestions1.length + 1}" value="${j}" required></div></td>`
          }

          stim = stim + `</tr>`
        }

    stim = stim + `</table><br>`

    return(stim)
  },
  button_label: () => cont_text,
  data: { trial: "pittburgh2" },
  on_finish: function(data) {
    // SCORING

    /* PSQIDISTB - SLEEP DISTURBANCE 
      IF Q5b + Q5c + Q5d + Q5e + Q5f + Q5g + Q5h + Q5i + Q5j (IF Q5JCOM is null 
      or Q5j is null, set the value of Q5j to 0) = 0, THEN set value to 0 

      IF Q5b + Q5c + Q5d + Q5e + Q5f + Q5g + Q5h + Q5i + Q5j (IF Q5JCOM is null 
      or Q5j is null, set the value of Q5j to 0) >= 1 and <= 9, THEN set value to 1 
      
      IF Q5b + Q5c + Q5d + Q5e + Q5f + Q5g + Q5h + Q5i + Q5j (IF Q5JCOM is null 
      or Q5j is null, set the value of Q5j to 0) > 9 and <= 18, THEN set value to 2 
      
      IF Q5b + Q5c + Q5d + Q5e + Q5f + Q5g + Q5h + Q5i + Q5j (IF Q5JCOM is null 
      or Q5j is null, set the value of Q5j to 0) > 18, THEN set value to 3 
      
      Minimum Score = 0 (better); Maximum Score = 3 (worse)  
        
    Note that items 5 b - j are called Q1 - Q9 in our questionnaire. It can also never 
    happen that the text field for Q5 is null when Q5 is not, or the other way around. 
    So, we can just calculate the sum across 5b - 5j and work with that. */

    let distb_sum = 0;

    for (i = 1; i < 10; i++) {
      distb_sum += Number(data.response["Q" + i]);
    }

    if (distb_sum == 0) {
      psqi_components.PSQIDISTB = 0;
    } else if (distb_sum <= 9) {
      psqi_components.PSQIDISTB = 1;
    } else if (distb_sum <= 18) {
      psqi_components.PSQIDISTB = 2;
    } else if (distb_sum > 18) {
      psqi_components.PSQIDISTB = 3;
    }

    /* PSQILATEN SLEEP LATENCY (continued)
      Use values of recoded Q2 (see above), and then:
        
      IF Q5a + Q2new = 0, THEN set value to 0 
      IF Q5a + Q2new >= 1 and <= 2, THEN set value to 1 
      IF Q5a + Q2new >= 3 and <= 4, THEN set value to 2 
      IF Q5a + Q2new >= 5 and <= 6, THEN set value to 3

    Minimum Score = 0 (better); Maximum Score = 3 (worse) */
            
    psqi_components.PSQILATEN = psqi_components.PSQILATEN + Number(data.response['Q0']);
            
    if (psqi_components.PSQILATEN == 0) {
      psqi_components.PSQILATEN = 0;
    } else if (psqi_components.PSQILATEN <= 2) {
      psqi_components.PSQILATEN = 1;
    } else if (psqi_components.PSQILATEN <= 4) {
      psqi_components.PSQILATEN = 2;
    } else if (psqi_components.PSQILATEN <= 6) {
      psqi_components.PSQILATEN = 3;
    }

    /* PSQIDAYDYS DAY DISFUNCTION DUE TO SLEEPINESS
    
      IF Q8 + Q9 = 0, THEN set value to 0 
      IF Q8 + Q9 >= 1 and <= 2, THEN set value to 1 
      IF Q8 + Q9 >= 3 and <= 4, THEN set value to 2 
      IF Q8 + Q9 >= 5 and <= 6, THEN set value to 3 

    Minimum Score = 0 (better); Maximum Score = 3 (worse) */

    psqi_components.PSQIDAYDYS = Number(data.response['Q12']) + Number(data.response['Q13']);
        
    if (psqi_components.PSQIDAYDYS == 0) {
      psqi_components.PSQIDAYDYS = 0;
    } else if (psqi_components.PSQIDAYDYS <= 2) {
      psqi_components.PSQIDAYDYS = 1;
    } else if (psqi_components.PSQIDAYDYS <= 4) {
      psqi_components.PSQIDAYDYS = 2;
    } else if (psqi_components.PSQIDAYDYS <= 6) {
      psqi_components.PSQIDAYDYS = 3;
    }

    /* PSQISLPQUAL OVERALL SLEEP QUALITY 
      Q6 
    Minimum Score = 0 (better); Maximum Score = 3 (worse) */
    psqi_components.PSQISLPQUAL = Number(data.response['Q10']);

    /* PSQIMEDS NEEDS MEDS TO SLEEP
      Q7
    Minimum Score = 0 (better); Maximum Score = 3 (worse) */
    psqi_components.PSQIMEDS = Number(data.response['Q11']);

    /* TOTAL 
      DURAT + DISTB + LATEN + DAYDYS + HSE + SLPQUAL + MEDS Minimum 
      Score = 0 (better); Maximum Score = 21 (worse) 
    
    Interpretation: TOTAL < 5 associated with good sleep quality */

    data.psqi_components = JSON.stringify(psqi_components);
    data.psqi_total = Object.values(psqi_components).reduce((acc, val) => acc + val, 0);
    
    data.response = JSON.stringify(data.response);
  }
};

timeline = [pittsburgh1, pittsburgh2];
