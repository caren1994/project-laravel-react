import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { getToken } from "../utils/useLocalStorage";

export default function Forum () {
	const [ title, setTitle ] = useState("");
	const [ content, setContent ] = useState("");
	const [ category, setCategory ] = useState("javascript");
	const [ response, setResponse ] = useState("");
	const [ error, setError ] = useState(null);
	const [ errorBusca, setErrorBusca ] = useState(null);
	const [ post, setPosts ] = useState([]);
	const [ nameCategory, setNameCategory ] = useState("");

	const history = useHistory();

	useEffect(() => {
		alllPosts();
	}, []);

	const alllPosts = () => {
		try {
			const token = document.cookie.split("=")[1];
			const tokenUser = getToken("token");

			const headers = {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-XSRF-TOKEN": token,
				Authorization: `Bearer ${tokenUser}`
			};
			axios.get("http://localhost:8000/api/post",
				{ headers })
				.then((dt) => {
					setPosts(dt.data);
					console.log(dt.data);
				});
		} catch (err) {
			setError(err.data.message);
		}
	};
	console.log(setError);

	const handleCreate = async () => {
		try {
			const tokenUser = getToken("token");
			const name = localStorage.getItem("name");
			const token = document.cookie.split("=")[1];
			const headers = {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-XSRF-TOKEN": token,
				Authorization: `Bearer ${tokenUser}`
			};
			const response = await axios.post("http://localhost:8000/api/post", {
				title,
				name,
				category,
				content
			}, { headers });
			console.log(response);
			setResponse(response.data.message);
		} catch (err) {
			setError(err.response.data.message);
			console.log(err);
		}
	};

	const handleSearch = async () => {
		try {
			const tokenUser = getToken("token");
			const token = document.cookie.split("=")[1];
			const headers = {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-XSRF-TOKEN": token,
				Authorization: `Bearer ${tokenUser}`
			};
			const response = await axios.get(`http://localhost:8000/api/category/${nameCategory}`,
				{ headers });

			setPosts(response.data);
			console.log(response.data);
		} catch (err) {
			setErrorBusca(err.response.data.message);
		}
		setErrorBusca(null);
	};

	const handleSubmit = async (id) => {
		try {
			const tokenUser = getToken("token");
			const token = document.cookie.split("=")[1];
			const headers = {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-XSRF-TOKEN": token,
				Authorization: `Bearer ${tokenUser}`
			};
			const response = await axios.get(`http://localhost:8000/api/post/${id}`,
				{ headers });
			history.push(`/post/${id}`);
			console.log(response);
		} catch (err) {
			setError(err.response);
			console.log(err);
		}
	};
	return (
		<>
			<section className=" sectionCreate">
				<h2 className="mt-4 text-center text-xl">Crie seu Post e tire sua dúvida!</h2>
				<form className=" formularioForum  border-4 border-solid border-amber-400">
					<div className=" divICreate ">
						<label className="labelForum">
							<input type="text"className=" inputForum" placeholder="title" onChange={({ target }) => setTitle(target.value)}/>
						</label>
						<label className="labelForum">
							<input type="text" className="inputForumContent" placeholder="content" onChange={({ target }) => setContent(target.value)}/>
						</label>
						<label htmlFor="category">

							<select
								id="category"
								className=" w-24 rounded bg-amber-400 text-center "
								value={ category }
								onChange={ ({ target }) => setCategory(target.value) }
							>
								<option value="javascript">javascript</option>
								<option value="python">python</option>
								<option value="php">php</option>
							</select>
						</label>
						<button type="button" className="buttonForum" onClick={handleCreate}>Create</button>
						{response && (
							<p className="text-red-700">
								{response}
							</p>)}
						{error && (
							<p className="text-red-700">
								{error}
							</p>)}

					</div>
				</form>
			</section>
			<section className=" mb-2 ml-32 mt-10  flex flex-row space-x-2">

				<p>Busque por:</p>
				<label htmlFor="Busca">

					<select
						id="Busca"
						className=" w-24 rounded bg-amber-400 text-center "
						value={ nameCategory }
						onChange={ ({ target }) => setNameCategory(target.value) }
					>
						<option value="javascript">javascript</option>
						<option value="python">python</option>
						<option value="php">php</option>
					</select>
				</label>
			</section>
			<button type="button" className="buttonForum ml-36" onClick={handleSearch}>Buscar</button>

			<section className=" mt-2 flex flex-col items-center">
				{

					errorBusca
						? (
							<p className="text-red-700">
								{errorBusca}
							</p>)
						: post.map((Post) => (
							<div key={Post.id} className=" mb-20 mt-10 flex flex-col items-center border-b-2 border-solid border-orange-600 shadow-xl md:w-6/12">
								<p className="mt-3">{Post.name}</p>

								<h1 className=" py-2 text-center text-2xl font-bold">{Post.title}</h1>

								<section className="flex flex-row justify-between space-x-20 px-3">

									<p className="text-center">{Post.content}</p>
									{/* <a href={`/post/${Post.id}`} className="mb-9 text-orange-400 ">Ver Post</a> */}
									<button type="button" className=" w-20 rounded  bg-fuchsia-800 text-white"
										onClick={() => handleSubmit(Post.id)}>Ver Post</button>
								</section>
							</div>
						))
				}
			</section>
		</>
	);
};
