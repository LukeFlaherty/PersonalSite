// const axios = require('axios')
// const cheerio = require('cheerio')
// const fs = require('fs').promises // Include the file system module for writing files

// const baseUrl = 'https://squishmallowsquad.fandom.com'

// async function fetchPage(url) {
// 	try {
// 		const response = await axios.get(url)
// 		return cheerio.load(response.data)
// 	} catch (error) {
// 		console.error(`Error fetching page: ${url}`)
// 		return null
// 	}
// }

// async function extractSquishmallowData(listUrl) {
// 	const $listPage = await fetchPage(listUrl)
// 	if (!$listPage) return

// 	const squishmallowLinks = $listPage("li a[href^='/wiki/']")
// 		.map((i, a) => {
// 			const href = $listPage(a).attr('href')
// 			if (
// 				!href.includes('action=') &&
// 				!href.includes('Special:') &&
// 				!href.includes('Category:')
// 			) {
// 				return href
// 			}
// 		})
// 		.get()

// 	let squishmallowsData = [] // Initialize an array to hold the data

// 	for (let relativeLink of squishmallowLinks) {
// 		const squishmallowUrl = baseUrl + relativeLink
// 		const $squishmallowPage = await fetchPage(squishmallowUrl)
// 		if (!$squishmallowPage) continue

// 		const nameElement = $squishmallowPage('h1').first()
// 		const meetTextElement = $squishmallowPage(
// 			'.mw-parser-output blockquote p'
// 		).first()
// 		const imageElement = $squishmallowPage('.pi-image img')

// 		if (nameElement.length && meetTextElement.length && imageElement.length) {
// 			const name = nameElement.text().trim()
// 			const meetText = meetTextElement.text().trim()
// 			let imageUrl = imageElement.attr('src')
// 			if (imageUrl) {
// 				imageUrl = imageUrl.split('/revision')[0]
// 			}

// 			// Push the data object to the array
// 			squishmallowsData.push({
// 				name: name,
// 				meetText: meetText,
// 				imageUrl: imageUrl,
// 				url: squishmallowUrl,
// 			})
// 		}
// 	}

// 	// Write the array to a JSON file
// 	await fs.writeFile(
// 		'squishmallows.json',
// 		JSON.stringify(squishmallowsData, null, 2)
// 	)
// 	console.log('Squishmallows data has been saved to squishmallows.json')
// }

// async function main() {
// 	try {
// 		await extractSquishmallowData(baseUrl + '/wiki/Master_List')
// 	} catch (error) {
// 		console.error('An error occurred:', error)
// 	}
// }

// main()
