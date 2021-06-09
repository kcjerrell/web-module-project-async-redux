import styled from 'styled-components';
import Color from './Color';

const BgPalette = styled.div`
	width: 400px;
	height: 400px;

	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: stretch;
`;

const itemPalette = styled.div``;

// A Palette is basically a collection of colors
// A Palette component is a collection of Color componenets
const Palette = props => {
	const { palette } = props;
	const { colors } = palette;

	const colorDivs = colors.map(col => <Color color={col} id={col} />);

	return (
		<BgPalette>
			{colorDivs}
		</BgPalette>
	);
}

export default Palette;