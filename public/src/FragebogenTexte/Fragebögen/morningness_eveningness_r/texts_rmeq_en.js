const cont_text = "continue";

const meq_instr_text =
`<div class="instructions">
    <p>In the following, you will be asked a few questions about your typical daily rhythm.<br> 
    Please read each question carefully before you answer it.<br> 
    Each question should be answered independently of the previous ones.<br> 
    For each question, select the answer that best reflects you and your daily rhythm.</p>
</div>`

const meq_1_text =
`<div class="instructions_c">
    <b>Considering only your own "feeling best" rythm, at what time would you get up if you were entirely free to 
    plan your day?</b>
</div>`

var meq_labels1 = [];

for (let i = 5; i < 13; i++) {
    i == 12 ? meq_labels1.push('12 AM') : meq_labels1.push(i, '|', '|', '|');
}

/* Readable values to record the participant's response */
const meq_labels1_data = meq_labels1.map((item, index) => {
  if (item === '|') {
    const quarterIndex = (index % 4); // 1, 2, or 3
    return `${Math.floor(index / 4) + 5}:${quarterIndex * 15}`.padStart(4, '0');
  }
  
  if (typeof item === 'number') {
    return `${item}:00`;
  }
  
  return '12:00'; // for '12 AM'
});

const meq_7_prompt = "<b>During the first half-hour after having woken in the morning, how tired do you feel?</b>";

const meq_7_labels = [
    "very tired", 
    "fairly tired", 
    "fairly refreshed", 
    "very refreshed"
];

var meq_labels10 = [];

for (let i = 8; i < 12; i++) {
    i == 8 ? meq_labels10.push(i + ' PM', '|', '|', '|') : meq_labels10.push(i, '|', '|', '|');
}

meq_labels10.push('12 AM', '|', '|', '|');

for (let i = 1; i < 4; i++) {
    i == 3 ? meq_labels10.push(i) : meq_labels10.push(i, '|', '|', '|');
}

const meq_labels10_data = meq_labels10.map((item, index) => {
  const groupIndex = Math.floor(index / 4); // Which 4-item group we're in
  const quarterIndex = index % 4; // Position within the group (0, 1, 2, 3)
  
  if (item === '|') {
    let hour;
    
    if (groupIndex === 0) hour = 8; // 8 PM group
    else hour = 8 + groupIndex;
    
    const minutes = quarterIndex * 15;
    return `${hour}:${minutes.toString().padStart(2, '0')}`;
  }
  
  // Handle non-'|' items
  if (item === '8 PM') return '8:00';
  if (item === '12 AM') return '12:00';
  
  // Numbers after midnight (1, 2, 3) -> 24-hour format
  if (typeof item === 'number') {
    const hour = groupIndex <= 4 ? item : item + 12;
    return `${hour}:00`;
  }
  
  return item;
});

const meq_10_text =
`<div class="instructions_c">
    <b>At what time in the evening do you feel tired and as a result in need of sleep?</b>
</div>`

const meq_midnight = "MIDNIGHT";
const meq_noon = "NOON";

var meq_labels18 = [`12 ${meq_midnight}`];

for (let i = 1; i < 13; i++) {
    i == 12 ? meq_labels18.push(i + ` ${meq_noon}`) : meq_labels18.push(i);
}

for (let i = 1; i < 13; i++) {
    i == 12 ? meq_labels18.push(i + ` ${meq_midnight}`) : meq_labels18.push(i);
}

const meq_labels18_data = meq_labels18.map((item, index) => {
  if (item === '12 MIDNIGHT') {
    return '24:00';
  }
  
  if (item === '12 NOON') {
    return '12:00';
  }
  
  if (typeof item === 'number') {
    // Before noon (indices 1-11): hours 1-11
    if (index < 12) {
      return `${item}:00`;
    }
    // After noon (indices 13-23): hours 13-23
    else {
      return `${item + 12}:00`;
    }
  }
  
  return item;
});

const meq_18_text =
`<div class="instructions_c">
    <b>At what time of the day do you think you reach your "feeling best" peak?</b>
</div>`;

const meq_19_prompt =
'<b>One hears about "morning" and "evening" types of people. Which one of these types do you consider yourself to be?</b>';

const meq_19_labels = [
    'Definitely a "morning" type',
    'Rather a "morning" than an "evening" type',
    'Rather an "evening" than a "morning" type',
    'Definitely an "evening" type'
]

const meq_19_types = [
    'Definitely a "morning" type',
    'Rather a "morning" than an "evening" type',
    'neither type',
    'Rather an "evening" than a "morning" type',
    'Definitely an "evening" type'
]

const meq_types_en = [
    'Definitely a "morning" type',
    'Rather a "morning" than an "evening" type',
    'neither type',
    'Rather an "evening" than a "morning" type',
    'Definitely an "evening" type'
]
