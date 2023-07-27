import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { productId } = useParams();
  return (<p>product detail page for {productId}</p>);
}