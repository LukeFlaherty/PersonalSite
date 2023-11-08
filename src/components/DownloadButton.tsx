/* eslint-disable */

import * as React from 'react'
import { Button as ThemeUIButton, useColorMode } from 'theme-ui'
import { VisuallyHidden } from '@reach/visually-hidden'
import { ButtonProps } from '@theme-ui/components'

const DownloadButton: React.FC<ButtonProps> = ({ onClick }) => {
	const [colorMode, setColorMode] = useColorMode()

	return (
		<ThemeUIButton
			variant="color-mode-toggle"
			onClick={onClick}
			sx={{
				border: 'none',
				backgroundColor: 'transparent',
				cursor: 'pointer',
				fontSize: '24px', // Adjust the icon size as needed
				padding: 0,
				margin: 0,
				'&:hover': {
					color: 'hsl(131, 11%, 49%)', // Change the icon color on hover
				},
			}}
		>
			<VisuallyHidden>Download Resume</VisuallyHidden>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke={colorMode === 'default' ? 'currentColor' : 'white'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<line x1="12" y1="3" x2="12" y2="15" />
				<polyline points="7 8 12 13 17 8" />
				<path d="M21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5" />
			</svg>
		</ThemeUIButton>
	)
}

export default DownloadButton
