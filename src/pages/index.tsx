/* eslint-disable */

import * as React from 'react'
import type { GetStaticProps } from 'next'
import { Text, Heading, Link, Container } from 'theme-ui'
import getStats, { Stats, Book } from '../lib/getStats'
import pluralize from '../lib/pluralize'

interface ValueCountProps {
	value: number
	singular: string
	plural: string
}

//
const ValueCount: React.FC<ValueCountProps> = ({ value, singular, plural }) => (
	<React.Fragment>
		{value.toLocaleString()} {pluralize(value, singular, plural)}
	</React.Fragment>
)

interface FormattedBookProps {
	book: Book
}

const FormattedBook: React.FC<FormattedBookProps> = ({ book }) => (
	<React.Fragment>
		&ldquo;{book.name}&rdquo; by {book.author}
	</React.Fragment>
)

interface BooksToSentenceProps {
	books: Array<Book>
}

const BooksToSentence: React.FC<BooksToSentenceProps> = ({ books }) => {
	if (books.length === 1) return <FormattedBook book={books[0]} />

	if (books.length === 2)
		return (
			<React.Fragment>
				<FormattedBook book={books[0]} /> and <FormattedBook book={books[1]} />
			</React.Fragment>
		)

	return (
		<React.Fragment>
			{books.map((book, index) => {
				if (index === 0) return <FormattedBook book={book} />

				if (index + 1 === books.length) {
					return (
						<React.Fragment>
							, and <FormattedBook book={book} />
						</React.Fragment>
					)
				}

				return (
					<React.Fragment key={book.name}>
						, <FormattedBook book={book} />
					</React.Fragment>
				)
			})}
		</React.Fragment>
	)
}

interface IndexProps {
	stats: Stats
}

const IndexPage: React.FC<IndexProps> = ({ stats }) => {
	const {
		commits = 0,
		tweets = 0,
		steps = 0,
		places = 0,
		songs = 0,
		album = null,
		books = [],
	} = stats

	return (
		<Container>
			<Text as="p" variant="section-heading" mb={3}>
				Introduction
			</Text>

			{/* my header
			<Text as="div" variant="site-intro" sx={{ display: 'contents' }}>
				<Heading as="h1" variant="site-intro" sx={{ fontWeight: 'bold' }}>
					My name is Luke Flaherty and I am an engineer.
				</Heading>{' '}
				<Heading as="h2" variant="site-intro">
					Currently, I am working at{' '}
					<Link href="https://deloitte.com">Deloitte</Link> building scalale and
					efficient web-based experiences for retail brands with next gen
					technologies.
				</Heading>{' '}
				<Text as="p" variant="site-intro">
					I am interested in exploring Web3, The Metaverse, Drone Technology,
					and Nuclear Energy.
				</Text>
			</Text> */}

			{/* my new header */}
			<Text as="div" variant="site-intro" sx={{ display: 'contents' }}>
				<Heading as="h1" variant="site-intro" sx={{ fontWeight: 'bold' }}>
					My name is Luke Flaherty and I am an engineer.
					<br />
					<br />
				</Heading>{' '}
				<Heading as="h2" variant="site-intro">
					Graduate of <Link href="https://www.charlotte.edu/">UNCC</Link> B.S.
					in{' '}
					<Link href="https://cci.charlotte.edu/departments/computer-science/about-us/">
						Computer Science: ML And Robotics
					</Link>{' '}
					<br />+ 1/2 M.A in{' '}
					<Link href="https://dsba.charlotte.edu/about-us/program-overview">
						Data Science
					</Link>
					<br />
					<br />
					Left college early to build cutting edge Web Experiences @{' '}
					<Link href="https://deloitte.com">Deloitte</Link>
					<br />
					<br />I left in June 2023 to build @{' '}
					<Link href="https://juke.fyi">Juke.fyi</Link>
					<br />
					<br />I am now taking a step back from Juke and am searching for my
					next opportunity to build!
					<br />
					<br />
					<Heading as="h1" variant="site-intro" sx={{ fontWeight: 'bold' }}>
						{/* <Link href="https://calendly.com/lukejflaherty" target="_blank"> */}
						<Link href="/" target="_blank">
							Press HERE to talk more!
						</Link>{' '}
					</Heading>{' '}
				</Heading>{' '}
			</Text>
		</Container>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const stats = await getStats()

	return {
		props: {
			stats,
		},
		revalidate: 60 * 60, // revalidate at most once per hour
	}
}

export default IndexPage
