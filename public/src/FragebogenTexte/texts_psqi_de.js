const psqi_bed_warning =
  "Du scheinst morgens/tagsüber ins Bett zu gehen. Stelle sicher, dass es sich dabei nicht um einen Fehler handelt, bevor du deine Antwort abschickst.\n";
const psqi_wake_up_warning =
  "Du scheinst sehr spät am Tag/in der Nacht aufzuwachen. Stelle sicher, dass es sich dabei nicht um einen Fehler handelt, bevor du deine Antwort abschickst.\n";
const psqi_sleep_warning =
  "Du scheinst länger zu schlafen, als du Zeit im Bett verbringst. Stelle sicher, dass es sich dabei nicht um einen Fehler handelt, bevor du deine Antwort abschickst.\n";

const psqi_preamble = `<div class="instructions" style="margin-top: 50px">
    Die folgenden Fragen beziehen sich auf deine üblichen Schlafgewohnheiten und zwar <span style="text-decoration: underline;">nur</span> 
    während der letzten vier Wochen. Deine Antworten sollten möglichst genau sein und sich auf die 
    <span style="text-decoration: underline;">Mehrzahl</span> der Tage und Nächte während der letzten vier Wochen beziehen.
</div>`;

const psqi1_html = `<div class="questions">

    <b>Wann bist du während der letzten vier Wochen gewöhnlich abends zu Bett gegangen?</b><br>
    <input type="time" id="bedtime" class="large-time" name="bedtime" oninput="plausibleTime(this.value, 'bedtime')" required />

    <br><br>

    <b>Wie lange (in Minuten) hat es während der letzten vier Wochen gewöhnlich gedauert, bis du nachts eingeschlafen bist?</b><br>
    <input class="large-input" name="sleep-onset-m" id="sleep-onset-m" type="number" required="required" 
    min="0" max="1000" style="width: 3em"> m

    <br><br>

    <b>Wann bist du während der letzten vier Wochen gewöhnlich morgens aufgestanden?</b><br>
    <input type="time" id="wake" class="large-time" name="wake" oninput="plausibleTime(this.value, 'wake')" required />

    <br><br>

    <b>Wieviele Stunden hast du während der letzten vier Wochen pro Nacht <span style="text-decoration: underline;">tatsächlich geschlafen</span>? 
    (Das muss nicht mit der Anzahl der Stunden, die du im Bett verbracht hast, übereinstimmen.)</b><br>
    <input class="large-input" name="h-of-sleep" id="h-of-sleep" type="number" required="required" 
    min="0" max="24" step="0.1" style="width: 3em" oninput="sleepCheck()"> h

    <br><br>

    <span id="warning-bedtime" style="color:red;"></span>
    <span id="warning-wake" style="color:red;"></span>
    <span id="warning-h-sleep" style="color:red;"></span>

</div>`;

var pittsburghOptions = [
  `Während der letzten vier Wochen gar nicht`,
  `Weniger als einmal pro Woche`,
  `Einmal oder zweimal pro Woche`,
  `Dreimal oder häufiger pro Woche`,
];

var pittsburghQuestions1 = [
  `a. weil du nicht innerhalb von 30 Minuten einschlafen konntest?`,
  `b. weil du mitten in der Nacht oder früh morgens aufgewacht bist?`,
  `c. weil du aufstehen musstest, um zur Toilette zu gehen?`,
  `d. weil du Beschwerden beim Atmen hattest?`,
  `e. weil du husten musstest oder laut geschnarcht hast?`,
  `f. weil dir zu kalt war?`,
  `g. weil dir zu warm war?`,
  `h. weil du schlecht geträumt hattest?`,
  `i. weil du Schmerzen hattest?`,
  `j. aus anderen Gründen?`,
];

var pittsburghQuestions2 = [
  `Wie oft hast du während der letzten vier Wochen Schlafmittel eingenommen (vom Arzt verschriebene oder frei verkäufliche)?`,
  `Wie oft hattest du während der letzten vier Wochen Schwierigkeiten wachzubleiben, etwa beim Autofahren, beim Essen oder bei gesellschaftlichen Anlässen?`,
  `Hattest du während der letzten vier Wochen Probleme, mit genügend Schwung die üblichen Alltagsaufgaben zu erledigen?`,
];

const psqi_table_note =
  "Wie oft hast du während der letzten vier Wochen schlecht geschlafen, ...";

const psqi_open_answer = "Bitte beschreiben:";

const psqi_table_options = [
  "Sehr gut",
  "Ziemlich gut",
  "Ziemlich schlecht",
  "Sehr schlecht",
];

const psqi_sleep_q_prompt =
  "Wie würdest du insgesamt die Qualität deines Schlafes während der letzten vier Wochen beurteilen?";
