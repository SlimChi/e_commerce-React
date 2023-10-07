import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

const ProductDetails = ({ product }) => {
    const [selectedImg] = useState(0);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2.5,
                flexDirection: { xs: "column", sm: "row" },
            }}
        >
            <Box sx={{ display: "flex" }}>
                <img
                    width={360}
                    src={`http://localhost:9091/products/image/${product.imageName}`} // Utilisez l'URL de l'image du produit
                    alt={product.productName}
                />
            </Box>

            <Box sx={{ py: 2, textAlign: { xs: "center", sm: "left" } }}>
                <Typography variant="h5">
                    {product.categoryDto.categoryName} <br />
                    {product.productName}
                </Typography>
                <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
                    {product.price} €
                </Typography>
                <Typography variant="body1">
                    {product.description}
                </Typography>

                <Stack
                    sx={{ justifyContent: { xs: "center", sm: "left" } }}
                    direction={"row"}
                    gap={1}
                    my={2}
                >
                    <ToggleButtonGroup
                        value={selectedImg}
                        exclusive
                        sx={{
                            ".Mui-selected": {
                                border: "1px solid royalblue !important",
                                borderRadius: "5px !important",
                                opacity: "1",
                                backgroundColor: "initial",
                            },
                        }}
                    >
                        {/* Vous pouvez ajouter des images du produit ici si nécessaire */}
                    </ToggleButtonGroup>
                </Stack>

                <Button
                    sx={{ mb: { xs: 1, sm: 0 }, textTransform: "capitalize" }}
                    variant="contained"
                >
                    <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
                    Buy now
                </Button>
            </Box>
        </Box>
    );
};

export default ProductDetails;
