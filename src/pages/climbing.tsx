import * as React from 'react'
import Head from 'next/head'
import { Box, Grid, Text, Container, Heading } from 'theme-ui'
import { useEffect } from 'react'
import { Header, HeaderName, HeaderTitle } from '../components/Header'
import Link from '../components/Link'
import metadata from '../constants/metadata.json'
import { allPosts } from '../lib/posts'
import { Meta } from '../types/posts'
import climbingDescriptions from '../constants/climbingDescriptions.json'

interface ClimbingPageProps {
	posts: Meta[]
}

const ClimbingPage: React.FC<ClimbingPageProps> = () => {
	return (
		<React.Fragment>
			<Head>
				<title key="title">Climbing {metadata.titleSuffix}</title>
			</Head>

			<Header>
				<HeaderName>Climbing</HeaderName>

				<HeaderTitle>Follow my Progression</HeaderTitle>
			</Header>

			<Container as="main" mt={[4, 5]}>
				<Grid columns={[null, 2, '27rem 1fr']} gap={[4, 5]}>
					{climbingDescriptions.map((description, index) => {
						return (
							<Box
								key={description.title}
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
									p: [4, 5],
									border: '5px solid',
									borderColor: 'muted-text',
									borderRadius: '5%',
									boxShadow: 'default',
									backgroundColor: 'background',
									color: 'text',
									userSelect: 'none',
								}}
							>
								<Heading as="h3" sx={{ fontSize: [4, 5] }}>
									{description.title}
								</Heading>
								<Text sx={{ fontSize: [2, 3] }}>{description.description}</Text>
								<Heading as="h3" sx={{ fontSize: [4, 5] }}>
									{description.grade}
								</Heading>
								<div
									dangerouslySetInnerHTML={{
										__html: description.vimeoEmbedd,
									}}
								></div>
							</Box>
						)
					})}
					{/* <div
						dangerouslySetInnerHTML={{
							__html: climbingDescriptions[0].vimeoEmbedd,
						}}
					></div> */}
				</Grid>
			</Container>
		</React.Fragment>
	)
}

export default ClimbingPage
