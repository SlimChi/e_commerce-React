import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Stack,
    useTheme,
    ToggleButtonGroup,
    Rating,
    Typography,
    IconButton,
    Dialog,
    CircularProgress,
} from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";

const Main = ({ products }) => {
    const [alignment, setAlignment] = React.useState('left');
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Supposons que vous chargez les données depuis une source externe (par exemple, une API).
        // Ici, nous simulons un délai de chargement de 2 secondes.
        setTimeout(() => {
            setIsLoading(false); // Définir isLoading sur false une fois les données chargées
        }, 2000); // Simule un délai de chargement de 2 secondes (à remplacer par votre logique de chargement réelle)
    }, []);

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    }

    const handleClickOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedProduct(null);
        setOpen(false);
    };

    if (isLoading) {
        return (
            <Box sx={{ py: 11, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ py: 9 }}>
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexWrap={"wrap"}
                gap={3}
            >
                <Box>
                    <Typography variant="h6">Selected Products</Typography>
                    <Typography fontWeight={300} variant="body1">
                        All our new arrivals in an exclusive brand selection.
                    </Typography>
                </Box>

                <ToggleButtonGroup
                    color="error"
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                >
                    <ToggleButton className="myButton" value="left" aria-label="left aligned">
                        All products
                    </ToggleButton>
                    <ToggleButton
                        sx={{ mx: "16px !important", color: theme.palette.text.primary }}
                        className="myButton"
                        value="center"
                        aria-label="centered"
                    >
                        Men category
                    </ToggleButton>
                    <ToggleButton
                        sx={{ mx: "16px !important", color: theme.palette.text.primary }}
                        className="myButton"
                        value="right"
                        aria-label="right aligned"
                    >
                        Women Category
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>

            <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-between"}>
                {products.map((product) => (
                    <Card key={product.id} sx={{
                        maxWidth: 333,
                        mt: 6,
                        ":hover .MuiCardMedia-root ": {
                            rotate: "1deg",
                            scale: "1.1",
                            transition: "0.35s",
                        },
                    }}>

                        <CardMedia
                            sx={{ height: 277 }}
                            image={`http://localhost:9091/products/image/${product.imageName}`}
                            title={product.productName}
                        />
                        <CardContent>
                            <Stack
                                direction={"row"}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                            >
                                <Typography gutterBottom variant="h6" component="div">
                                    {product.productName}
                                </Typography>

                                <Typography variant="subtitle1" component="p">
                                    {product.price} €
                                </Typography>
                            </Stack>
                        </CardContent>
                        <CardActions sx={{ justifyContent: "space-between" }}>
                            <Button
                                onClick={() => {
                                    handleClickOpen(product);
                                }}
                                sx={{ textTransform: "capitalize" }}
                                size="large"
                            >
                                <AddShoppingCartOutlinedIcon
                                    sx={{ mr: 1 }}
                                    fontSize="small"
                                />
                                Add to Cart
                            </Button>
                            <Rating
                                precision={0.1}
                                name="read-only"
                                value={product.rating}
                                readOnly
                            />
                        </CardActions>
                    </Card>
                ))}
            </Stack>

            <Dialog
                sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <IconButton
                    sx={{
                        ":hover": { color: "red", rotate: "180deg", transition: "0.3s" },
                        position: "absolute",
                        top: 0,
                        right: 10,
                    }}
                    onClick={handleClose}
                >
                    <Close />
                </IconButton>
                {selectedProduct && <ProductDetails product={selectedProduct} />}
            </Dialog>
        </Container>
    );
}

export default Main;
