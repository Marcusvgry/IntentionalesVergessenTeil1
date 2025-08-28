const cont_text = "continue";
const prev_text = "back";

const pvt_start_p1 = 
`<div class="instructions"> 
    In the following task, we will test your attention.
    A <b>stopwatch</b> in the middle of your screen will start counting up very quickly. 
    Whenever that happens, it is your task to <b>press the space bar</b> as quickly as possible. 
    <b>Please use your dominant hand</b> (the hand you normally write with). 
    This will stop the stopwatch and your reaction time will be displayed for a brief moment.
</div>`

const pvt_start_p2 = 
`<div class="instructions"> 
    <b>You have to stop the watch within ${lapse_time/1000} s</b>, but note that "superhuman" 
    reaction times below ${premature_time/1000} s will also count as error. 
    No worries, if you just press the space bar as soon as the clock starts counting up, 
    you will be perfectly on time.<br>
    You now have the opportunity to practise the task. 
</div>`

const pvt_feedback_text = (n_trials, n_lapses, n_prematures, responses_iti) =>
`You caught ${n_trials - n_lapses - n_prematures} 
out of ${n_trials} stopwatches on time!
${responses_iti > 0 ? "<br><b>Note:</b> Don't press any buttons when the stopwatch is not counting up yet!<br>" : ""}
<br><br>`

const pvt_praise = '<br>Well done!<br><br>';

const failed_pvt_feedback = () =>
`<div class="instructions">
    Sorry, but you need to get at least <b>${practice_correct_threshold} out of ${practice_correct_threshold}</b> stopwatches correct!<br>
    You need to stop each watch within ${lapse_time/1000} second, but impossibly fast reactions 
    (< ${premature_time/1000} s) count as errors! 
    Please try again.
</div>`;

const pvt_main_instructions_text = () =>
`<div class="instructions"> 
    Great, you're ready for the task!<br>
    Press the space bar with your dominant hand. 
    When you click "continue", the attention task will begin. 
    <b>It will take ${pvt_time_limit/60000} min.</b>
</div>`

const pvt_end_text =
`<div class="instructions"> 
    Awesome, you completed the stowatch task!<br>
</div>`
