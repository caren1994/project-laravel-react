import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export default function Login () {
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [ isDisabled, setDisabled ] = useState(true);
	const [ error, setError ] = useState(null);
	const [ user, setUser ] = useState("");
	const MIN_LENGTH_PASSWORD = 5;

	useEffect(() => {
		axios.defaults.withCredentials = true;
		axios.get("http://localhost:8000/sanctum/csrf-cookie").then((data) => {
			console.log(data);
		});
	}, []);
	useEffect(() => {
		const vEmail = /^\S+@\S+\.\S+$/;
		const isEmailvalid = email.match(vEmail) != null;
		const isPasswordvalid = password.length >= MIN_LENGTH_PASSWORD;
		setDisabled(!(isEmailvalid && isPasswordvalid));
	}, [ password, email ]);

	const handleSubmit = () => {
		try {
			const token = document.cookie.split("=")[1];
			console.log(token);
			const { data } = axios.post("http://localhost:8000/api/login", {
				email,
				password
			}, { headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": token } });
		} catch (err) {
			setError(err.response.data.message);
		}
	};
	return (

	// flex min-h-screen flex-col items-center justify-between p-24
		<>
			<main className=" mainPage">
				{/* <div className="bg-white max-w-6xl border-4 border-solid border-red-900   "> */}
				<form className="formulario  ">
					<div className=" divCircle bg-fuchsia-800 ">
						<span style={{ fontSize: "3.5em", color: "white" }}>
							<AiOutlineUser
							/>
						</span>
					</div>
					<div className=" divInput">
						<label htmlFor="email" className=" label">
							<input type="email" name="email" id="email" placeholder="email"
								className="input"
								value={email}
								onChange={({ target }) => setEmail(target.value)} />
						</label>

						<label htmlFor="password" className=" label" >
							<input type="password" name="password" id="password" placeholder="password"
								className="input"
								value={password}
								onChange={({ target }) => setPassword(target.value)} />
						</label>
						<Link to="/register" className="mb-9 text-orange-400 ">Não possui cadastro?</Link>
						<button type="button" className=" button bg-orange-300 " disabled={ isDisabled } onClick={handleSubmit}>Enter</button>
						{error && (
							<p className="text-red-700">
								{error}
							</p>)}

					</div>
				</form>
				{/* </div> */}
			</main>
		</>
	);
}
