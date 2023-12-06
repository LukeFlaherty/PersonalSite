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
		<Container as="main" mt={5}>
			<Head>
				<title>Flashcards Page</title>
			</Head>

			<Heading>Create Flashcards</Heading>

			{/* Form to create a new flashcard set */}
			<Flex sx={{ flexDirection: 'column' }}>
				<Input
					type="text"
					placeholder="Flashcard Set Title"
					value={currentSet.title}
					onChange={(e) =>
						setCurrentSet({ ...currentSet, title: e.target.value })
					}
				/>
				{currentSet.cards.map((card, index) => (
					<Flex key={index}>
						<Input
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
				{/* Dropdown to select an existing set */}
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
				<Button onClick={addCardToSet}>Add Card to Set</Button>
				<Button onClick={addSet}>Create Set</Button>
			</Flex>

			{/* List of existing flashcard sets */}
			<Box>
				<Heading>Flashcard Sets</Heading>
				{/* List of existing flashcard sets with edit and delete options */}
				{flashcardSets.map((set, setIndex) => (
					<div key={setIndex}>
						<Text>{set.title}</Text>
						<Button onClick={() => startEditingSet(setIndex)}>Edit Set</Button>
						<Button onClick={() => deleteSet(setIndex)}>Delete Set</Button>
						{set.cards.map((card, cardIndex) => (
							<div key={cardIndex}>
								<Text>
									{card.front} - {card.back}
								</Text>
								<Button onClick={() => startEditingCard(setIndex, cardIndex)}>
									Edit Card
								</Button>
								<Button onClick={() => deleteCard(setIndex, cardIndex)}>
									Delete Card
								</Button>
							</div>
						))}
					</div>
				))}
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
						<Button onClick={saveEdits}>Save Card</Button>
					</div>
				)}
			</Box>
		</Container>
	)
}

export default FlashcardsPage
