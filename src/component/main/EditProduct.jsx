import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Grid,
    Stack,
    Typography,
    IconButton,
} from "@mui/material";
import axios from "axios";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import EditProductForm from "./EditProductForm";
import { toast } from "react-toastify"; // Importer la fonction toast

const EditProduct = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:9091/products/findAllProduct")
            .then((response) => {
                setProducts(response.data);
            });
    }, []);

    const handleDeleteProduct = (id) => {
        // Afficher une boîte de dialogue de confirmation de suppression
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément?")) {
            axios.delete(`http://localhost:9091/products/delete/${id}`).then(() => {
                setProducts(products.filter((product) => product.id !== id));
                toast.success("L'élément a été supprimé avec succès.");
            });
        }
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = (success) => {
        setIsEditDialogOpen(false);

        // Si la mise à jour a réussi (success === true), nous pouvons mettre à jour la liste des produits
        if (success) {
            axios
                .get("http://localhost:9091/products/findAllProduct")
                .then((response) => {
                    setProducts(response.data);
                });
        }
    };

    const handleSaveProduct = (updatedProduct) => {
        // Mettre à jour la liste des produits avec le produit mis à jour
        setProducts((prevProducts) => {
            return prevProducts.map((product) => {
                if (product.id === updatedProduct.id) {
                    return updatedProduct;
                } else {
                    return product;
                }
            });
        });

        // Fermer la fenêtre du formulaire d'édition
        setIsEditDialogOpen(false);
    };

    return (
        <Grid container spacing={2}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            maxWidth: 333,
                            mt: 6,
                            mx: "auto", // Centrer la carte horizontalement
                            mb: 15,
                            ":hover .MuiCardMedia-root ": {
                                rotate: "1deg",
                                scale: "1.1",
                                transition: "0.35s",
                            },
                        }}
                    >
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{
                                textAlign: "center", // Centrer le texte horizontalement
                            }}
                        >
                            {product.productName}
                        </Typography>
                        <CardMedia
                            sx={{ height: 277 }}
                            image={`http://localhost:9091/products/image/${product.imageName}`}
                            title={product.productName}
                        />
                        <CardContent>
                            <Stack justifyContent="space-between">
                                <div className="bg-gray-100 p-4 rounded-md shadow-md">
                                    <Typography variant="subtitle1" component="p">
                                        <span style={{ fontWeight: "bold" }}>Price:</span> {product.price} €
                                    </Typography>

                                </div>

                                <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                                    <Typography variant="subtitle1" component="p" >
                                        <span style={{ fontWeight: "bold" }}>Quantity:</span> {product.productQuantity}
                                    </Typography>
                                </div>

                                <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                                    <Typography variant="subtitle1" component="p" >
                                        <span style={{ fontWeight: "bold" }}>Rating:</span> {product.rating}
                                    </Typography>
                                </div>

                                <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
                                    <Typography variant="subtitle1" component="p" >
                                        <span style={{ fontWeight: "bold" }}>Category:</span> {product.categoryDto.categoryName}
                                    </Typography>
                                </div>
                            </Stack>

                        </CardContent>
                        <CardActions sx={{ justifyContent: "space-between" }}>
                            <IconButton
                                color="primary"
                                onClick={() => handleEditProduct(product)}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                onClick={() => handleDeleteProduct(product.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}

            {selectedProduct && (
                <EditProductForm
                    open={isEditDialogOpen}
                    onClose={handleCloseEditDialog}
                    product={selectedProduct}
                    onSave={handleSaveProduct} // Passer la fonction de mise à jour ici
                />
            )}
        </Grid>
    );
};

export default EditProduct;
