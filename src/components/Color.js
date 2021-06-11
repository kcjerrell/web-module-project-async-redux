import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getColorInfo } from '../api/colr';

const Color = props => {
	const { color } = props;
	const [colorInfo, setColorInfo] = useState();

	const [isMouseOver, setIsMouseOver] = useState();

	useEffect(() => {
		async function fetchColorInfo() {
			try {
				const info = await getColorInfo(color);
				setColorInfo(info);
			}
			catch (error) {
				console.log(error);
			}
		}

		//fetchColorInfo();
	})

	const onMouseEnter = e => {
		props.onMouseEnter(e);
		setIsMouseOver(true);
	}

	const onMouseLeave = e => {
		setIsMouseOver(false);
	}

	const style = {
		backgroundColor: color.hex,
		color: color.onColor,
		borderTop: `15px solid ${color.highShade}`,
		// borderLeft: `2px dashed ${color.lowShade}`,
		borderBottom: `15px solid ${color.lowShade}`,
		// borderRight: `2px solid ${color.lowShade}`,
		// boxShadow: `0px 0px 10px 4px ${isMouseOver ? color.highShade : color.lowShade}`,
		zIndex: 0
	}

	return (
		<div style={style} className={props.className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				<h3>{color.hex}</h3>
		</div>
	)
}

export default Color;