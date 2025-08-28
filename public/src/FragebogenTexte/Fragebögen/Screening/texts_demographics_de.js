const cont_text = "weiter";

const text_demographics = `
<div class="questions">

  <fieldset>
    <legend><b>Vor dem Anruf</b></legend>
    <p><b>Participant ID:</b> <input class="large-input" name="participant_id" type="text"></p>
    <p><b>Heutiges Datum:</b> <input class="large-input" name="current_date" type="date"></p>
    <p><b>Name vom Anrufer:</b> <input class="large-input" name="caller_name" type="text"></p>
    <p><b>Einleitungsgespräch:</b><br>
      Für Forschungsinteresse bedanken; Inhalte heute: Informationen zur Studie geben; Fragen klären und Studieneignung feststellen.<br>
      Haben Sie hierfür ca. 20–30 Minuten Zeit?<br>
      Kurz die Studie erklären und nach Fragen fragen bevor es weiter geht.
    </p>
    <p><b>Sonstiges:</b><br><textarea class="large-input" name="misc_intro"></textarea></p>
  </fieldset>

  <hr>
  <fieldset>
    <legend><b>Demografische Angaben</b></legend>
    <p>Geburtsdatum: <input class="large-input" name="birthdate" type="date"></p>
    <p>Alter: <input class="large-input" name="age" type="number" min="18" max="100">
    <br>
      <small style="color: red;">
        (Wenn das Alter unter 18 und über 35 Jahren ist, dann Ausschlusskriterium!)
      </small>
    </p>
    <p>Biologisches Geschlecht:
      <select class="large-select" name="sex">
        <option value=""></option>
        <option value="male">männlich</option>
        <option value="female">weiblich</option>
        <option value="divers">divers</option>
        <option value="keine_angabe">keine Angabe</option>
      </select>
    </p>
    <p>Mit welchem Geschlecht identifizieren Sie sich?
      <select class="large-select" name="gender_identity" onchange="checkOther(this.value, 'self_describe', null, 'gender_other', null)">
        <option value=""></option>
        <option value="male">männlich</option>
        <option value="female">weiblich</option>
        <option value="non_binary">nicht-binär</option>
        <option value="dont_say">keine Angabe</option>
        <option value="self_describe">individuelle Angabe</option>
      </select>
    </p>
    <p><input class="large-input" name="gender_other" id="gender_other" type="text" placeholder="Geschlechtsidentität" style="display:none;"></p>
    <p>Muttersprache:
      <select class="large-select" name="language" onchange="checkOther(this.value, 'other', null, 'language_other', null)">
        <option value=""></option>
        <option value="German">Deutsch</option>
        <option value="other">andere</option>
      </select>
    </p>
    <p><input class="large-input" name="language_other" id="language_other" type="text" placeholder="Muttersprache" style="display:none; margin-left: 2rem"></p>
    <p>Sprechen Sie fließend Deutsch?
      <select class="large-select" name="fluency">
        <option value=""></option>
        <option value="yes">Ja</option>
        <option value="no">Nein</option>
      </select>
    </p>
    <p>Höchster Bildungsabschluss:
      <select class="large-select" name="education" onchange="checkOther(this.value, 'other', 'edu_equ_block', 'edu_other', 'edu_equiv')">
        <option value=""></option>
        <option value="no_qualification">kein Schulabschluss</option>
        <option value="grund_hauptschule">Volks-/Hauptschule</option>
        <option value="realschule">Mittlere Reife</option>
        <option value="abitur">Abitur/Fachabitur</option>
        <option value="fachhochschule">Fachhochschule</option>
        <option value="hochschule">Hochschule</option>
        <option value="other">anderer</option>
      </select>
      <br>
      <small style="color: red;">
        (Mindestens Fachholschulreife, sonst Ausschlusskriterium!)
      </small>
    </p>
    </p>
    <p><input class="large-input" type="text" name="edu_other" id="edu_other" placeholder="Anderer Abschluss" style="display:none;"></p>
    <div id="edu_equ_block" style="display:none;">
      <p>Entspricht dein Abschluss mindestens dem Abitur?
        <select class="large-select" name="edu_equiv" id="edu_equiv">
          <option value=""></option>
          <option value="yes">Ja</option>
          <option value="no">Nein</option>
        </select>
      </p>
    </div>
    <p>Derzeitige Beschäftigung:
      <select class="large-select" name="employment">
        <option value=""></option>
        <option value="arbeitslos">ohne Beschäftigung</option>
        <option value="buergergeld">Hartz-IV / Bürgergeld</option>
        <option value="alg1">ALG I</option>
        <option value="gelegenheit">Gelegenheitsjob</option>
        <option value="1euro">1€-Job</option>
        <option value="zeitarbeit">Zeitarbeitsfirma</option>
        <option value="fest">feste Anstellung</option>
        <option value="selbststaendig">selbstständig</option>
        <option value="rente">EU/BU-Rente / Altersrente</option>
        <option value="studierend">Studierend</option>
      </select>
      <p>Falls studierend (aktuell oder früher): Welches Fach?
      <input class="large-input" name="study_field" type="text">
    </p>
    </p>
        <p><b>Sonstiges:</b><br><textarea class="large-input" name="misc_personal"></textarea></p>
  </fieldset>

  <hr>

  <fieldset>
    <legend><b>Händigkeit und Sehschwäche</b></legend>
    <p>Händigkeit:
      <select class="large-select" name="handedness">
        <option value=""></option>
        <option value="rechts">Rechtshändig</option>
        <option value="links">Linkshändig</option>
        <option value="beid">Beidhändig</option>
      </select>
    </p>
    <p>Tragen Sie eine Brille oder Kontaktlinsen?
      <select class="large-select" name="wears_glasses" onchange="checkOther(this.value, 'ja', 'glasses_details', null, null)">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
    </p>
    <div id="glasses_details" style="display:none; margin-left: 2rem">
      <p>Ist Ihre Sehschwäche damit ausgeglichen?
        <select class="large-select" name="vision_corrected">
          <option value=""></option>
          <option value="ja">Ja</option>
          <option value="nein">Nein</option>
        </select>
      </p>
      <p>Dioptrien rechts: <input class="large-input" name="diopt_right" type="number"></p>
      <p>Dioptrien links: <input class="large-input" name="diopt_left" type="number"></p>
      <p>Weniger als 6 Dioptrien?
        <select class="large-select" name="less_than_6">
          <option value=""></option>
          <option value="ja">Ja</option>
          <option value="nein">Nein</option>
        </select>
      </p>
    </div>
    <p><b>Sonstiges:</b><br><textarea class="large-input" name="misc_personal"></textarea></p>
  </fieldset>

  <hr>

  <fieldset>
    <legend><b>Gesundheit & Betreuung</b></legend>
    <p>Werden Sie gesetzlich betreut?
      <select class="large-select" name="legal_guardian">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
      <br>
      <small style="color: red;">
        (Wenn ja, Ausschlusskriterium!)
      </small>
    </p>
    </p>
    <p>Sind Sie schwanger oder möglicherweise schwanger?
      <select class="large-select" name="pregnancy">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
      <br>
      <small style="color: red;">
        (Wenn ja, Ausschlusskriterium!)
      </small>
    </p>
    </p>
    <p><b>Sonstiges:</b><br><textarea class="large-input" name="misc_personal"></textarea></p>
  </fieldset>

  <hr>

  <fieldset>
    <legend><b>Zigaretten, Alkohol und Drogen</b></legend>
    <p>Wie viele Zigaretten haben Sie bisher in Ihrem Leben geraucht?
      <input class="large-input" name="cig_total" type="number">
    </p>
    <p>Rauchen Sie derzeit mehr als 2 Zigaretten pro Woche?
      <select class="large-select" name="cig_current">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
      <br>
      <small style="color: red;">
        (Wenn ja, Ausschlusskriterium!)
      </small>
    </p>
    </p>
    <p>Wie oft trinken Sie Alkohol pro Woche? <input class="large-input" name="alcohol_freq" type="number"></p>
    <p>
      Wie viel Alkohol pro Tag (Standardgläser)? 
      <input class="large-input" name="alcohol_amount" type="number">
      <br>
      <small>
        (Ein alkoholisches Getränk (= Standardgetränk, 12g Alkohol) entspricht z.B. ca. 3 dl Bier (5 Vol.%), 1 dl Wein oder Sekt (12,5 Vol.%), 2 cl Schnaps (55 Vol.%) oder 4 cl Likör (30 Vol.%))
      </small>
    </p>
    <p>Wie oft trinken Sie 6+ Gläser bei einer Gelegenheit? <input class="large-input" name="binge_freq" type="number"></p>

    <p>Haben Sie jemals THC konsumiert?
      <select class="large-select" name="thc_used" onchange="checkOther(this.value, 'ja', 'thc_details', null, null)">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
    </p>
    <div id="thc_details" style="display:none; margin-left: 2rem">
      <p>Wie häufig? <input class="large-input" name="thc_freq" type="text"></p>
      <p>Zeitraum? <input class="large-input" name="thc_period" type="text"></p>
      <p>Letzter Konsum? <input class="large-input" name="thc_last" type="text"></p>
    </div>

    <p>Andere Drogen konsumiert?
      <select class="large-select" name="other_drugs_used" onchange="checkOther(this.value, 'ja', 'other_drugs_details', null, null)">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
    </p>
    <div id="other_drugs_details" style="display:none; margin-left: 2rem">
      <p>Welche? <input class="large-input" name="drug_type" type="text"></p>
      <p>Wie häufig? <input class="large-input" name="drug_freq" type="text"></p>
      <p>Zeitraum? <input class="large-input" name="drug_period" type="text"></p>
      <p>Letzter Konsum? <input class="large-input" name="drug_last" type="text"></p>
    </div>
    <p><b>Sonstiges:</b><br><textarea class="large-input" name="misc_personal"></textarea></p>
  </fieldset>

  <hr>

 <fieldset>
    <legend><b>Medikamente & Krankheitsgeschichte</b></legend>
    <p>Leiden Sie unter einer diagnostizierten psychischen Erkrankung?
      <select class="large-select" name="psych_disorder" onchange="checkOther(this.value, 'ja', 'psych_details', null, null)">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
      <br>
      <small style="color: red;">
        (Wenn ja, Ausschlusskriterium!)
      </small>
    </p>
    </p>
    <div id="psych_details" style="display:none; margin-left: 2rem">
      <p>Welche Erkrankung? <input class="large-input" name="psych_which" type="text"></p>
      <p>Nehmen Sie hierfür Medikamente regelmäßig ein?
        <select class="large-select" name="psych_meds" onchange="checkOther(this.value, 'ja', 'psych_meds_details', null, null)">
          <option value=""></option>
          <option value="ja">Ja</option>
          <option value="nein">Nein</option>
        </select>
      </p>
      <div id="psych_meds_details" style="display:none; margin-left: 2rem">
        <p>Welche und wie viel? <input class="large-input" name="psych_meds_what" type="text"></p>
      </div>
      <p>Sind Sie derzeit in psychotherapeutischer Behandlung?
        <select class="large-select" name="therapy_current">
          <option value=""></option>
          <option value="ja">Ja</option>
          <option value="nein">Nein</option>
        </select>
      </p>
    </div>

    <p>Leiden Sie unter einer körperlichen chronischen Erkrankung?
      <select class="large-select" name="chronic_disorder" onchange="checkOther(this.value, 'ja', 'chronic_details', null, null)">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
    </p>
    <div id="chronic_details" style="display:none; margin-left: 2rem">
      <p>Welche? <input class="large-input" name="chronic_which" type="text"></p>
      <p>Nehmen Sie hierfür Medikamente regelmäßig ein?
        <select class="large-select" name="chronic_meds" onchange="checkOther(this.value, 'ja', 'chronic_meds_details', null, null)">
          <option value=""></option>
          <option value="ja">Ja</option>
          <option value="nein">Nein</option>
        </select>
      </p>
      <div id="chronic_meds_details" style="display:none; margin-left: 2rem">
        <p>Welche und wie viel? <input class="large-input" name="chronic_meds_what" type="text"></p>
      </div>
    </div>

    <p>Leiden Sie unter weiteren körperlichen oder psychischen Erkrankungen?
      <select class="large-select" name="other_disorder" onchange="checkOther(this.value, 'ja', 'other_details', null, null)">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
    </p>
    <div id="other_details" style="display:none; margin-left: 2rem">
      <p>Welche? <input class="large-input" name="other_which" type="text"></p>
      <p>Nehmen Sie hierfür Medikamente regelmäßig ein?
        <select class="large-select" name="other_meds" onchange="checkOther(this.value, 'ja', 'other_meds_details', null, null)">
          <option value=""></option>
          <option value="ja">Ja</option>
          <option value="nein">Nein</option>
        </select>
      </p>
      <div id="other_meds_details" style="display:none">
        <p>Welche und wie viel? <input class="large-input" name="other_meds_what" type="text"></p>
      </div>
    </div>

    <p>Waren Sie irgendwann in Ihrem Leben in psychiatrischer oder psychotherapeutischer Behandlung?
      <select class="large-select" name="psych_treatment" onchange="checkOther(this.value, 'ja', 'psych_treatment_details', null, null)">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
    </p>
    <div id="psych_treatment_details" style="display:none; margin-left: 2rem">
      <p>Weswegen? <input class="large-input" name="treatment_reason" type="text"></p>
      <p>Welche Medikamente wurden eingenommen? <input class="large-input" name="treatment_meds" type="text"></p>
      <p>Wann waren Sie das letzte Mal in Behandlung? <input class="large-input" name="treatment_last_time" type="text"></p>
    </div>

    <p>Gab es verschreibungspflichtige Medikamente in den letzten 6 Monaten?
      <select class="large-select" name="meds_6mo" onchange="checkOther(this.value, 'ja', 'meds_6mo_details', null, null)">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
    </p>
    <div id="meds_6mo_details" style="display:none; margin-left: 2rem">
      <p>Welche? <input class="large-input" name="meds_6mo_what" type="text"></p>
    </div>

    <p>Wurden Psychopharmaka oder Ausschluss-Medikamente in den letzten 14 Tagen eingenommen?
      <select class="large-select" name="psychopharmaka_14d">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
      <br>
      <small style="color: red;">
        (Wenn ja, Ausschlusskriterium!)
      </small>
    </p>
    </p>

    <p><b>Sonstiges:</b><br><textarea class="large-input" name="misc_medical"></textarea></p>
  </fieldset>

  <hr>

  <fieldset>
    <legend><b>Schlaf</b></legend>
    <p>Bekannte Schlafstörung (Insomnie, Schlafapnoe,...)?
      <select class="large-select" name="sleep_disorder" onchange="checkOther(this.value, 'ja', 'sleep_disorder_details', null, null)">
        <option value=""></option>
        <option value="ja">Ja</option>
        <option value="nein">Nein</option>
      </select>
    </p>
    <div id="sleep_disorder_details" style="display:none; margin-left: 2rem">
      <p>Welche? <input class="large-input" name="sleep_disorder_type" type="text"></p>
    </div>
    <p>Schicht-/Nachtarbeit? <select class="large-select" name="night_work">
      <option value=""></option><option value="ja">Ja</option><option value="nein">Nein</option></select>
      <br>
      <small style="color: red;">
        (Wenn ja, Ausschlusskriterium!)
      </small>
    </p>
    <p>Mehr als 3 Mittagsschläfe/Woche? <select class="large-select" name="naps_weekly">
      <option value=""></option><option value="ja">Ja</option><option value="nein">Nein</option></select>
      <br>
      <small style="color: red;">
        (Wenn ja, Ausschlusskriterium!)
      </small>
    </p>
    <p>durchschnittliche Einschlafdauer länger als 90 Minuten? <select class="large-select" name="fall_asleep_long">
      <option value=""></option><option value="ja">Ja</option><option value="nein">Nein</option></select>
      <br>
      <small style="color: red;">
        (Wenn ja, Ausschlusskriterium!)
      </small>
    </p>
    <p>Schlafen vor 21:00 oder nach 1:00 (standardmäßig)? <select class="large-select" name="sleep_time_unusual">
      <option value=""></option><option value="ja">Ja</option><option value="nein">Nein</option></select>
      <br>
      <small style="color: red;">
        (Wenn ja, Ausschlusskriterium!)
      </small>
    </p>
    <p>Nachts mehr als 2x aufstehen, um z.B. auf die Toilette zu gehen? <select class="large-select" name="night_urination">
      <option value=""></option><option value="ja">Ja</option><option value="nein">Nein</option></select></p>
    <p>Reise in letztem Monat mit Zeitverschiebung?
      <input class="large-input" name="recent_travel_jetlag" type="text">
      <br>
      <small>
        (1 Woche für 1 Stunde Zeitverschiebung; also wenn Proband:in in einem Land mit 3 Stunden Zeitverschiebung war, muss es mindestens 3 Wochen zurück liegen; ansonsten Ausschlusskriterium!)
      </small>
    </p>
      
  
    <p><b>Sonstiges:</b><br><textarea class="large-input" name="misc_personal"></textarea></p>
  </fieldset>

</div>
`;