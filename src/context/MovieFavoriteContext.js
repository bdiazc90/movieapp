import { useState, createContext, useContext } from "react";

import { AuthContext } from "./";

export const MovieFavoriteContext = createContext();

export const MovieFavoriteProvider = ({ children }) => {
	const { user } = useContext(AuthContext);

	const favorites =
		JSON.parse(localStorage.getItem("movieapp.favorites")) ?? [];

	const [favoriteMovies, setFavoriteMovies] = useState(favorites);

	/**
	 * para poder crear guardar la pelicula en mis favoritos
	 * vamos a guardar 2 cosas
	 * id de la pelicula
	 * fecha en la que guarde el favorito
	 */

	const addToFavorite = (id) => {
		const favorite = {
			id,
			created_favorited: new Date(),
			user_id: user.id,
		};

		//* La primera vez
		if (favoriteMovies.length === 0) {
			setFavoriteMovies([favorite]);
			saveInLocalStorage([favorite]);
			return;
		}

		//* La segunda vez
		//! favoriteMovies [{ id: 1 }]
		//? favoriteMovies.length = 1
		//? quiero que  la posicion 1 sea igual a favorite
		//* favoriteMovies.length esto siempre sera uno mayor al indice
		//* favoriteMovies[favoriteMovies.length] = favorite
		// favoriteMovies[1] = favorite

		//* La tercera vez
		//! favoriteMovies [
		//  { id: 1 },
		//   {id: 2}
		//]
		//favoriteMovies.length = 2
		//* favoriteMovies[favoriteMovies.length] = favorite
		// favoriteMovies[2] = favorite

		favoriteMovies[favoriteMovies.length] = favorite;
		setFavoriteMovies(favoriteMovies);
		saveInLocalStorage(favoriteMovies);
	};

	const saveInLocalStorage = (favorites) => {
		localStorage.setItem("movieapp.favorites", JSON.stringify(favorites));
	};

	// vamos hacer una funcion que retorne 1 o 0
	// si el id existe en nuestro localStorage retornamos si no
	const isIncludeInFavorites = (id) => {
		const movie = favoriteMovies.findIndex(
			(favorite) => favorite.id === id && favorite.user_id === user.id
		);

		// cuando findIndex no encuentra a un elemento retorna -1
		return movie === -1 ? 0 : 1;
	};

	return (
		<MovieFavoriteContext.Provider
			value={{
				favoriteMovies,
				addToFavorite,
				isIncludeInFavorites,
			}}
		>
			{children}
		</MovieFavoriteContext.Provider>
	);
};
