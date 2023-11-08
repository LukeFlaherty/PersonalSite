// import * as React from 'react'
// import { default as NextLink } from 'next/link'
// import { Link as ThemeUILink } from 'theme-ui'
// import { LinkProps as ThemeLinkProps } from '@theme-ui/components'

// interface LinkProps extends ThemeLinkProps {
// 	href: string
// }

// const Link: React.FC<LinkProps> = ({ href, ...props }) => (
// 	<NextLink href={href} passHref>
// 		<ThemeUILink {...props} />
// 	</NextLink>
// )

// export default Link

import * as React from 'react'
import { default as NextLink } from 'next/link'
import { Link as ThemeUILink } from 'theme-ui'
import { LinkProps as ThemeLinkProps } from '@theme-ui/components'

interface LinkProps extends ThemeLinkProps {
	href: string
	download?: boolean // Add the download prop
}

const Link: React.FC<LinkProps> = ({ href, download, ...props }) => {
	if (download) {
		return (
			<a
				href={href}
				download
				{...props}
				style={{
					color: 'hsl(131, 11%, 49%)',
					transition: 'color 0.2s ease-in-out',
				}}
			>
				{props.children}
			</a>
		)
	}

	return (
		<NextLink href={href} passHref>
			<ThemeUILink {...props} />
		</NextLink>
	)
}

export default Link
