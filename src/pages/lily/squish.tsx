import * as React from 'react'
import { useState } from 'react'
import { Button, Text, Box, Image, Link } from 'theme-ui'
import squishmallows from '../../assets/lilyAssets/squishmallows.json'

interface Squishmallow {
	name: string
	meetText: string
	imageUrl: string
	url: string
}

const SquishPage: React.FC = () => {
	const ChevronIcon = ({ up }: { up: boolean }) => (
		<svg
			viewBox="0 0 20 20"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			width="24"
			height="24"
			style={{ transform: up ? 'rotate(180deg)' : '' }}
		>
			<path d="M6 10l4 4 4-4" />
		</svg>
	)

	const [currentSquishmallow, setCurrentSquishmallow] =
		useState<Squishmallow | null>(null)

	const [showScript, setShowScript] = useState(false) // Added state to control script display

	// TODO: Use to display Loading while image fetches
	const [isLoading, setIsLoading] = useState(false)

	const handleClick = () => {
		setIsLoading(true)
		const randomIndex = Math.floor(Math.random() * squishmallows.length)
		setCurrentSquishmallow(squishmallows[randomIndex])
	}

	return (
		<Box
			sx={{
				padding: 4,
				maxWidth: 768,
				margin: '0 auto',
				textAlign: 'center',
			}}
		>
			<Button
				onClick={handleClick}
				sx={{
					backgroundColor: 'primary',
					color: 'white',
					padding: 20,
					fontSize: 3,
					cursor: 'pointer',
					':hover': {
						backgroundColor: 'highlight',
					},
					//   color: 'white', // Make button text white
				}}
			>
				Show a random Squishmallow
			</Button>

			{currentSquishmallow && (
				<Box
					sx={{
						marginTop: 4,
						padding: 3,
						boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
						borderRadius: '4px',
					}}
				>
					<Text sx={{ fontSize: 5, fontWeight: 'bold', display: 'block' }}>
						{currentSquishmallow.name}
					</Text>
					<Text sx={{ fontSize: 3, my: 2, display: 'block' }}>
						{currentSquishmallow.meetText}
					</Text>
					<Image
						src={currentSquishmallow.imageUrl}
						onLoad={() => setIsLoading(false)}
						sx={{
							maxWidth: '100%',
							height: 'auto',
							borderRadius: '4px',
							mx: 'auto',
							display: 'block',
						}}
					/>
					<Link
						href={currentSquishmallow.url}
						target="_blank"
						sx={{ color: 'secondary', mt: 2, display: 'block' }}
					>
						More Info: Visit Page
					</Link>
				</Box>
			)}

			{/* Toggle link and chevron for displaying the script */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					cursor: 'pointer',
					mt: 3,
				}}
				onClick={() => setShowScript(!showScript)}
			>
				<Text sx={{ color: 'primary' }}>How did I do this?</Text>
				<ChevronIcon up={showScript} />
			</Box>

			{/* Message about the script */}
			{showScript && (
				<Text sx={{ mt: 2, fontSize: 1, color: 'text' }}>
					I wrote this script from scratch! It uses robots to scrape the
					Squishmallow website for over 12,000 lines of data on the
					squishmallows name, bio, and an image for them all!
				</Text>
			)}

			{/* Code block to display the script */}
			{showScript && (
				<Box
					sx={{
						background: '#282c34', // Dark background similar to code editors
						color: '#abb2bf', // Light grey text color for visibility
						fontFamily: 'monospace', // Font that resembles code editors
						fontSize: 1, // Smaller font size for code
						textAlign: 'left',
						overflow: 'auto',
						borderRadius: '4px',
						padding: 3,
						marginTop: 2,
						lineHeight: '1.5', // More space between lines
					}}
				>
					<code>
						{/* Your script here */}
						{`const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs').promises // Include the file system module for writing files

const baseUrl = 'https://squishmallowsquad.fandom.com'

async function fetchPage(url) {
	try {
		const response = await axios.get(url)
		return cheerio.load(response.data)
	} catch (error) {
		console.error(Error fetching page: {url})
		return null
	}
}

async function extractSquishmallowData(listUrl) {
	const $listPage = await fetchPage(listUrl)
	if (!$listPage) return

	const squishmallowLinks = $listPage("li a[href^='/wiki/']")
		.map((i, a) => {
			const href = $listPage(a).attr('href')
			if (
				!href.includes('action=') &&
				!href.includes('Special:') &&
				!href.includes('Category:')
			) {
				return href
			}
		})
		.get()

	let squishmallowsData = [] // Initialize an array to hold the data

	for (let relativeLink of squishmallowLinks) {
		const squishmallowUrl = baseUrl + relativeLink
		const $squishmallowPage = await fetchPage(squishmallowUrl)
		if (!$squishmallowPage) continue

		const nameElement = $squishmallowPage('h1').first()
		const meetTextElement = $squishmallowPage(
			'.mw-parser-output blockquote p'
		).first()
		const imageElement = $squishmallowPage('.pi-image img')

		if (nameElement.length && meetTextElement.length && imageElement.length) {
			const name = nameElement.text().trim()
			const meetText = meetTextElement.text().trim()
			let imageUrl = imageElement.attr('src')
			if (imageUrl) {
				imageUrl = imageUrl.split('/revision')[0]
			}

			// Push the data object to the array
			squishmallowsData.push({
				name: name,
				meetText: meetText,
				imageUrl: imageUrl,
				url: squishmallowUrl,
			})
		}
	}

	// Write the array to a JSON file
	await fs.writeFile(
		'squishmallows.json',
		JSON.stringify(squishmallowsData, null, 2)
	)
	console.log('Squishmallows data has been saved to squishmallows.json')
}

async function main() {
	try {
		await extractSquishmallowData(baseUrl + '/wiki/Master_List')
	} catch (error) {
		console.error('An error occurred:', error)
	}
}

main()
`}
					</code>
				</Box>
			)}
		</Box>
	)
}

export default SquishPage
