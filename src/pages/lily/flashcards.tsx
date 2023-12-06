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
							<Text sx={{ fontSize: 3, fontWeight: 'bold' }}>{set.title}</Text>
							<Button mr={2} onClick={() => startEditingSet(setIndex)}>
								Edit Set
							</Button>
							<Button onClick={() => deleteSet(setIndex)}>Delete Set</Button>
							{set.cards.map((card, cardIndex) => (
								<Flex key={cardIndex} mt={2} sx={{ alignItems: 'center' }}>
									<Text sx={{ fontSize: 2, mr: 2 }}>
										{card.front} - {card.back}
									</Text>
									<Button
										mr={2}
										onClick={() => startEditingCard(setIndex, cardIndex)}
									>
										Edit Card
									</Button>
									<Button onClick={() => deleteCard(setIndex, cardIndex)}>
										Delete Card
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
							<select
								value={selectedSetIndex}
								onChange={(e) => handleSelectSet(Number(e.target.value))}
							>
								<option value={-1}>Select a Set</option>
								{flashcardSets.map((set, index) => (
									<option key={index} value={index}>
										{set.title}
									</option>
								))}
							</select>
						</Box>
						<Button mr={2} onClick={addCardToSet}>
							Add Card to Set
						</Button>
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
