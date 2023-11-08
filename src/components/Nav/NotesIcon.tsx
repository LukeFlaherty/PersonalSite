/* eslint-disable */

import * as React from 'react'
import { useColorMode, Button } from 'theme-ui'
import { VisuallyHidden } from '@reach/visually-hidden'
import { ButtonProps } from '@theme-ui/components'

// Icons courtesy of Feather
// @link https://feathericons.com/

const NotesIcon: React.FC<ButtonProps> = (props) => {
	return (
		<Button
			onClick={() => {
				window.open('https://silly-perlman-55a758.netlify.app', '_blank')
			}}
			variant="color-mode-toggle"
			sx={{
				svg: { width: '1em', height: '1em', transform: 'translateY(-1px)' },
			}}
			{...props}
		>
			<VisuallyHidden>Open Notes App</VisuallyHidden>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-clipboard"
			>
				<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
				<rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
			</svg>
		</Button>
	)
}

export default NotesIcon
