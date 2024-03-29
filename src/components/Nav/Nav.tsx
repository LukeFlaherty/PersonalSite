/* eslint-disable */

import * as React from 'react'
import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'
import { Box, Flex, Container, NavLink as ThemeLink } from 'theme-ui'
import {
	BoxProps,
	NavLinkProps as ThemeNavLinkProps,
} from '@theme-ui/components'
import SkipNavLink from './SkipNavLink'
import Logo from './Logo'
import ColorModeToggle from './ColorModeToggle'
import NotesIcon from './NotesIcon'
import RockClimbingIcon from './RockClimbingIcon'

interface NavLinkProps extends ThemeNavLinkProps {
	href: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, ...props }) => (
	<NextLink href={href} passHref>
		<ThemeLink {...props} />
	</NextLink>
)

const Nav: React.FC<BoxProps> = ({ sx, ...props }) => {
	const { pathname } = useRouter()

	return (
		<Box
			as="nav"
			sx={{
				borderTop: 4,
				borderColor: 'primary',
				paddingTop: [4, null, 5],
				...sx,
			}}
			{...props}
		>
			<Container
				sx={{
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<SkipNavLink />

				<Logo />

				<Flex sx={{ alignItems: 'center' }}>
					<Flex as="ul">
						<li>
							<NavLink
								href="/"
								aria-current={pathname === '/' ? 'page' : null}
								mr={[1, 2]}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								href="/projects"
								aria-current={pathname.includes('/projects') ? 'page' : null}
								mr={[1, 2]}
							>
								Projects
							</NavLink>
						</li>
						<li>
							<NavLink
								href="/blog"
								aria-current={pathname.includes('/blog') ? 'page' : null}
								mr={[1, 2]}
							>
								Blog
							</NavLink>
						</li>
						<li>
							<NavLink
								href="/resume"
								aria-current={pathname.includes('/resume') ? 'page' : null}
								mr={[1, 2]}
							>
								Resume
							</NavLink>
						</li>
					</Flex>

					{/* <RockClimbingIcon ml={[2, 2]} mr={[0, 0]} /> */}

					<NotesIcon ml={[0, 0]} mr={[0, 0]} />

					<ColorModeToggle ml={[0, 0]} />
				</Flex>
			</Container>
		</Box>
	)
}

export default Nav
