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
}
