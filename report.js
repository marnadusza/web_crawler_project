function printReport(pages) {
	console.log('===================')
	console.log('REPORT ALL LINKS')
	console.log('===================')

	const sortedPages = sortPages(pages)

	for (const sortedPage of sortedPages) {
		const url = sortedPage[0]
		const hits = sortedPage[1]

		console.log(`Found ${hits} links to page: ${url}`)
	}

	console.log('===================')
	console.log('RAPORT FOR PDF LINKS')
	console.log('===================')

	const pdfSortedPages = sortPDFPages(pages)

	for (const pdfSortedPage of pdfSortedPages) {
		console.log(`Found links to page: ${pdfSortedPage}`, 'l')
	}
	console.log('===================')
	console.log('RAPORT FOR JPG LINKS')
	console.log('===================')

	const jpgSortedPages = sortJPGPages(pages)

	for (const jpgSortedPage of jpgSortedPages) {
		console.log(`Found links to page: ${jpgSortedPage}`)
	}

	console.log('===================')
	console.log('END REPORT')
	console.log('===================')
}

function sortPages(pages) {
	const pagesArray = Object.entries(pages)
	pagesArray.sort((x, y) => y[1] - x[1])
	return pagesArray
}

function sortPDFPages(pages) {
	const pagesArray = Object.entries(pages)
	const pdfPagesArray = []
	pagesArray.forEach(el => {
		if (el[0].slice(-4) === '.pdf') {
			pdfPagesArray.push(el[0])
		}
	})

	return pdfPagesArray
}
function sortJPGPages(pages) {
	const pagesArray = Object.entries(pages)
	const jpgPagesArray = []
	pagesArray.forEach(el => {
		if (el[0].slice(-4) === '.jpg') {
			jpgPagesArray.push(el[0])
		}
	})

	return jpgPagesArray
}

module.exports = {
	sortPages,
	sortPDFPages,
    sortJPGPages,
	printReport,
}
