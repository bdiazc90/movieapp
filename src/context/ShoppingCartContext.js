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

	function saveInLocalStorage(items) {
		localStorage.setItem("movieapp.shoppingcart", JSON.stringify(items));
	}

	return (
		<ShoppingCartContext.Provider value={{ items, saveInCart }}>
			{children}
		</ShoppingCartContext.Provider>
	);
};
