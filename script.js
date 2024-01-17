class sentPce {
  element;
  constructor(id, data, tid) {
    this.id = id;
    this.data = data;
    this.tid = tid;
  }
}
let currSent = [];
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\
// tid 0 = sentence data, data:
// tid 1 = generic text, data: NA
// tid 2 = verb, data: text, person, number, voice, mood, tense, conjugation
// tid 3 = noun, data: text, number, gender, case, declension, role in sentence <DO, IO, su, ag, OP> OP is object of preposition
// tid 4 = adjective, data: text, number, gender, case, corresponding obj by id
// tid 5 = adverb, data: text, corresponding obj by id
// tid 6 = relative, data: text, number, gender, case, antecedent by id, role in the subordinate clause <DO, IO, su, agent>
// tid 7 = preposition, data: text, + case
// tid 8 = conjunction, data: text
// tid 9 = pronoun, data: text, number, gender, case, role in sentence
// tid 10 = interjection, data: text

const sent1 = [new sentPce(0, [], 0), new sentPce(1, ["Lars", "sin", "NA", "nom", "NA", "su"], 3), new sentPce(2, ["Romam", "sin", "fem", "acc", "fou", "DO"], 3), new sentPce(3, ["oddit!", "pthi", "sin", "act", "pre", "cfou"], 2)]; //Lars Romam odit!

const sent2 = [new sentPce(0, [], 0), new sentPce(1, ["Amen, amen"], 1), new sentPce(2, ["dico", "pfir", "sin", "act", "pre", "cthi"], 2), new sentPce(3, ["vobis:", "plu", "NA", "dat", "NA", "IO"], 3), new sentPce(4, ["Qui", "sin", "mas", "nom", "NA", "su"], 3), new sentPce(5, ["credit,", "pthi", "sin", "act", "pre", "cthi"], 2), new sentPce(6, ["habet", "pthi", "sin", "act", "pre", "csec"], 2), new sentPce(7, ["vitam.", "sin", "fem", "acc", "fir", "DO"], 3), new sentPce(8, ["aeternam.", "sin", "fem", "acc", "7"], 4)]; //Amen, amen dico vobis, Qui credit habet vitam aeternam.
//▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\\

const sentList = [sent1, sent2];
const pSpace = document.getElementById("problemCenter");
const sCont = document.getElementById("sentenceContainer");
const goBtn = document.getElementById("goBtn");
let answer = "";
let inputObjects = [];
let inputLabels = [];

function makeSentence(sentencePieces)
{
  loadSent();
  document.getElementById("sentence").innerHTML = '';
  sentencePieces.forEach(function (item, index) {
    if(item.tid != 0)
    {
      item.element = document.createElement('div');
      item.element.setAttribute("class", "wrdButton");
      item.element.setAttribute("href", "#");
      item.element.setAttribute("type", "wrdButton");
      //item.element.setAttribute("onclick", "wordInspect(this)");
      item.element.setAttribute("id", (item.id.toString() + "main"));
      document.getElementById("sentence").appendChild(item.element)
      item.element.innerHTML = item.data[0];
    }
  });
}

function loadSent(){
  sCont.innerHTML = "";
  let index = Math.floor(Math.random() * sentList.length);
  currSent = sentList[index];
  let fullSent = '"';
  for (const element of currSent)
  {
    if(element.tid != 0)
    {
      fullSent = fullSent + element.data[0];
      if(element.id != currSent.length - 1)
      {
        fullSent += " ";
      }
    }
  }
  fullSent += '"';
  sCont.innerHTML = fullSent;
  console.log(fullSent);
}

function getFullValue(input){
  let r = "NA";
  switch (input){
      //Persons
    case "pfir":
      r = "First Person";
      break;
    case "psec":
      r = "Second Person";
      break;
    case "pthi":
      r = "Third Person";
      break;
      //Numbers
    case "sin":
      r = "Singular";
      break;
    case "plu":
      r = "Plural";
      break;
      //Voices
    case "act":
      r = "Active";
      break;
    case "pas":
      r = "Passive";
      break;
      //Moods
    case "ind":
      r = "Indicative";
      break;
    case "sub":
      r = "Subjunctive";
      break;
    case "imp":
      r = "Imperative";
      break;
      //Tenses
    case "pre":
      r = "Present";
      break;
    case "imf":
      r = "Imperfect";
      break;
    case "fut":
      r = "Future";
      break;
    case "per":
      r = "Perfect";
      break;
    case "plp":
      r = "Pluperfect";
      break;
    case "ftp":
      r = "Future Perfect";
      break;
      //Conjugations
    case "cfir":
      r = "First Conjugation (āre)";
      break;
    case "csec":
      r = "Second Conjugation (ēre)";
      break;
    case "cthi":
      r = "Third Conjugation (ere)";
      break;
    case "ctio":
      r = "Third Conjugation IO (ere)";
      break;
    case "cfou":
      r = "Fourth Conjugation (īre)";
      break;
      //Genders
    case "mas":
      r = "Masculine";
      break;
    case "fem":
      r = "Femenine";
      break;
    case "neu":
      r = "Neuter";
      break;
      //Cases
    case "nom":
      r = "Nominative";
      break;
    case "gen":
      r = "Genitive";
      break;
    case "dat":
      r = "Dative";
      break;
    case "acc":
      r = "Accusative";
      break;
    case "abl":
      r = "Ablative";
      break;
    case "voc":
      r = "Vocative";
      break;
    case "loc":
      r = "Locative";
      break;
      //Declensions
    case "fir":
      r = "First Declension (-ae)";
      break;
    case "sec":
      r = "Secont Declension (ī)";
      break;
    case "thi":
      r = "Third Declension (is)";
      break;
    case "ist":
      r = "Third Declension I Stem (is)";
      break;
    case "fou":
      r = "Fourth Declension (ūs)";
      break;
    case "fif":
      r = "Fifth Declension (eī)";
      break;
      //Roles
    case "DO":
      r = "Direct Object";
      break;
    case "IO":
      r = "Indirect Object";
      break;
    case "su":
      r = "Subject";
      break;
    case "ag":
      r = "Agent";
      break;
    case "OP":
      r = "Object of Preposition";
      break;
  }
  return r;
}

