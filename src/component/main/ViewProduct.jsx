import React, { useEffect, useState } from 'react';
import Main from './main';
import axios from 'axios'; // Importez Axios

function ViewProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Effectuez une requête GET en utilisant Axios pour récupérer la liste des produits depuis votre API
        axios.get('http://localhost:9091/products/findAllProduct')
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div className="ViewProduct">
            <Main products={products} />
        </div>
    );
}

export default ViewProduct;
