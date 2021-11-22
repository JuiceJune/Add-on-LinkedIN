let btn = document.getElementById("btn");

const requestURL = 'http://localhost:8000/toSheet'

btn.addEventListener('click', buttonClicked)

function sendRequest(method, url, body = null) {
	const headers = {
		'Content-Type': 'application/json'
	}
	return fetch(url, {
		method: method,
		body: JSON.stringify(body),
		headers: headers
	}).then(response => response.json())
		.then(json => {
		console.log(json)
	})
}

// function buttonClicked () {
// 	const body = {
// 		name: userInput.value,
// 		age: userInput2.value
// 	}
// 	sendRequest('POST', requestURL, body)
// 		.then(data => {
// 			console.log(data)
// 		})
// 		.catch(err => {
// 			console.log(err)
// 		})
// }

//TO content script
function buttonClicked() {
	let params = {
		active: true,
		currentWindow: true
	}
	chrome.tabs.query(params, gotTabs);

	function gotTabs(tabs) {
		let msg = {
			txt: "Oleg"
		}
		chrome.tabs.sendMessage(tabs[0].id, msg, response => {
			console.log(response)
			let body = {
				Name: response[0],
				Company: response[1],
				Title: response[2],
				Connections: response[3]
			}
			sendRequest('POST', requestURL, body)
				.then(data => {
					console.log(data)
				})
				.catch(err => {
					console.log(err)
				})
		});
	}
}

