import { MoveUpOutlined } from "@mui/icons-material";
import { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
	const { user } = useContext(AuthContext);
	const [items, setItems] = useState(
		JSON.parse(localStorage.getItem("movieapp.shoppingcart")) ?? []
	);

	function saveInCart(movie) {
		const object = {
			movie,
			user_id: user.id,
			quantity: 1,
		};

		items[items.length] = object;
		setItems([...items]);
		saveInLocalStorage(items);
	}

	function movieIsInCart(id) {
		const movie = items.find(
			(item) => item.movie.imdbID === id && item.user_id === user.id
		);
		return movie;
	}

	function downOne(id) {
		const movie = movieIsInCart(id);
		if (movie === undefined) return;
		const newItems = items.filter(
			(item) => item.movie.imdbID !== id && item.user_id !== user.id
		);
		if (movie.quantity > 1) {
			movie.quantity--;
			newItems.push(movie);
		}
		setItems([...newItems]);
		saveInLocalStorage(newItems);
	}

	function saveInLocalStorage(items) {
		localStorage.setItem("movieapp.shoppingcart", JSON.stringify(items));
	}

	return (
		<ShoppingCartContext.Provider
			value={{ items, saveInCart, movieIsInCart, downOne }}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};
