import { useContext, useState, useEffect } from "react";
import { MovieFavoriteContext, ShoppingCartContext } from "../../context";
import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	Chip,
	Rating,
	Stack,
	Button,
	ButtonGroup,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CartButton = ({ movie }) => {
	const { saveInCart, movieIsInCart, downOne } =
		useContext(ShoppingCartContext);

	const movieInCart = movieIsInCart(movie.imdbID);

	return (
		<>
			{movieInCart === undefined ? (
				<Button
					variant="contained"
					size="small"
					onClick={() => saveInCart(movie)}
				>
					Add to cart
				</Button>
			) : (
				<ButtonGroup
					variant="contained"
					aria-label="outlined primary button group"
				>
					<Button onClick={() => downOne(movie.imdbID)}>-</Button>
					<Typography
						sx={{
							width: 40,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontWeight: "bold",
						}}
					>
						{movieInCart.quantity}
					</Typography>
					<Button>+</Button>
				</ButtonGroup>
			)}
		</>
	);
};

const CardMovie = ({ movie }) => {
	const { addToFavorite, isIncludeInFavorites, removeFavorite } =
		useContext(MovieFavoriteContext);

	// sirve para saber si debemos pintar el corazon
	const [value, setValue] = useState(0);

	const StyledRating = styled(Rating)({
		"& .MuiRating-iconFilled": {
			color: "#ff6d75",
		},
		"& .MuiRating-iconHover": {
			color: "#ff3d47",
		},
	});

	const handleChangeFavorite = (event, newValue) => {
		if (newValue === 1) {
			addToFavorite(movie);
		} else {
			removeFavorite(movie.imdbID);
		}
		setValue(newValue);
	};

	useEffect(() => {
		const pintado = isIncludeInFavorites(movie.imdbID);
		setValue(pintado);
	}, [value]);

	return (
		<Grid item xs={12} md={6} my={3}>
			<Card
				sx={{
					height: 440,
				}}
			>
				<CardMedia
					component="img"
					height="240"
					sx={{
						objectPosition: "top",
					}}
					image={movie.Poster}
					alt="green iguana"
				/>
				<CardContent
					sx={{
						cursor: "pointer",
					}}
				>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography
								variant="h6"
								sx={{ fontWeight: "bold" }}
							>
								{movie.Title}
							</Typography>
							<Typography variant="body1">
								{movie.Year}
							</Typography>
							<Typography variant="h6" color="red">
								$ {movie.Price}
							</Typography>
							<Chip
								label={movie.Type}
								color="success"
								size="small"
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={12}>
							<Stack
								direction="row"
								justifyContent="space-between"
							>
								<StyledRating
									max={1}
									value={value}
									icon={<FavoriteIcon fontSize="inherit" />}
									emptyIcon={
										<FavoriteBorderIcon fontSize="inherit" />
									}
									onChange={(event, newValue) =>
										handleChangeFavorite(event, newValue)
									}
								/>
								<CartButton movie={movie} />
							</Stack>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default CardMovie;
