import { useContext } from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { CardMovie } from "../../components";

import { ShoppingCartContext } from "../../context";

import Swal from "sweetalert2";

const Cart = () => {
	const { items, cleanCart } = useContext(ShoppingCartContext);

	function cleanButton() {
		Swal.fire({
			title: "Clean all items in Cart?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Clean!",
		}).then((result) => {
			if (result.isConfirmed) {
				cleanCart();
				Swal.fire("Cleaned!", "0 items in cart.", "success");
			}
		});
	}

	return (
		<Box>
			<Container>
				<Grid container spacing={3}>
					<Grid item xs={8}>
						<Typography
							variant="h6"
							sx={{
								textTransform: "capitalize",
							}}
						>
							Cart
						</Typography>
					</Grid>
					<Grid item xs={4}>
						{items.length > 0 && (
							<Button
								variant="outlined"
								color="warning"
								onClick={cleanButton}
							>
								Clean
							</Button>
						)}
					</Grid>
					{items.length > 0 &&
						items.map((item, index) => (
							<CardMovie movie={item.movie} key={index} />
						))}
				</Grid>
			</Container>
		</Box>
	);
};

export default Cart;
