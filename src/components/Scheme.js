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
	padding: 0.2em;
	margin: 1em;

	background-color: #bbbbbb;
	/* border: 2px solid #00000044; */
	box-shadow: 0px 0px 5px 0px #cccccc88;
	border-radius: 4px;

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: stretch;

	flex-grow: 1;

	position: relative;

	.label {
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 1em;
		padding: .5em;
		border-radius: 3px 10px 3px 10px;
		color: white;
		text-shadow: 1px 1px 4px black;
		box-shadow: 1px 1px 5px 0px #00000088;
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
			align-items: center;

			h3 {
				display: none;
				margin: auto;
				writing-mode: vertical-rl;
				text-orientation: mixed;
				opacity: .5;
			}
		}

		.item-scheme-color:hover {
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
	const firstColor = colors[0];

	const isBackground = mode === "background";
	const Container = isBackground ? BgScheme : itemScheme;
	const childClass = isBackground ? "bg-scheme-color" : "item-scheme-color";

	const colorDivs = colors.map((col, i) => <Color color={col} key={i} className={childClass} />);

	return (
		<>
			{isBackground &&
				<Container>
					{colorDivs}
				</Container>
			}

			{!isBackground &&
				<Container>
					<div className="color-container">
						{colorDivs}
					</div>
					<span className="label"
						style={{ backgroundColor: `#${firstColor}`}}>
						{scheme.tagsName}
					</span>
				</Container>
			}
		</>
	);
}

export default Scheme;