const allPersons = ["pfir", "psec", "pthi"];
const allNumbers = ["sin", "plu"];
const allVoices = ["act", "pas"];
const allMoods = ["ind", "sub", "imp"];
const allTenses = ["pre", "imf", "fut", "per", "plp", "ftp"];
const allConjugations = ["cfir", "csec", "cthi", "ctio", "cfou"];
const allGenders = ["mas", "fem", "neu"];
const allCases = ["nom", "gen", "dat", "acc", "abl", "voc", "loc"];
const allDeclensions = ["fir", "sec", "thi", "ist", "fou", "fif"];
const allRoles = ["DO", "IO", "su", "ag", "OP"];

const dataTypeArrays = [allPersons, allNumbers, allVoices, allMoods, allTenses, allConjugations, allGenders, allCases, allCases, allDeclensions, allRoles];

function askQuestion(inputAnswer){
  answer = inputAnswer;
  pSpace.innerHTML = "";
  let formObj = document.createElement('form');
  pSpace.appendChild(formObj);
  let optionsList = 0;
  for(let arrI = 0; arrI < dataTypeArrays.length; arrI++)
  {
    currArr = dataTypeArrays[arrI];
    for(let i = 0; i < currArr.length; i++)
    {
      if(inputAnswer.localeCompare(currArr[i]) == 0)
      {
        optionsList = arrI;
      }
    }
  }
  let options = dataTypeArrays[optionsList];
  inputObjects = new Array(options.length);
  inputLabels = new Array(options.length);
  for(let i = 0; i < options.length; i++)
  {
    // Create input object
    inputObjects[i] = document.createElement('input');
    inputObjects[i].setAttribute("type", "radio");
    inputObjects[i].setAttribute("id", options[i]);
    inputObjects[i].setAttribute("value", options[i]);
    inputObjects[i].setAttribute("name", "question");
    let checkMark = document.createElement('span');
    checkMark.setAttribute("class", "checkmark");
    // Create corresponding labels
    inputLabels[i] = document.createElement('label');
    inputLabels[i].setAttribute("for", options[i]);
    inputLabels[i].innerHTML = getFullValue(options[i]);
    inputLabels[i].setAttribute("class", "container");
    inputLabels[i].appendChild(inputObjects[i]);
    formObj.appendChild(inputLabels[i]);
    inputLabels[i].appendChild(checkMark);
  }
  sub = document.createElement('button');
  sub.innerHTML = "Submit";
  sub.setAttribute("id", "submitButton");
  sub.setAttribute("type", "submit");
  sub.setAttribute("class", "wrdButton");
  sub.style.display = "block";
  formObj.appendChild(sub);
  
  formObj.addEventListener("submit", function() {
    let correct = false;
    for(let i = 0; i < inputObjects.length; i++)
    {
      if(inputObjects[i].checked && (inputObjects[i].getAttribute("value").localeCompare(answer) == 0))
      {
        correct = true;
      }
    }
    returnAnswer(correct);
  });
  
}

function returnAnswer(correct){
  pSpace.innerHTML = "";
  let correctText = document.createElement('p');
  if(correct)
  {
    correctText.innerHTML = "Correct! :)";
  }
  else
  {
    correctText.innerHTML = "Incorrect. :( It was ";
    correctText.innerHTML += getFullValue(answer).toLowerCase();
  }
  answer = "";
  pSpace.appendChild(correctText);
}

function askWordQuestion(){
  
  let blankData = "NA";
  let wordDisplay = document.getElementById("wordContainer");
  loadSent();
  let wordIndex = Math.floor(Math.random() * currSent.length);
  while(currSent[wordIndex].tid == 0 || currSent[wordIndex].tid == 1 || (4 < currSent[wordIndex].tid && currSent[wordIndex].tid < 9) || currSent[wordIndex].tid == 10)
  {
    wordIndex = Math.floor(Math.random() * currSent.length);
  }
  let word = currSent[wordIndex];
  wordDisplay.innerHTML = "Word: " + '"'+ word.data[0] + '"';
  let indexRange = 0;
  switch (word.tid){
    case 2:
      indexRange = 6;
      break;
    case 3:
      indexRange = 4;
      break;
    case 4:
      indexRange = 3;
      break;
    case 9:
      indexRange = 3;
      break;
  }
  let ansInd = Math.floor(Math.random()*indexRange) + 1;
  while(word.data[ansInd].localeCompare(blankData) == 0)
  {
    ansInd = Math.floor(Math.random()*indexRange) + 1;
  }
  askQuestion(word.data[ansInd]);
  goBtn.prop('disabled', true);
  setTimeout(function(){
    goBtn.prop('disabled', false);
  },1000);
}
