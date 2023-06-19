import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { BsArrowLeft } from "react-icons/bs";
import { getToken } from "../utils/useLocalStorage";
import axios from "axios";

export default function Post () {
	const [ error, setError ] = useState(null);
	const [ errorComment, setErrorComment ] = useState(null);
	const [ errorBusca, setErrorBusca ] = useState(null);
	const [ post, setPost ] = useState([]);
	const [ comments, setComments ] = useState([]);
	const [ content, setContent ] = useState("");

	const params = useParams();
	const id = params.id;

	const postOne = async () => {
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

			setPost([ response.data ]);
			console.log([ response.data ]);
		} catch (err) {
			setError(err.response.data.message);
			console.log(err);
		}
	};
	const Comments = async () => {
		try {
			const tokenUser = getToken("token");
			const token = document.cookie.split("=")[1];

			const headers = {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-XSRF-TOKEN": token,
				Authorization: `Bearer ${tokenUser}`
			};
			const response = await axios.get(`http://localhost:8000/api/comment/${id}`,
				{ headers });

			setComments(response.data);
			console.log(response.data);
		} catch (err) {
			setErrorBusca(err.response.data.message);
			console.log(err);
		}
	};
	useEffect(() => {
		postOne();
		Comments();
	}, []);

	console.log(history);

	const handleCreate = async () => {
		try {
			const post = params.id;
			const tokenUser = getToken("token");
			const token = document.cookie.split("=")[1];
			const name = localStorage.getItem("name");

			const headers = {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-XSRF-TOKEN": token,
				Authorization: `Bearer ${tokenUser}`
			};
			const response = await axios.post("http://localhost:8000/api/comment", {
				name,
				content,
				post
			},
			{ headers });
			const result = response.data;
			setComments([ ...comments, result ]);
			console.log(response);
		} catch (err) {
			setErrorComment(err.response.data.message);
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
			await axios.delete(`http://localhost:8000/api/comment/${id}`,
				{ headers });
			const commentsUpdates = comments.filter((item) => item.id !== id);
			setComments(commentsUpdates);
		} catch (err) {
			setError(err.response.data.message);
			console.log(err);
		}
	};

	return (
		<>
			<a href="/forum" className="mb-9 mr-3 mt-3 flex  flex-row  px-2 text-orange-400"> <BsArrowLeft style={{ fontSize: "1.8em" }}/></a>
			<section className="flex flex-col items-center">
				<h1 className="text-2xl text-orange-600">Comente e ajude um colega Desenvolvedor</h1>
				{
					post.length > 0 && post.map((Post) => (
						<div key={Post.id} className=" mb-20 mt-10  rounded-md border-2  border-solid border-fuchsia-800 py-6 shadow-xl md:w-4/12">
							<p className="mt-3">{Post.name}</p>

							<h1 className=" py-2 text-center text-2xl font-bold">{Post.title}</h1>

							<section className="flex flex-row space-x-20 px-3">

								<p className="text-center">{Post.content}</p>

								{error && (
									<p className="text-red-700">
										{error}
									</p>)}
							</section>
						</div>
					))}
			</section>
			<section className="flex flex-col items-center ">
				<section className=" flex h-20 flex-row items-center justify-between space-x-6 ">
					<label htmlFor='comment'>
						<input type='text' id='comment' placeholder="seu comentário" className="ml-2 h-20 rounded-md border-2 border-solid border-amber-600 px-2 "
							value={content} onChange={({ target }) => setContent(target.value)} />
					</label>
					<button type="button" className=" mr-2 h-8 w-20  rounded-md  bg-fuchsia-800 text-white"
						onClick={handleCreate}>Responder</button>
				</section>
			</section>
			{
				errorComment && (
					<p className="mt-4 text-center text-red-700">{errorComment}</p>
				)}
			<section className="flex flex-col items-center">
				{
					comments.length > 0 && comments.map((item) => (
						<div key={item.id} className=" mb-10 mt-14 items-center border-y-2 border-solid border-slate-200 text-center shadow-xl md:w-screen md:border-none md:py-3">
							<p className="mt-3">{item.name}</p>

							<h1 className=" py-2 text-center  text-2xl font-bold">{item.content}</h1>
							<button type="button" className=" w-20 rounded  bg-fuchsia-800 text-white" onClick={() => handleDelete(item.id)}>X</button>

						</div>
					))

				}
			</section>
			{
				comments.length === 0 && (
					<p className="mt-4 text-center">{errorBusca}</p>
				)}
		</>
	);
}
