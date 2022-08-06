import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext, MovieFavoriteContext } from "../../context";

import { Box, Container, Grid, Typography } from "@mui/material";
import Services from "../../services";
import { CardMovie } from "../../components";

const Favorites = () => {
	const { user } = useContext(AuthContext);
	const { favoriteMovies } = useContext(MovieFavoriteContext);

	const myFavoritesMovies = favoriteMovies.filter(
		(favorite) => favorite.user_id === user.id
	);

	const [movies, setMovies] = useState([]);
	const { searchText } = useParams();
	const history = useNavigate();

	async function getSearchResults() {
		const data = await Services.searchByText(searchText);
		setMovies(data.Search);
	}

	useEffect(() => {
		getSearchResults();
	}, []);

	return (
		<Box>
			<Container>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography
							variant="h3"
							sx={{
								textTransform: "capitalize",
							}}
						>
							Favorites
						</Typography>
					</Grid>
					{myFavoritesMovies.length > 0 &&
						myFavoritesMovies.map(({ movie }, index) => (
							<CardMovie movie={movie} key={index} />
						))}
				</Grid>
			</Container>
		</Box>
	);
};

export default Favorites;
