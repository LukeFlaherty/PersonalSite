import React from 'react'
import Head from 'next/head'
import { Box, Button, Container, Heading, Text } from 'theme-ui'
import Link from '../components/Link'
import { Header, HeaderName, HeaderTitle } from '../components/Header'
import DownloadButton from '../components/DownloadButton'

interface ResumePageProps {}

const ResumePage: React.FC<ResumePageProps> = () => {
	const handleDownloadResume = () => {
		// Add logic to trigger the download of the resume file here
		// For example, you can use a library like file-saver.js or create a download link.
	}
	return (
		<>
			<Head>
				<title key="title">Resume - Luke Flaherty</title>
			</Head>

			<Header>
				<HeaderName style={{ fontSize: '1rem' }}>Resume</HeaderName>
				<HeaderTitle
					style={{
						fontSize: '3rem',
						textAlign: 'center',
						margin: 'auto',
						display: 'block',
						width: 'fit-content',
						maxWidth: '100%',
						marginTop: '2rem',
					}}
				>
					Luke Flaherty
				</HeaderTitle>
			</Header>

			<Container as="main" mt={[2, 3]}>
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
					<Heading as="h2" style={{ fontSize: '2rem' }}>
						EDUCATION
					</Heading>
					<hr style={{ border: '1px solid white', margin: '1rem 0' }} />
					<Text as="p">
						UNCC – University of North Carolina at Charlotte <br />
						B.S. / Bachelors of Science in Computer Science – Artificial
						Intelligence and Robotics <br />
						<span style={{ color: 'hsl(131, 11%, 49%)' }}>GPA: 4.0</span>, Dec
						2021 <br />
						M.A. / Masters of Computer Science – Data Science <br />
						Expected Graduation: TBD
					</Text>
				</Box>

				{/* Work Experience Section */}
				<Box mb={4}>
					<Heading as="h2" style={{ fontSize: '2rem' }}>
						WORK EXPERIENCE
					</Heading>
					<hr style={{ border: '1px solid white', margin: '1rem 0' }} />

					<Box as="article" mb={3}>
						<Heading as="h3">Buildspace - Remote Apprenticeship</Heading>
						<Text as="p">September 2023 – October 2023</Text>
						<ul className="work-experience-bullets">
							<li>
								Selected for a{' '}
								<span style={{ color: 'hsl(131, 11%, 49%)' }}>6-week</span>{' '}
								intensive program (funded by a{' '}
								<span style={{ color: 'hsl(131, 11%, 49%)' }}>
									Y Combinator
								</span>
								, <span style={{ color: 'hsl(131, 11%, 49%)' }}>a16z</span>) to
								build a revolutionary product in a tech community with experts
								from around the world ending in a cumulative demo of a rounded
								project.
							</li>
							<li>
								Developed an impactful web app{' '}
								<span style={{ color: 'hsl(131, 11%, 49%)' }}>
									(see PROJECTS)
								</span>{' '}
								with full marketing strategy and feedback system.
							</li>
						</ul>
					</Box>

					<Box as="article" mb={3}>
						<Heading as="h3">
							Deloitte - Technical Solutions Engineering Consultant
						</Heading>
						<Text as="p">August 2021 – June 2023</Text>
						<ul className="work-experience-bullets">
							<li>
								Interfaced with clients across{' '}
								<span style={{ color: 'hsl(131, 11%, 49%)' }}>5 projects</span>,
								strategically identifying their needs, and leading
								cross-departmental efforts in including Sales, Account
								Management, Engineering, Design, and Product to build and advise
								a solution architecture to best fit the client’s needs.
							</li>
							<li>
								Engineered a{' '}
								<span style={{ color: 'hsl(131, 11%, 49%)' }}>NextJS POC</span>{' '}
								for a landing page of a global cosmetics retailer, successfully
								reducing load times by{' '}
								<span style={{ color: 'hsl(131, 11%, 49%)' }}>~30%</span>,
								educating client engineers, and improving user experience + web
								performance in a legacy system.
							</li>
							<li>
								Designed and executed{' '}
								<span style={{ color: 'hsl(131, 11%, 49%)' }}>
									front-end solutions
								</span>{' '}
								for an online crypto rewards experience for one of Fortune’s
								Most Admired Companies in a{' '}
								<span style={{ color: 'hsl(131, 11%, 49%)' }}>2-week</span> time
								frame that served{' '}
								<span style={{ color: 'hsl(131, 11%, 49%)' }}>millions</span> of
								DAUs
							</li>
							<li>
								Owned UI related operations for one of Deloitte’s best-selling
								proprietary platforms, used by many of the firm’s retail
								clients.
							</li>
						</ul>
					</Box>

					<Box as="article" mb={3}>
						<Heading as="h3">
							Deloitte - Software Engineering Solutions Consulting Intern
						</Heading>
						<Text as="p">April 2021 – August 2021</Text>
						<ul className="work-experience-bullets">
							<li>
								Owned Front-End development deliverables implementing{' '}
								<span style={{ color: 'hsl(131, 11%, 49%)' }}>300+</span> lines
								of production code during fast-paced
								<span style={{ color: 'hsl(131, 11%, 49%)' }}> Agile</span>{' '}
								delivery for a large-scale B2C commerce platform with multiple
								third-parties.
							</li>
							<li>
								Developed and Presented Executive level status reports analyzing
								user behavior from a Data Science POV and made process
								recommendations to increase efficiency and effectiveness.
							</li>

							<li>
								Presented an internal solution to the{' '}
								<span style={{ color: 'hsl(131, 11%, 49%)' }}>
									Senior Architect
								</span>{' '}
								Subgroup addressing an internal solution to AI-assisted product
								recommendations in order to implement best practices in a new
								Deloitte Digital ML Initiative
							</li>
						</ul>
					</Box>
				</Box>

				{/* Projects Section */}
				<Box mb={4}>
					<Heading as="h2" style={{ fontSize: '2rem' }}>
						PROJECTS
					</Heading>
					<hr style={{ border: '1px solid white', margin: '1rem 0' }} />
					<Box as="article" mb={3}>
						<Heading as="h3">
							<Link href="http://juke.fyi">juke.fyi</Link>
						</Heading>

						<Text as="p">Lead Developer / Project Strategist</Text>
						<ul>
							<li>
								Identified a niche market opportunity, creating a blockchain
								platform where music fans can invest in artists through
								artist-specific crypto, mirroring a stock market model that aids
								the artist-listener financial ecosystem.
							</li>
							<li>
								Adhered to modern web-dev principals, integrating complex Web3
								tech such as smart contract factories and account abstraction to
								deliver a secure, decentralized investment experience in digital
								music.
							</li>
							<li>
								Designed a user-first onboarding experience aimed at
								demystifying the blockchain for non-web3 natives, using
								intuitive interfaces to reduce barriers to entry to crypto and
								investment opportunities.
							</li>
						</ul>
					</Box>
					{/* Additional projects would be listed in similar Box components */}
				</Box>

				{/* Skills & Interests Section */}
				<Box mb={4}>
					<Heading as="h2" style={{ fontSize: '2rem' }}>
						SKILLS & INTERESTS
					</Heading>
					<hr style={{ border: '1px solid white', margin: '1rem 0' }} />
					<Text as="p">
						Technical Consulting, Solution Engineering, Strategic Market
						Analysis, Blockchain Technology Application, Modern Web Development
						(NextJS), Web3 & Crypto Wallet Integration, User Experience
						Optimization, Project Management, Music & Entertainment Industry
						Innovation, Technical Communication, Account Abstraction Techniques,
						Performance Optimization, Cross-Functional Team Leadership
					</Text>
				</Box>

				{/* Footer or Additional Information */}
				<Box as="footer" mt={5}>
					<Text as="p" sx={{ textAlign: 'center' }}>
						<Link href="https://github.com/lukeflaherty">
							GitHub Profile for more details and projects
						</Link>
					</Text>
				</Box>

				{/* <Box as="footer" mt={4} mb={0}>
					<Text as="p" sx={{ textAlign: 'center' }}>
						<Link href="">
							<DownloadButton onClick={handleDownloadResume} />
						</Link>
					</Text>
				</Box> */}
				{/* <Box as="footer" mt={4} mb={0}>
					<Text as="p" sx={{ textAlign: 'center' }}>
						<Link href="">Download Resume</Link>
					</Text>
				</Box> */}
				<Box as="footer" mt={4} mb={0}>
					<Text
						as="p"
						style={{ color: 'hsl(131, 11%, 49%)' }}
						sx={{ textAlign: 'center' }}
					>
						{/* Use your custom Link component with the download prop */}
						<Link href="Luke_Flaherty_resume.pdf" download>
							Download Resume
						</Link>
					</Text>
				</Box>
			</Container>
		</>
	)
}

export default ResumePage
