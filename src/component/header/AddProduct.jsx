import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    CssBaseline,
    TextField,
    Typography,
    useTheme,
    InputAdornment,
    Grid,
    Divider,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";

const AddProduct = ({ onClose }) => {
    const theme = useTheme();
    const [productData, setProductData] = useState({
        productName: "",
        description: "",
        rating: 0,
        productQuantity: 0,
        price: 0,
        categoryId: 0,
        imageFile: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleImageChange = (event) => {
        setProductData({
            ...productData,
            imageFile: event.target.files[0],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("productName", productData.productName);
        formData.append("description", productData.description);
        formData.append("rating", productData.rating);
        formData.append("productQuantity", productData.productQuantity);
        formData.append("price", productData.price);
        formData.append("categoryId", productData.categoryId);
        formData.append("imageFile", productData.imageFile);

        try {
            const response = await axios.post(
                "http://localhost:9091/products/createProductImageUrl",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Product added successfully:", response.data);

            // Fermez la fenêtre de dialogue
            onClose();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    // Fonction pour gérer l'annulation et fermer la fenêtre de dialogue
    const handleCancel = () => {
        onClose();
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
        >
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card sx={{ padding: 2 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Add Product
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                }}
                            >
                                <TextField
                                    label="Product Name"
                                    name="productName"
                                    value={productData.productName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={productData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextField
                                    type="number"
                                    label="Rating"
                                    name="rating"
                                    value={productData.rating}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    type="number"
                                    label="Quantity"
                                    name="productQuantity"
                                    value={productData.productQuantity}
                                    onChange={handleInputChange}
                                />
                                <TextField
                                    type="number"
                                    label="Price"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleInputChange}
                                    required
                                />
                                <TextField
                                    type="number"
                                    label="Category ID"
                                    name="categoryId"
                                    value={productData.categoryId}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Box>
                            <label htmlFor="imageFile" style={{ display: "block", marginTop: "1rem" }}>
                                <input
                                    id="imageFile"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                    required
                                />
                                <Button
                                    component="span"
                                    variant="outlined"
                                    startIcon={<AddPhotoAlternateIcon />}
                                >
                                    Upload Image
                                </Button>
                            </label>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: "1rem",
                                }}
                            >

                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        bgcolor: theme.palette.primary.main,
                                        color: theme.palette.primary.contrastText,
                                        flex: 1,
                                    }}
                                >
                                    Add Product
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default AddProduct;
