import axios from "axios";
import { useEffect, useState } from "react"
import { ColourLoversReceiver, getRandomPalette } from "../api/colourLovers";

function clResponse(data) {
	console.log("HEY HERE IT IS");
}

const Scratch = props => {
	const [state, setState] = useState("");

	const respChanged = e => {
		console.log('hey it changed');
	}

	const handleForm = e => {
		console.log('handleform');
		e.preventDefault();

		const input = e.target.querySelector('#cl-response-target');
		const response = JSON.parse(input.value);

		setState(response);
	}

	useEffect(() => {
		// script.text = "function clCallback(data) { console.log('HEY HERE IT IS'); }";

		// axios.get('http://www.colourlovers.com/api/palettes/random?format=json&jsonCallback=clResponse')
		//window.clTest();

		//const script = document.createElement('script');
		//script.src = "http://www.colourlovers.com/api/palettes/random?format=json&jsonCallback=clTest(2)";
		//script.text = "setState('holler');";
		//document.body.appendChild(script);

		getRandomPalette().then(r => setState(JSON.stringify(r)));
	}, []);

	return (
		<>
			<div>
				{state}
			</div>
		</>
	)
}

export default Scratch;