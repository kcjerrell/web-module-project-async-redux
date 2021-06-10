import styled from 'styled-components';
import Color from './Color';

const BgScheme = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: stretch;

	position: absolute;

	left: 0;
	top: 0;
	right: 0;
	bottom: 0;

	z-index: -100;

	.bg-scheme-color {
		border: 5px purple dotted;
		flex-grow: 1;
	}
`;

const itemScheme = styled.div``;

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

	const isBackground = mode === "background";
	const Container = isBackground ? BgScheme : itemScheme;
	const childClass = isBackground ? "bg-scheme-color" : "item-scheme-color";

	const colorDivs = colors.map((col, i) => <Color color={col} key={i} className={childClass}/>);

	return (
		<Container>
			{colorDivs}
		</Container>
	);
}

export default Scheme;