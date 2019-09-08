var flashcard_index = 0;
var flashcard_state = 0;
var shuffled_index = [... new Array(irregular_verbs.length).keys()];

var fc_verb;
var fc_forms = new Array(3);
var fc_index;

const IVF_PLACEHOLDER = "&nbsp;<br>&nbsp;";

function NextFlashcard() {	
	const i = shuffled_index[flashcard_index];
	
	if (flashcard_state == 0) {
		fc_verb.textContent = irregular_verbs[i][0];
		
		for (let i = 0; i < fc_forms.length; i++) {
			fc_forms[i].innerHTML = IVF_PLACEHOLDER;
		}
		//const temp = `${('000'+(flashcard_index+1)).substr(-3)} / ${irregular_verbs.length}`;
		fc_index.textContent = `${flashcard_index+1} / ${irregular_verbs.length}`;
	}
	else {
		fc_verb.textContent = irregular_verbs[i][0];
		const forms = irregular_verbs[i];
		for (let i = 0; i < fc_forms.length; i++) {
			fc_forms[i].innerHTML = `<b>${forms[i]}</b><br>${forms[i+3]}`;
		}

		flashcard_index++;
		if (flashcard_index >= irregular_verbs.length) {
			flashcard_index = 0;
		}
	}
	
	flashcard_state = (flashcard_state + 1) & 1;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function ShuffleFlashcard() {
	shuffle(shuffled_index);
	flashcard_index = 0;
	flashcard_state = 0;
	NextFlashcard();
}

function SwitchTheme(cb) {
	const dark_mode = cb.checked;
	document.documentElement.setAttribute('data-theme', dark_mode ? 'dark' : 'light');
	if (typeof(Storage) != "undefined") {
		localStorage.setItem('dark_mode', dark_mode.toString());
	} 
}

function LoadPage() {
	fc_verb = document.getElementById('Verb');
	fc_forms[0] = document.getElementById('Form1');
	fc_forms[1] = document.getElementById('Form2');
	fc_forms[2] = document.getElementById('Form3');
	fc_index = document.getElementById('Index');

	// Dark Mode
	const checbox = document.querySelector('.theme-switch input[type="checkbox"]');	
	if (typeof(Storage) != "undefined") {
		const dark_mode = localStorage.getItem('dark_mode') == 'true';
		checbox.checked = dark_mode;
		SwitchTheme(checkbox);
	}
}