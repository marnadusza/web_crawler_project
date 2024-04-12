const jsdom = require('jsdom')
const { JSDOM } = jsdom

function getURLsFromHTML(inputHTMLBody, inputBaseURL) {
	const urls = []
	const dom = new JSDOM(inputHTMLBody)
	const links = dom.window.document.querySelectorAll('a')

	for (const link of links) {
		if (link.href.startsWith('/')) {
			try {
				const urlObj = new URL(`${inputBaseURL}${link.href}`)
				urls.push(urlObj.href)}
				catch (err) {
					console.log(`error with relative url: ${err.message}`)
				}
		} else  {
			try {
				const urlObj = new URL(`${link.href}`)
				urls.push(urlObj.href)}
				catch (err) {
					console.log(`error with absolute url: ${err.message}`)
				}
			
		} 
	}
	return urls
}



function normalizeURL(urlString) {
	const urlObj = new URL(urlString)
	const hostPath = `${urlObj.hostname}${urlObj.pathname}`
	const lastChar = hostPath.slice(-1)
	if (hostPath.length > 0 && lastChar === '/') {
		const newHostPath = hostPath.slice(0, -1)
		return newHostPath
	}
	return hostPath
}

module.exports = {
	normalizeURL,
	getURLsFromHTML,
}
