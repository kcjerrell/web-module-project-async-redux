import { useState } from 'react';
import styled from 'styled-components';
import { getOnColor } from '../helpers';
import Color from './Color';

const BgScheme = styled.div`
	width: 100%;
	height: 100%;

	position: absolute;

	left: 0;
	top: 0;
	right: 0;
	bottom: 0;

	z-index: -100;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: stretch;

	.bg-scheme-color {
		flex-grow: 1;

		display: flex;
		flex-direction: column-reverse;
	}
`;

const itemScheme = styled.div`
	/* width: 12em; */
	min-width: 10em;
	height: 12em;
	padding: 0em;
	margin: 1em;

	background-color: #bbbbbb;
	/* border: 2px solid #00000044; */
	/* box-shadow: 0px 0px 5px 0px #cccccc88; */
	border-radius: 4px;

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: stretch;

	flex-grow: 1;

	position: relative;

	svg {
		width: 100%;
	}

	.label {
		background-color: unset;
		color: unset;
		position: absolute;
		bottom: 0;
		margin: 1em;
		padding: .5em;
		border-radius: 3px 10px 3px 10px;
		/* text-shadow: 2px 0px 4px currentColor; */
		/* box-shadow: 1px 1px 5px 0px #00000088; */
		border: 3px solid #00000044;
	}

	.color-container {
		display: flex;
		flex-direction: row;
		/* justify-content: space-evenly; */
		align-items: stretch;

		flex-grow: 1;

		.item-scheme-color {
			flex-grow: 1;
			width: 4em;
			display: flex;

			h3 {
				display: none;
				writing-mode: vertical-rl;
				text-orientation: mixed;
				opacity: .4;
				margin: auto;
				font-size: 3.5em;
				font-family: monospace;
			}
		}

		.item-scheme-color:hover {
			border: 0px solid black !important;

			h3 {
				display: block;
			}
		}
	}
`;

// A Scheme is basically a collection of colors
// A Scheme component is a collection of Color components
/**
 * @property {string} mode
 * @param {any} props
 * @returns
 */
const Scheme = props => {
	const { scheme, mode } = props;
	const { colors } = scheme;

	const [state, setState] = useState({ a: 0, b: 0 });
	const [isLabelOnRight, setIsLabelOnRight] = useState(true);

	const labelColor = isLabelOnRight ? colors[0] : colors[colors.length - 1];

	if (!labelColor)
		debugger;

	const isBackground = mode === "background";
	const Container = isBackground ? BgScheme : itemScheme;
	const childClass = isBackground ? "bg-scheme-color" : "item-scheme-color";

	const childHover = i => {
		const handleMouseEnter = e => {
			const onRight = i <= colors.length / 2;
			if (isLabelOnRight !== onRight)
				setIsLabelOnRight(onRight);
		}

		return handleMouseEnter;
	};

	const colorDivs = colors.map((col, i) => <Color color={col} key={i} className={childClass} onMouseEnter={childHover(i)} />);

	// I keep going back on forth on whether I should use inline styles or inject into the styled componenets
	// the former makes the most sense though, because otherwise it makes a new css class for every single color

	const labelStyle = {
		backgroundColor: labelColor.hex,
		color: labelColor.onColor,
		right: isLabelOnRight ? 0 : "unset",
		left: isLabelOnRight ? "unset" : 0,
	};

	const handleKeyDown = e => {
		e.preventDefault();
		let d = 0;

		if (e.button === 0) d = 1;
		else if (e.button === 2) d = -1;

		if (e.shiftKey)
			setState({ ...state, a: state.a + d });
		else
			setState({ ...state, b: state.b + d });
	}

	return (
		<>
			{isBackground &&
				<Container>
					{colorDivs}
				</Container>
			}

			{!isBackground &&
				<Container onMouseDown={handleKeyDown} a={state.a} b={state.b}>
					<div className="color-container">
						{colorDivs}
					</div>
					<span className="label" style={labelStyle}>
						{scheme.name}
					</span>
				</Container>
			}
		</>
	);
}

export default Scheme;