// because of CORS and my lack of experience there, for these api calls to work, a ColourLoversReceiver component
// needs to be in the document somewhere

const SCRIPT_ID = 'colour-lovers-api-script';
const INPUT_ID = 'cl-response-target';
const REQUEST_SCRIPT_ID = 'cl-request-script-';

const documentScript = `
const resolveCallbacks = new Map();

let clreqid  = 0;
const getColourLoversRequestIdC = () => {
	clreqid += 1;
	return clreqid;
}

function getColourLoversRequestId(resolve) {
	const id = getColourLoversRequestIdC();
	resolveCallbacks.set(id, resolve);
	console.log('id requested');
	console.log(resolveCallbacks);
	return id;
}

function getColourLoversCallback(requestId) {
	//return data => colourLoversResponseReceived(requestId, data);
	console.log('callback requested');
	const resolve = resolveCallbacks.get(requestId);
	return resolve;
}

function colourLoversResponseReceived(requestId, data) {
	console.log("colourLoversResponseReceived");
	const response = { requestId, data };
	const responseTarget = document.getElementById('cl-response-target');

	if (responseTarget) {
		const currentValue = responseTarget.value;
		const responses = JSON.parse(currentValue ? currentValue : "[]");
		responses.push(response);
		responseTarget.value = JSON.stringify(responses);
		responseTarget.form.requestSubmit();
	}

	else {
		console.log("Can't find response target!");
	}
}`;

export const ColourLoversReceiver = props => {
	const handleForm = e => {
		console.log('handleform');
		e.preventDefault();

		const input = e.target.querySelector(`#${INPUT_ID}`);
		const responses = JSON.parse(input.value);
		input.value = "";

		responses.forEach(response => {
			const { requestId, data } = response;

			const script = document.getElementById(`${REQUEST_SCRIPT_ID}${requestId}`);
			script.remove();
		});

		//setState(response);
	}

	return (
		<div style={{ display: 'none' }} aria-hidden={true}>
			<form onSubmit={handleForm}>
				<input id={INPUT_ID} type='text' style={{}} />
			</form>
		</div>
	)
}

export const getRandomPalette = () => {
	if (!verifyScript())
		throw new Error("the script is not there!");

	return new Promise((resolve, reject) => {
		const resolver = response => resolve(response[0]);

		const requestId = window.getColourLoversRequestId(resolver);
		const requestScript = document.createElement('script');
		requestScript.src = `http://www.colourlovers.com/api/palettes/random?format=json&jsonCallback=getColourLoversCallback(${requestId})`;
		requestScript.id = `${REQUEST_SCRIPT_ID}${requestId}`;

		document.body.appendChild(requestScript);
	})
}

const verifyScript = () => {
	if (Object.hasOwnProperty.call(window, 'getColourLoversRequestId'))
		return true;

	const script = document.createElement('script');
	script.text = documentScript;
	document.head.appendChild(script);

	return Object.hasOwnProperty.call(window, 'getColourLoversRequestId');
}