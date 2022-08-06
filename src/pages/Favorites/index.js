import { useContext } from "react";

import { AuthContext, MovieFavoriteContext } from "../../context";

import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { CardMovie } from "../../components";

import Swal from "sweetalert2";

const Favorites = () => {
	const { user } = useContext(AuthContext);
	const { favoriteMovies, cleanFavorites } = useContext(MovieFavoriteContext);

	const myFavoritesMovies = favoriteMovies.filter(
		(favorite) => favorite.user_id === user.id
	);

	function cleanButton() {
		Swal.fire({
			title: "Clean all favorites movies?",
			showCancelButton: true,
			confirmButtonText: "Clean",
			confirmButtonColor: "#f01",
		}).then((result) => {
			if (result.isConfirmed) {
				cleanFavorites();
				Swal.fire("Clean!", "", "success");
			}
		});
	}

	return (
		<Box>
			<Container>
				<Grid container spacing={3}>
					<Grid item xs={8}>
						<Typography
							variant="h3"
							sx={{
								textTransform: "capitalize",
							}}
						>
							Favorites
						</Typography>
					</Grid>
					<Grid item xs={4}>
						{myFavoritesMovies.length > 0 && (
							<Button
								variant="outlined"
								color="error"
								onClick={cleanButton}
								size="large"
							>
								Clean
							</Button>
						)}
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
