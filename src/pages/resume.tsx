import React from 'react'
import Head from 'next/head'
import { Box, Container, Heading, Text } from 'theme-ui'
import Link from '../components/Link'
import { Header, HeaderName, HeaderTitle } from '../components/Header'

interface ResumePageProps {}

const ResumePage: React.FC<ResumePageProps> = () => {
	return (
		<>
			<Head>
				<title key="title">Resume - Luke Flaherty</title>
			</Head>

			<Header>
				<HeaderName>Resume</HeaderName>
				<HeaderTitle>Luke Flaherty</HeaderTitle>
			</Header>

			<Container as="main" mt={[4, 5]}>
				{/* Contact Information */}
				<Box sx={{ textAlign: 'center', marginBottom: 4 }}>
					<Text as="p">
						<Link href="http://lukejf.com">lukejf.com</Link> |{' '}
						<Link href="https://www.linkedin.com/in/lukeflaherty">
							LinkedIn
						</Link>{' '}
						| <Link href="https://github.com/lukeflaherty">GitHub</Link> |{' '}
						<Link href="mailto:flaherty.luke@yahoo.com">
							flaherty.luke@yahoo.com
						</Link>
					</Text>
				</Box>

				{/* Education Section */}
				<Box mb={4}>
					<Heading as="h2">EDUCATION</Heading>
					<Text as="p">
						UNCC – University of North Carolina at Charlotte <br />
						B.S. / Bachelors of Science in Computer Science – Artificial
						Intelligence and Robotics <br />
						GPA: 4.0, Dec 2021 <br />
						M.A. / Masters of Computer Science – Data Science <br />
						Expected Graduation: TBD
					</Text>
				</Box>

				{/* Work Experience Section */}
				<Box mb={4}>
					<Heading as="h2">WORK EXPERIENCE</Heading>
					{/* Map through work experience items */}
				</Box>

				{/* Skills & Interests Section */}
				<Box mb={4}>
					<Heading as="h2">SKILLS & INTERESTS</Heading>
					<Text as="p">
						Technical Consulting, Solution Engineering, Strategic Market
						Analysis, Blockchain Technology Application, Modern Web Development
						(NextJS), Web3 & Crypto Wallet Integration, User Experience
						Optimization, Project Management, Music & Entertainment Industry
						Innovation, Technical Communication, Account Abstraction Techniques,
						Performance Optimization, Cross-Functional Team Leadership
					</Text>
				</Box>

				{/* Projects Section */}
				<Box mb={4}>
					<Heading as="h2">PROJECTS</Heading>
					{/* Map through projects items */}
				</Box>

				{/* Footer or Additional Information */}
				<Box as="footer" mt={5}>
					<Text as="p" sx={{ textAlign: 'center' }}>
						<Link href="https://github.com/lukeflaherty">
							GitHub Profile for more details and projects
						</Link>
					</Text>
				</Box>
			</Container>
		</>
	)
}

export default ResumePage
