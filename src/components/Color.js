import { useState } from 'react';
import styled from 'styled-components';

const Color = props => {
	const [colorInfo, setColorInfo] = useState();

	const { color } = props;

	const style = {
		backgroundColor: `#${color}`,
	}

	return (
		<div style={style} className={props.className}>
			<h3>#{color}</h3>

			{colorInfo &&
				<>
					<h4>{colorInfo.title}</h4>
				</>
			}
		</div>
	)
}

export default Color;