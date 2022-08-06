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

	const removeFavorite = (id) => {
		const newFavorites = favoriteMovies.filter(
			(favorite) => favorite.movie.imdbID !== id
		);
		setFavoriteMovies(newFavorites);
		saveInLocalStorage(newFavorites);
	};

	const cleanFavorites = () => {
		setFavoriteMovies([]);
		saveInLocalStorage([]);
	};

	const addToFavorite = (movie) => {
		const favorite = {
			movie,
			created_favorited: new Date(),
			user_id: user.id,
		};

		//* La primera vez
		if (favoriteMovies.length === 0) {
			setFavoriteMovies([favorite]);
			saveInLocalStorage([favorite]);
			return;
		}

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
			(favorite) =>
				favorite.movie.imdbID === id && favorite.user_id === user.id
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
				removeFavorite,
				cleanFavorites,
			}}
		>
			{children}
		</MovieFavoriteContext.Provider>
	);
};
