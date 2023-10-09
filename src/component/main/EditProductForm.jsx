import React, { useState, useEffect } from "react";
import {
    Dialog,
    Container,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    Stack,

} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import axios from "axios";

const EditProductForm = ({ open, onClose, product, onSave }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product });
    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        setEditedProduct({ ...product });

        // Remplacez cette partie par l'appel à votre API pour obtenir la liste des catégories
        const fetchedCategories = [
            { id: 2, name: "TV" },
            { id: 3, name: "DRONE" },
            { id: 4, name: "GAME" },
            { id: 1, name: "SMARTPHONE" },
            { id: 5, name: "MEN" },
            { id: 6, name: "WOMEN" },
        ];

        setCategories(fetchedCategories);

        // Initialisez la catégorie sélectionnée
        const initialCategory = fetchedCategories.find(
            (category) => category.id === editedProduct.categoryDto.categoryId
        );
        setSelectedCategory(initialCategory ? initialCategory.id : "");
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "categoryId") {
            setSelectedCategory(value);
            setEditedProduct({
                ...editedProduct,
                categoryDto: {
                    ...editedProduct.categoryDto,
                    categoryId: value,
                },
            });
        } else {
            setEditedProduct({
                ...editedProduct,
                [name]: value,
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imagePreview = e.target.result;
                setEditedProduct({
                    ...editedProduct,
                    imagePreview,
                });
                setImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () => {
        setEditedProduct({ ...product });
        setImageFile(null);
        onClose(false); // Fermer la fenêtre du formulaire
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("productName", editedProduct.productName);
            formData.append("description", editedProduct.description);
            formData.append("rating", editedProduct.rating);
            formData.append("productQuantity", editedProduct.productQuantity);
            formData.append("price", editedProduct.price);
            formData.append("categoryId", editedProduct.categoryDto.categoryId);

            // Vérifiez si imageFile est un objet File (nouvelle image) ou null (aucun changement d'image)
            if (imageFile instanceof File) {
                formData.append("imageFile", imageFile);
            }

            const response = await axios.put(
                `http://localhost:9091/products/updateProductWithImage/${editedProduct.id}`,
                formData
            );

            if (response.status === 200) {
                onSave(editedProduct); // Appeler la fonction de mise à jour
                onClose(true); // Fermer la fenêtre du formulaire avec succès
            } else {
                console.error("Échec de la mise à jour du produit.");
            }
        } catch (error) {
            console.error("Une erreur s'est produite lors de la mise à jour du produit.", error);
        }
    };

    return (
        <Container sx={{ py: 9 }}>
            <Stack direction={"row"} flexWrap={"wrap"} justifyContent={"space-between"}>

            <Dialog open={open} onClose={() => onClose(false)} sx={{ maxWidth: '100%' }}>
            <DialogTitle className="bg-blue-500 text-white">Edit Product</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} className="flex flex-wrap -mx-3">
                    <div className="w-full md:w-1/2 px-3">
                        <div className="mb-4">
                            <label htmlFor="productName" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <TextField
                                id="productName"
                                name="productName"
                                value={editedProduct.productName}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block font-bold mb-1">
                                Description
                            </label>
                            <TextField
                                id="description"
                                name="description"
                                value={editedProduct.description}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rating" className="block font-bold mb-1">
                                Rating
                            </label>
                            <TextField
                                id="rating"
                                name="rating"
                                value={editedProduct.rating}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <div className="mb-4">
                            <label htmlFor="productQuantity" className="block font-bold mb-1">
                                Product Quantity
                            </label>
                            <TextField
                                id="productQuantity"
                                name="productQuantity"
                                value={editedProduct.productQuantity}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="categoryId" className="block font-bold mb-1">
                                Category
                            </label>
                            <Select
                                id="categoryId"
                                name="categoryId"
                                value={selectedCategory}
                                onChange={handleChange}
                                fullWidth
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block font-bold mb-1">
                                Price
                            </label>
                            <TextField
                                id="price"
                                name="price"
                                value={editedProduct.price}
                                onChange={handleChange}
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <div className="mb-4">
                            <label className="block font-bold mb-5 mt-5">Product Image</label>
                            <CardMedia
                                sx={{ height: 277, marginBottom: 2, marginTop: 2 }}
                                image={editedProduct.imagePreview || `http://localhost:9091/products/image/${product.imageName}`}
                                title={editedProduct.productName || product.productName}
                            />
                        </div>
                        <div className="mb-4">
                            <Button
                                variant="contained"
                                component="label"
                                htmlFor="image"
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer mt-4"
                            >
                                Choose Image
                                <input
                                    type="file"
                                    id="image"
                                    name="imageFile"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }}
                                />
                            </Button>
                        </div>
                    </div>
                    <DialogActions className="w-full mt-4 px-3">
                        <Button onClick={handleCancel} className="bg-red-500 text-white">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-green-500 text-white">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
            </Stack>
        </Container>
    );
};

export default EditProductForm;
