import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    useTheme,
    Grid,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const theme = useTheme();
    const navigate = useNavigate();

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
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const imageURL = URL.createObjectURL(selectedFile);
            setImagePreview(imageURL);
        } else {
            setImagePreview(null);
        }

        setProductData({
            ...productData,
            imageFile: selectedFile,
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

            // Utilisez la bibliothèque react-toastify pour afficher une notification de succès
            toast.success("Product added successfully!");

            // Rediriger vers la page d'accueil après un certain délai
            setTimeout(() => {
                navigate("/");
            }, 2000); // Redirection vers la page d'accueil après 3 secondes
        } catch (error) {
            console.error("Error adding product:", error);

            // Utilisez la bibliothèque react-toastify pour afficher une notification d'erreur
            toast.error("An error occurred while adding the product.");
        }
    };

    const handleCancel = () => {
        // Votre logique pour annuler l'ajout du produit
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
                            <label
                                htmlFor="imageFile"
                                style={{ display: "block", marginTop: "1rem" }}
                            >
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
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Image Preview"
                                        style={{
                                            maxWidth: "40%",
                                            marginTop: "1rem",
                                            marginLeft: "3rem",
                                        }}
                                    />
                                )}
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
                {/* Utilisez la bibliothèque react-toastify pour afficher les notifications */}
                <ToastContainer />
            </Grid>
        </Grid>
    );
};

export default AddProduct;
