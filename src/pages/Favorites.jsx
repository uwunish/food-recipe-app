import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import RecipeItem from "../components/RecipeItem";

function Favorites() {
	const { favoritesList } = useContext(GlobalContext);
	return (
		<div>
			{favoritesList && favoritesList.length > 0 ? (
				<div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
					{favoritesList.map((favoriteItem) => (
						<RecipeItem item={favoriteItem} />
					))}
				</div>
			) : (
				<div className="container mx-auto flex justify-center font-medium text-2xl text-black">No favorites to show</div>
			)}
		</div>
	);
}

export default Favorites;
