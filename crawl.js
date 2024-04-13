const jsdom = require('jsdom')
const { JSDOM } = jsdom

async function crawlPage(currentURL) {
	console.log(`actively crawling: ${currentURL}`)
	try {
	const resp = await fetch(currentURL)
	
	if(resp.status > 399) {
		console.log(`error in fetch with status code: ${resp.status} on page ${currentURL}`)
		
		return
	}

	const contentType = resp.headers.get('Content-Type')
	if(!contentType.includes('text/html')){
	console.log(`no html response: content-type: ${contentType} on page ${currentURL}`)
	return
	}
		
	console.log(await resp.text())

	} catch(err) {
		console.log(`error in fetch: ${err.massage}, on page ${currentURL}`)
	}
	

	// return resp.json()
}


function getURLsFromHTML(inputHTMLBody, inputBaseURL) {
	const urls = []
	const dom = new JSDOM(inputHTMLBody)
	const links = dom.window.document.querySelectorAll('a')

	for (const link of links) {
		if (link.href.startsWith('/')) {
			try {
				const urlObj = new URL(`${inputBaseURL}${link.href}`)
				urls.push(urlObj.href)
			} catch (err) {
				console.log(`error with relative url: ${err.message}`)
			}
		} else {
			try {
				const urlObj = new URL(`${link.href}`)
				urls.push(urlObj.href)
			} catch (err) {
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
	crawlPage
}
