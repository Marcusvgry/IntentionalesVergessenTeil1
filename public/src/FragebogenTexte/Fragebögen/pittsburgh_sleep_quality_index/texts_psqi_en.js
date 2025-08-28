const cont_text = "continue";

const psqi_bed_warning = "You seem to go to bed in the morning/during the day. Make sure this is not a mistake before submitting your answer.\n";
const psqi_wake_up_warning = "You seem to wake up very late in the day/during the night. Make sure this is not a mistake before submitting your answer.\n";
const psqi_sleep_warning = "You seem to sleep longer than the time you spend in bed. Make sure this is not a mistake before submitting your answer.\n";

const psqi_preamble =
`<div class="instructions" style="margin-top: 50px">
    The following questions relate to your usual sleep habits during the past month <span style="text-decoration: underline;">only</span>. Your answers should 
    indicate the most accurate reply for the <span style="text-decoration: underline;">majority</span> of days and nights in the past month.
</div>`

const psqi1_html =
`<div class="questions">

    <b>During the past month,</b><br><br>
        
    <b>What time have you usually gone to bed at night?</b><br>
    <input type="time" id="bedtime" class="large-time" name="bedtime" oninput="plausibleTime(this.value, 'bedtime')" required />

    <br><br>

    <b>How long (in minutes) has it taken you to fall asleep each night?</b><br>
    <input class="large-input" name="sleep-onset-m" id="sleep-onset-m" type="number" required="required" 
    min="0" max="1000" style="width: 3em"> m

    <br><br>

    <b>What time have you usually gotten up in the morning?</b><br>
    <input type="time" id="wake" class="large-time" name="wake" oninput="plausibleTime(this.value, 'wake')" required />

    <br><br>

    <b>How many hours of <span style="text-decoration: underline;">actual sleep</span> did you get at night? (This may be different than the number of 
    hours you spent in bed)</b><br>
    <input class="large-input" name="h-of-sleep" id="h-of-sleep" type="number" required="required" 
    min="0" max="24" step="0.1" style="width: 3em" oninput="sleepCheck()"> h

    <br><br>

    <span id="warning-bedtime" style="color:red;"></span>
    <span id="warning-wake" style="color:red;"></span>
    <span id="warning-h-sleep" style="color:red;"></span>

</div>`

var pittsburghOptions = [
    `not during the past month`,
    `less than once a week`,
    `once or twice a week`,
    `three or more times a week`
];

var pittsburghQuestions1 = [
    `a. Cannot get to sleep within 30 minutes`,
    `b. Wake up in the middle of the night or early morning`,
    `c. Have to get up to use the bathroom`, 
    `d. Cannot breathe comfortably`, 
    `e. Cough or snore loudly`, 
    `f. Feel too cold`,
    `g. Feel too hot`,
    `h. Have bad dreams`,
    `i. Have pain`, 
    `j. Other reason(s)`
]

var pittsburghQuestions2 = [
    `During the past month, how often have you taken medicine to help you sleep (prescribed or "over the counter")?`,
    `During the past month, how often have you had trouble staying awake while driving, eating meals, or engaging in social activity?`,
    `During the past month, how much of a problem has it been for you to keep up enthusiasm to get things done?`
]

const psqi_table_note = "During the past month, how often have you had trouble sleeping because you ...";

const psqi_open_answer = "Please describe the other reason(s) why you had trouble sleeping:";

const psqi_table_options = [
    "Very good",
    "Fairly good",
    "Fairly bad",
    "Very bad"
];

const psqi_sleep_q_prompt = "During the past month, how would you rate your sleep quality overall?";
