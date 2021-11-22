import React, { useState } from "react";

const UserAdd = (props) => {
	const [number, setNumber] = useState(0);
	return (
		<div>
			用户名: <input />
			<button onClick={() => setNumber((number) => number + 1)}>
				{number}
			</button>
		</div>
	);
};

export default UserAdd;
