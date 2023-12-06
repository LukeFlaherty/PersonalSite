import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Flex, Text, Container, Heading, Button, Input, Box } from 'theme-ui'

const FlashcardsPage: React.FC = () => {
	// Initialize state for flashcard sets and the current set being edited
	const [flashcardSets, setFlashcardSets] = useState([])
	const [currentSet, setCurrentSet] = useState({
		title: '',
		cards: [],
	})
	const [selectedSetIndex, setSelectedSetIndex] = useState(-1)

	const [isEditingSet, setIsEditingSet] = useState(false)
	const [editingSetIndex, setEditingSetIndex] = useState(-1)
	const [editingCardIndex, setEditingCardIndex] = useState(-1)

	const [selectedSet, setSelectedSet] = useState(null)

	// Add state for temporary storage during editing
	const [tempSet, setTempSet] = useState({ title: '', cards: [] })

	// Effect to load flashcard sets from local storage when the page loads
	useEffect(() => {
		const storedSets = localStorage.getItem('flashcardSets')
		if (storedSets) {
			setFlashcardSets(JSON.parse(storedSets))
		}
	}, [])

	// New useEffect to update localStorage whenever flashcardSets changes
	useEffect(() => {
		localStorage.setItem('flashcardSets', JSON.stringify(flashcardSets))
	}, [flashcardSets])

	// Function to add a new flashcard set
	const addSet = () => {
		if (currentSet.title) {
			setFlashcardSets([...flashcardSets, currentSet])
			setCurrentSet({ title: '', cards: [] })
			localStorage.setItem('flashcardSets', JSON.stringify(flashcardSets))
		}
	}

	// Function to add a new flashcard to the current set
	const addCard = () => {
		if (currentSet.title && currentSet.cards.length < 2) {
			setCurrentSet({
				...currentSet,
				cards: [...currentSet.cards, { front: '', back: '' }],
			})
		}
	}

	// Function to handle selecting a set
	const handleSelectSet = (index: number) => {
		if (index === -1) {
			return // Ignore the placeholder option
		}

		setSelectedSet(index)

		setSelectedSetIndex(index)
		setCurrentSet(flashcardSets[index])
	}

	// Function to add a new flashcard to the selected set
	const addCardToSet = () => {
		if (selectedSetIndex >= 0) {
			const updatedSets = [...flashcardSets]
			updatedSets[selectedSetIndex].cards.push({ front: '', back: '' })
			setFlashcardSets(updatedSets)
		}
	}

	// Function to delete a flashcard set
	const deleteSet = (index: number) => {
		const updatedSets = flashcardSets.filter(
			(_, setIndex) => setIndex !== index
		)
		setFlashcardSets(updatedSets)
	}

	// Function to delete a specific card from a set
	const deleteCard = (setIndex: number, cardIndex: number) => {
		const updatedSets = [...flashcardSets]
		updatedSets[setIndex].cards.splice(cardIndex, 1)
		setFlashcardSets(updatedSets)
	}

	// Function to start editing a flashcard set
	const startEditingSet = (index: number) => {
		setIsEditingSet(true)
		setEditingSetIndex(index)
		setTempSet(flashcardSets[index])
	}

	// Function to start editing a specific card
	const startEditingCard = (setIndex: number, cardIndex: number) => {
		setIsEditingSet(false)
		setEditingSetIndex(setIndex)
		setEditingCardIndex(cardIndex)
		setTempSet({ ...flashcardSets[setIndex] })
	}

	// Function to save edits for a set or card
	const saveEdits = () => {
		const updatedSets = [...flashcardSets]
		if (isEditingSet && editingSetIndex >= 0) {
			updatedSets[editingSetIndex] = tempSet
		} else if (editingCardIndex >= 0) {
			updatedSets[editingSetIndex].cards[editingCardIndex] = tempSet.cards[0]
		}
		setFlashcardSets(updatedSets)
		setIsEditingSet(false)
		setEditingSetIndex(-1)
		setEditingCardIndex(-1)
	}

	const DropdownIcon: React.FC = () => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				position: 'absolute',
				right: '10px',
				top: '50%',
				transform: 'translateY(-50%)',
				pointerEvents: 'none', // Ignore mouse events
			}}
		>
			<path
				d="M5 8L10 13L15 8"
				stroke="#C4C4C4"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)

	return (
		<Container as="main" mt={5} sx={{ maxWidth: '100%' }}>
			<Head>
				<title>Flashcards Page</title>
			</Head>

			{/* Main Flex Container for the two sections */}
			<Flex sx={{ flexDirection: ['column', 'row'], width: '100%' }}>
				{/* Left Section: List of Sets */}
				<Box sx={{ width: ['100%', '50%'], pr: [0, 3], mb: [4, 0] }}>
					<Heading as="h3" mb={3}>
						Flashcard Sets
					</Heading>
					{flashcardSets.map((set, setIndex) => (
						<Box
							key={setIndex}
							mb={3}
							sx={{ bg: 'muted', p: 3, borderRadius: '4px' }}
						>
							<Flex
								sx={{ justifyContent: 'space-between', alignItems: 'center' }}
							>
								<Text
									sx={{
										fontSize: 3,
										fontWeight: 'bold',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
									}}
								>
									{set.title}
								</Text>
								<Box
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'center',
										alignItems: 'center',
										minWidth: '210px',
									}}
								>
									<Button mr={2} onClick={() => startEditingSet(setIndex)}>
										Edit Set
									</Button>
									<Button onClick={() => deleteSet(setIndex)}>
										Delete Set
									</Button>
								</Box>
							</Flex>
							{set.cards.map((card, cardIndex) => (
								<Flex key={cardIndex} mt={2} sx={{ alignItems: 'center' }}>
									<Text sx={{ fontSize: 2, mr: 2 }}>
										{card.front} - {card.back}
									</Text>
									<Button mr={2} onClick={() => startEditingSet(setIndex)}>
										Edit Set
									</Button>
									<Button onClick={() => deleteSet(setIndex)}>
										Delete Set
									</Button>
								</Flex>
							))}
						</Box>
					))}
				</Box>

				{/* Right Section: Flashcard Creation and Editing */}
				<Box sx={{ width: ['100%', '50%'], pl: [0, 3] }}>
					<Heading as="h3" mb={3}>
						Create/Edit Flashcards
					</Heading>
					<Flex sx={{ flexDirection: 'column', mb: 4 }}>
						<Input
							mb={3}
							type="text"
							placeholder="Flashcard Set Title"
							value={currentSet.title}
							onChange={(e) =>
								setCurrentSet({ ...currentSet, title: e.target.value })
							}
						/>
						{currentSet.cards.map((card, index) => (
							<Flex key={index} mb={2}>
								<Input
									mr={2}
									type="text"
									placeholder="Front of Card"
									value={card.front}
									onChange={(e) => {
										const newCards = [...currentSet.cards]
										newCards[index].front = e.target.value
										setCurrentSet({ ...currentSet, cards: newCards })
									}}
								/>
								<Input
									type="text"
									placeholder="Back of Card"
									value={card.back}
									onChange={(e) => {
										const newCards = [...currentSet.cards]
										newCards[index].back = e.target.value
										setCurrentSet({ ...currentSet, cards: newCards })
									}}
								/>
							</Flex>
						))}
						<Box mb={3}>
							<div style={{ position: 'relative' }}>
								<select
									value={selectedSetIndex}
									onChange={(e) => handleSelectSet(Number(e.target.value))}
									style={{
										width: '100%', // Make the select take up the full width of its container
										padding: '10px', // Add some padding
										fontSize: '16px', // Increase the font size
										borderRadius: '4px', // Add some border radius
										border: '1px solid gray', // Add a border
										appearance: 'none', // Remove default appearance
										backgroundColor: 'white', // Set a background color
										paddingRight: '30px', // Make room for the icon
									}}
								>
									<option value={-1}>Select a Set</option>
									{flashcardSets.map((set, index) => (
										<option key={index} value={index}>
											{set.title}
										</option>
									))}
								</select>
								<DropdownIcon />
							</div>
						</Box>
						<Button
							mr={2}
							disabled={selectedSet === null}
							onClick={addCardToSet}
							sx={{
								backgroundColor: selectedSet === null ? 'gray' : 'primary',
								color: 'white',
								cursor: selectedSet === null ? 'not-allowed' : 'pointer',
								marginBottom: '20px',
							}}
						>
							Add Card to Set
						</Button>
						{selectedSet === null && <Text>Select a set to add a card</Text>}
						<Button onClick={addSet}>Create Set</Button>
					</Flex>

					{/* Editing Interface for Set Title */}
					{isEditingSet && editingSetIndex >= 0 && (
						<div>
							<Input
								type="text"
								value={tempSet.title}
								onChange={(e) =>
									setTempSet({ ...tempSet, title: e.target.value })
								}
							/>
							<Button onClick={saveEdits}>Save Set Title</Button>
						</div>
					)}

					{/* Editing Interface for Card Details */}
					{!isEditingSet && editingCardIndex >= 0 && (
						<div>
							<Input
								mb={2}
								type="text"
								placeholder="Front of Card"
								value={tempSet.cards[0].front}
								onChange={(e) =>
									setTempSet({
										...tempSet,
										cards: [{ ...tempSet.cards[0], front: e.target.value }],
									})
								}
							/>
							<Input
								mb={2}
								type="text"
								placeholder="Back of Card"
								value={tempSet.cards[0].back}
								onChange={(e) =>
									setTempSet({
										...tempSet,
										cards: [{ ...tempSet.cards[0], back: e.target.value }],
									})
								}
							/>
							<Button onClick={() => saveEdits()}>Save Card</Button>
						</div>
					)}
				</Box>
			</Flex>
		</Container>
	)
}

export default FlashcardsPage
