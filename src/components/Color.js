import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getColorInfo } from '../api/colr';

const Color = props => {
	const { color } = props;
	const [colorInfo, setColorInfo] = useState();

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

		fetchColorInfo();
	})

	const style = {
		backgroundColor: `#${color}`,
		color: colorInfo ? colorInfo.onColor : 'inherit',
	}

	return (
		<div style={style} className={props.className}>
			<h3>#{color}</h3>
		</div>
	)
}

export default Color;