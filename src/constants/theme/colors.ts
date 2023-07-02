// const orange = (l = 50) => `hsl(35, 90%, ${l}%)`
const mutedGreen = (l = 50) => `hsl(131, 11%, 49%)`
const gray = (l = 72) => `hsl(38, 8%, ${l}%)`
const lightGreyThing = (l = 83) => `hsl(46, 15%, ${l}%)`

const colors = {
	black: gray(15),
	white: gray(100),

	text: gray(25),
	background: lightGreyThing(83),
	primary: mutedGreen(),
	secondary: mutedGreen(60),
	accent: mutedGreen(),
	highlight: mutedGreen(),
	muted: lightGreyThing(77),
	'muted-text': gray(39), // 40 is just under contrast, this gets the same look
	border: gray(80),

	modes: {
		dark: {
			text: gray(95),
			background: gray(30),
			primary: mutedGreen(),
			secondary: mutedGreen(40),
			accent: mutedGreen(),
			highlight: mutedGreen(),
			muted: gray(25),
			'muted-text': gray(61), // 60 is just under contrast, this gets the same look
			border: gray(40),
		},
	},
}

export default colors
