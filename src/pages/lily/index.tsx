import * as React from 'react'
import Head from 'next/head'
import { Flex, Grid, Text, Container, Heading, Link } from 'theme-ui'
import {
	Header,
	HeaderDescription,
	HeaderName,
	HeaderTitle,
} from '../../components/Header'
import metadata from '../../constants/metadata.json'

interface Link {
	title: string
	description?: string
	href: string
}

const links: Array<Link> = [
	{
		title: 'Squishmallow Generator',
		description: 'Generate a random squishmallow',
		href: '/lily/squish',
	},
	{
		title: 'Flashcards',
		description: 'This one lets you make flashcards for studying and save them',
		href: '/lily/flashcards',
	},
	{
		title: 'Saved Links',
		description: 'This holds all your important links',
		href: '/lily/savedlinks',
	},
	{
		title: 'Ghibli Movies',
		description: 'This project has your fav ghibli moves to watch',
		href: '/lily/ghibli',
	},
	// Add more links as needed
]

const LilyPage: React.FC = () => (
	<React.Fragment>
		<Head>
			<title key="title">Lily&aposs Page {metadata.titleSuffix}</title>
		</Head>

		<Header>
			<HeaderName>Lily&aposs Page</HeaderName>

			<HeaderTitle>Links for Lily</HeaderTitle>
			<br />
			<HeaderDescription>{'Love ya! <3'}</HeaderDescription>
		</Header>

		<Container as="main" mt={5}>
			<Grid columns={[null, 2]} gap={5} sx={{ counterReset: 'links' }}>
				{links.map((link: Link) => {
					const { title, description, href } = link

					return (
						<Flex
							key={title}
							sx={{
								alignItems: 'baseline',
								position: 'relative',
								counterIncrement: 'links',

								'&::before': {
									content: 'counter(links)',
									position: [null, null, 'absolute'],
									right: '100%',
									marginRight: 3,
									fontSize: [4, 5],
									fontWeight: 'semi-bold',
									lineHeight: 'heading',
									color: 'muted-text',
									userSelect: 'none',
								},
							}}
						>
							<div>
								<Heading>
									<Link variant="ui" href={href}>
										{title}
									</Link>
								</Heading>

								{description && (
									<Text as="p" sx={{ maxWidth: 'measure', marginTop: 2 }}>
										{description}
									</Text>
								)}
							</div>
						</Flex>
					)
				})}
			</Grid>
		</Container>
	</React.Fragment>
)

export default LilyPage
