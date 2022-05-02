import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  let [product, setProduct] = useState(null);
  let [hasLoaded, setHasLoaded] = useState(false);

  let { ProductID } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${ProductID}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error(err);
        alert(err.message);
      })
      .finally(() => {
        setHasLoaded(true);
      });
  }, [ProductID]);

  if (!hasLoaded) return <p>Loading...</p>;

  return (
    <pre>
      {product
        ? JSON.stringify(product, null, 2)
        : "Couldn't load product details :/"}
    </pre>
  );
};

export default Product;
