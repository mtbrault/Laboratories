const text = document.getElementById("text");
const button = document.getElementById("button-reset");
const input = document.getElementById("search");
const datalistOptions = [...document.getElementById("datalist").options];
const values = datalistOptions.map(({ value }) => value);

input.oninput = () => {
	const filteredOptions = values.filter(el => (el.indexOf(input.value) !== -1))
	if (filteredOptions.length === 0) {
		text.hidden = false
	} else {
		text.hidden = true
	}
	if (input.value === "") {
		button.hidden = true;
	} else {
		button.hidden = false;
	}
}

button.onclick = () => {
	text.hidden = true;
	button.hidden = true;
}