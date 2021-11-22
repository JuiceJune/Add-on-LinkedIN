
function getData() {
	let arr = [];

	const name = document.getElementsByClassName('profile-topcard-person-entity__name t-24 t-black t-bold')
	const title = document.getElementsByClassName('profile-topcard__summary-position-title')
	const company = document.getElementsByClassName('li-i18n-linkto inverse-link-on-a-light-background t-14 t-black t-bold')
	const tripleDotBtn = document.getElementById('ember81')
	const linkBtn = document.getElementById('ember86')
	const connections = document.getElementsByClassName('ember-view profile-topcard__connections-link type-total inverse-link-on-a-light-background')

	arr.push(name[0].textContent.trim())
	arr.push(company[0].innerText)
	arr.push(title[0].innerText)
	arr.push(connections[0].innerText.replace(/[^0-9]/g,""))


	let promise  = new Promise( (resolve, reject) => {
		tripleDotBtn.click()
		setTimeout(() => {
			linkBtn.click()
			resolve();
		}, 5000)
	})

	promise.then( () => {
		navigator.clipboard.readText().then(text => arr.push(text))
	}).then(() => {
		console.log(arr)
	})
	return arr
}


console.log("Content")
chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
	sendResponse(getData())
}