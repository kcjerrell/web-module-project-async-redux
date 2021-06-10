import styled from 'styled-components';
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
	padding: .2em;
	margin: 1em;

	background-color: #bbbbbb;
	border: 1px solid #777777;
	box-shadow: 0px 0px 5px 1px #444444;
	border-radius: 4px;

	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: stretch;

	flex-grow: 1;

	position: relative;

	.label {
		/* position: absolute;
		bottom: 0; */
	}

	.color-container {
		display: flex;
		flex-direction: row;
		/* justify-content: space-evenly; */
		align-items: stretch;
		background-color: ${props => props.firstColor};

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
				<Container firstColor={firstColor}>
					<div className="color-container">
						{colorDivs}
					</div>
					<span className="label">{scheme.tagsName}</span>
				</Container>
			}
		</>
	);
}

export default Scheme;