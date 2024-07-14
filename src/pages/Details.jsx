import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

function Details() {
	const params = useParams();
	const {
		recipeDetails,
		setRecipeDetails,
		favoritesList,
		handleAddToFavorites,
	} = useContext(GlobalContext);

	// console.log(params);

	useEffect(() => {
		async function getRecipeDetails() {
			const response = await fetch(
				`https://forkify-api.herokuapp.com/api/v2/recipes/${params.id}`
			);
			const data = await response.json();
			console.log(data);
			if (
				data &&
				data.data &&
				data.data.recipe &&
				data.data.recipe.ingredients
			) {
				setRecipeDetails(data.data.recipe);
			}
		}
		getRecipeDetails();
	}, []);

	return (
		<div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-3">
			<div className="row-start-1 lg:row-start-auto">
				<div className="h-96 overflow-hidden rounded-xl group">
					<img
						src={recipeDetails.image_url}
						alt="recipe"
						className="w-full h-full object-cover block group-hover:scale-105 duration-300"
					/>
				</div>
			</div>
			<div className="flex flex-col gap-3">
				<span className="text-sm text-cyan-700 font-medium">
					{recipeDetails.publisher}
				</span>
				<h3 className="font-bold text-2xl text-black truncate">
					{recipeDetails.title}
				</h3>
				<div>
					<button
						onClick={() => handleAddToFavorites(recipeDetails)}
						className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white">
						{favoritesList &&
						favoritesList.length > 0 &&
						favoritesList.findIndex(
							(item) => item.id === recipeDetails.id
						) !== -1
							? "Remove from favorites"
							: "Add to favorites"}
					</button>
				</div>
				<div>
					<span className="text-2xl font-semibold text-black">
						Ingredients:
					</span>
					{recipeDetails.ingredients &&
					recipeDetails.ingredients.length > 0 ? (
						<ul className="flex flex-col gap-3">
							{recipeDetails.ingredients.map((ingredient) => (
								<li>
									<span className="text-2xl font-semibold text-black">
										{ingredient.quantity} {ingredient.unit}
									</span>
									<span className="text-2xl font-semibold text-black">
										{ingredient.description}
									</span>
								</li>
							))}
						</ul>
					) : (
						<div>No ingredients found</div>
					)}
					<ul></ul>
				</div>
			</div>
		</div>
	);
}

export default Details;
