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
	const [ errorDelete, setErrorDelete ] = useState(null);
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
			console.log(response.data);
			const result = response.data;
			setPosts([ ...post, result ]);
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

	const handleDelete = async (id) => {
		try {
			const tokenUser = getToken("token");
			const token = document.cookie.split("=")[1];
			console.log(token);
			const headers = {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-XSRF-TOKEN": token,

				Authorization: `Bearer ${tokenUser}`
			};
			await axios.delete(`http://localhost:8000/api/post/${id}`,
				{ headers });
			const PostsUpdates = post.filter((item) => item.id !== id);
			setPosts(PostsUpdates);
		} catch (err) {
			setErrorDelete(err.response.data.message);
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
						{

							error && (
								<p className="mt-3 text-center text-red-700">
									{error}
								</p>)
						}

					</div>
				</form>
			</section>
			{post.length === 0 && (
				<p className="mt-6 text-center text-red-700">
								Posts não encontrados
				</p>)}
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
							<div key={Post.id} className=" mb-20 mt-10 flex w-screen flex-col items-center border-b-2 border-solid border-orange-600 shadow-xl md:w-6/12">
								<p className="mt-3">{Post.name}</p>

								<h1 className="  text-center text-2xl font-bold">{Post.title}</h1>
								<div className="mt-3 flex flex-row">
									<section className="flex flex-row justify-evenly space-x-7 px-1">

										<p className="">{Post.content}</p>
										<button type="button" className=" h-8 w-20 rounded  bg-fuchsia-800 text-white"
											onClick={() => handleSubmit(Post.id)}>Ver Post</button>
									</section>
									<button type="button" className="h-8 w-20 rounded bg-amber-400 text-black"
										onClick={() => handleDelete(Post.id)}>Excluir</button>
								</div>
								{

									errorDelete && (
										<p className="mt-3 text-center text-red-700">
											{errorDelete}
										</p>)
								}

							</div>
						))
				}
			</section>
		</>
	);
};
