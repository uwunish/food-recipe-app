import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import RecipeItem from "../components/RecipeItem";

function Home() {
	const { recipeList } = useContext(GlobalContext);
	return (
		<div className="py-8 container mx-auto flex flex-wrap justify-center gap-10 lg:gap-5">
			{recipeList && recipeList.length > 0 ? (
				recipeList.map((item) => <RecipeItem item={item} />)
			) : (
				<div className="lg:text-4xl text-xl text-center text-black font-extrabold">
					No recipe found for searched item
				</div>
			)}
		</div>
	);
}

export default Home;
