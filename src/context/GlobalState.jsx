import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const [recipeList, setRecipeList] = useState([]);
	const [recipeDetails, setRecipeDetails] = useState([]);
	const [favoritesList, setFavoritesList] = useState([]);

	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		setLoading(true);
		try {
			const response = await fetch(
				`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`
			);
			const data = await response.json();
			console.log(data);
			if (data.data.recipes) {
				setRecipeList(data.data.recipes);
				setLoading(false);
				setSearch("");
				navigate("/");
			}
		} catch (err) {
			setLoading(false);
			console.log(err);
			setSearch("");
		}
	}

	function handleAddToFavorites(recipeData) {
		let cpyFavoritesList = [...favoritesList];
		const addRemoveIndex = cpyFavoritesList.findIndex(
			(item) => item.id === recipeData.id
		);
		if (addRemoveIndex !== -1) {
			cpyFavoritesList.splice(addRemoveIndex, 1);
		} else {
			cpyFavoritesList.push(recipeData);
		}
		setFavoritesList(cpyFavoritesList);
		// navigate("/favorites");
	}

	if (loading) {
		return (
			<h1 className="font-bold text-2xl flex justify-center">
				Loading... Please Wait
			</h1>
		);
	}

	return (
		<GlobalContext.Provider
			value={{
				search,
				setSearch,
				handleSubmit,
				loading,
				recipeList,
				recipeDetails,
				setRecipeDetails,
				favoritesList,
				handleAddToFavorites,
			}}>
			{children}
		</GlobalContext.Provider>
	);
}

export default GlobalState;
