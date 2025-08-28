const cont_text = "continue";

const st_marys_premable =
`<div class="instructions" style="margin-top: 50px">
    This questionnaire refers to your sleep over the past 24 hours.
</div>`

const st_marys_text =
`<div class="questions">
    
    <b>At what time did you:</b><br><br>
    
    <table class="st-marys-table">
        <tr>
            <th>Settle down for the night</th>
            <th>Fell asleep last night</th>
        </tr>
        <tr>
            <td>
            <input type="time" id="bedtime" class="large-time" name="bedtime" required />
            </td>
            <td>
            <input type="time" id="sleep-onset" class="large-time" name="sleep-onset" required />
            </td>
        </tr>
        <tr>
            <th>Finally wake this morning</th>
            <th>Get up this morning</th>
        </tr>
        <tr>
            <td>
            <input type="time" id="wake" class="large-time" name="wake" required />
            </td>
            <td>
            <input type="time" id="get-up" class="large-time" name="get-up" required />
            </td>
        </tr>
    </table>

    <hr><br>


    <b>Was your sleep:</b><br>
    <select class="large-select-padded" id="sleep-depth" required="required" name="sleep-depth">
        <option value=""></option>
        <option value="1">very light</option>
        <option value="2">light</option>
        <option value="3">fairly light</option>
        <option value="4">light average</option>
        <option value="5">deep average</option>
        <option value="6">fairly deep</option>
        <option value="7">deep</option>
        <option value="8">very deep</option>
    </select>

    <br>
        
    <b>How many times did you wake up?</b><br>
    <select class="large-select-padded" id="awakenings" required="required" name="awakenings">
        <option value=""></option>
        <option value="0">not at all</option>
        <option value="1">once</option>
        <option value="2">twice</option>
        <option value="3">three times</option>
        <option value="4">four times</option>
        <option value="5">five times</option>
        <option value="6">six times</option>
        <option value="7">more than six times</option>
    </select>

    <br><hr><br>

    <b>How much sleep did you have:</b><br><br>

    <table>
        <tr>
            <td><b>Last night?</b></td>
            <td>
                <input class="large-input" name="sleep-night-h" type="number" required="required" 
                min="0" max="24" style="margin-left:40px; width: 3em"> h
                <input class="large-input" name="sleep-night-m" type="number" required="required" 
                min="0" max="59" style="margin-left:15px; width: 3em"> m
            </td>
        </tr>
        <tr>
            <td><b>During the day, yesterday?</b></td>
            <td>
                <input class="large-input" name="sleep-day-h" type="number" required="required" 
                min="0" max="24" style="margin-left:40px; width: 3em"> h
                <input class="large-input" name="sleep-day-m" type="number" required="required" 
                min="0" max="59" style="margin-left:15px; width: 3em"> m
            </td>
        </tr>
    </table>

    <br><hr><br>
        
    <b>How well did you sleep last night?</b><br>
    <select class="large-select-padded" id="sleep-quality" required="required" name="sleep-quality" 
    onchange="checkOther(this.value, ['1','2','3'], 'trouble-div', 'trouble')">
        <option value=""></option>
        <option value="1">very badly</option>
        <option value="2">badly</option>
        <option value="3">fairly badly</option>
        <option value="4">fairly well</option>
        <option value="5">well</option>
        <option value="6">very well</option>
    </select>

    <div name="trouble-div" id="trouble-div" style="display:none;">
        If not well, what was the trouble? (e.g., restless, etc.)<br>
        <textarea name="trouble" id="trouble" class="small-text-field"></textarea>
    </div>

    <br>
        
    <b>How clear-headed did you feel after getting up this morning?</b><br>
    <select class="large-select-padded" id="clear-head" required="required" name="clear-head">
        <option value=""></option>
        <option value="1">still very drowsy indeed</option>
        <option value="2">still moderately drowsy</option>
        <option value="3">still slightly drowsy</option>
        <option value="4">fairly clear-headed</option>
        <option value="5">alert</option>
        <option value="6">very alert</option>
    </select>

    <br>
        
    <b>How satisfied were you with your last night's sleep?</b><br>
    <select class="large-select-padded" id="sleep-satisfaction" required="required" name="sleep-satisfaction">
        <option value=""></option>
        <option value="1">very unsatisfied</option>
        <option value="2">moderately unsatisfied</option>
        <option value="3">slightly unsatisfied</option>
        <option value="4">fairly satisfied</option>
        <option value="5">completely satisfied</option>
    </select>

    <br><hr><br>

    <b>Were you troubled by waking early and being unable to get off to 
    sleep again?</b><br>
    <label class="block"><input type="radio" name="early-wake" value="yes">yes</label>
    <label class="block"><input type="radio" name="early-wake" value="no">no</label>

    <br><br>
        
    <b>How much difficulty did you have in getting off to sleep last night?</b><br>
    <select class="large-select-padded" id="sleep-difficulty" required="required" name="sleep-difficulty">
        <option value=""></option>
        <option value="1">none or very little</option>
        <option value="2">some</option>
        <option value="3">a lot</option>
        <option value="4">extreme difficulty</option>
    </select>

    <br>

    <table>
        <tr>
            <td><b>How long did it take you to fall asleep last night?</b></td>
            <td>
                <input class="large-input" name="sleep-latency-h" type="number" required="required" 
                min="0" max="24" style="margin-left:40px; width: 3em"> h
                <input class="large-input" name="sleep-latency-m" type="number" required="required" 
                min="0" max="59" style="margin-left:15px; width: 3em"> m
            </td>
        </tr>
    </table>

</div>`