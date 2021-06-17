import { useEffect, useState } from 'react';
import { getColorInfo } from '../api/colr';

const SchemeColorItem = props => {
	const { color } = props;

	//const [colorInfo, setColorInfo] = useState();
	//const [isMouseOver, setIsMouseOver] = useState();

	const onMouseEnter = e => {
		props.onMouseEnter(e);
		//setIsMouseOver(true);
	}

	const onMouseLeave = e => {
		//setIsMouseOver(false);
	}

	const style = {
		backgroundColor: color.hex,
		color: color.onColor,
		// borderColor: props.borderColor,
		// borderTop: `15px solid ${color.highShade}`,
		// borderBottom: `15px solid ${color.lowShade}`,
		zIndex: 0
	}

	return (
		<div style={style} className={props.className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				<h3>{color.hex}</h3>
		</div>
	)
}

export default SchemeColorItem;