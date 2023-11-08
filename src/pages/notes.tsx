import * as React from 'react'
import Head from 'next/head'
import { Header, HeaderName, HeaderTitle } from '../components/Header'
import metadata from '../constants/metadata.json'
import { Meta } from '../types/posts'

interface NotesPageProps {
	posts: Meta[]
}

const NotesPage: React.FC<NotesPageProps> = () => {
	return (
		<React.Fragment>
			<Head>
				<title key="title">Notes {metadata.titleSuffix}</title>
			</Head>

			<Header>
				<HeaderName>Take Notes</HeaderName>

				<HeaderTitle>Temp notes for whoever wants to use this</HeaderTitle>
			</Header>
		</React.Fragment>
	)
}

export default NotesPage
