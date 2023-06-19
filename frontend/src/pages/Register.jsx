import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function Login () {
	const history = useHistory();
	const [ name, setName ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ error, setError ] = useState(null);

	const handleSubmit = async () => {
		try {
			const token = document.cookie.split("=")[1];
			console.log(token);

			const response = await axios.post("http://localhost:8000/api/register", {
				name,
				email,
				password
			}, { headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": token } });
			console.log(response);
			history.push("/");
		} catch (err) {
			setError(err.response.message);
		}
	};

	return (
		<>
			<main className=" mainPage">
				<form className="formulario">

					<div className="divCircle  bg-yellow-400">
						<span style={{ fontSize: "3.5em", color: "white" }}>
							<AiOutlineUser
							/>
						</span>
					</div>
					<div className=" divInput" >
						<label htmlFor="name" className=" label" >
							<input type="text" name="name" id="name" placeholder="name" className=" input "

								value={name}
								onChange={({ target }) => setName(target.value)} />
						</label>

						<label htmlFor="email" className="label" >
							<input type="email" name="email" id="email" placeholder="email" className="input"

								value={email}
								onChange={({ target }) => setEmail(target.value)} />
						</label>

						<label htmlFor="password" className="label" >
							<input type="password" name="password" id="password" placeholder="password" className="input"

								value={password}
								onChange={({ target }) => setPassword(target.value)} />
						</label>
						<button type="button" className="button  bg-fuchsia-800" onClick={handleSubmit}>Enter</button>
					</div>
					{error && <p className="mt-3 text-center text-red-700">{error}</p>
					}
				</form>

			</main>
		</>
	);
}
