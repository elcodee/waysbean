import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CardComp from "../componsnets/cardComp";
import Header from "../componsnets/header";
import Jumbotron from "../componsnets/jumbotron";
import LoginModal from "../componsnets/loginModal";
import RegisterModal from "../componsnets/registerModal";
import { getProducts } from "../config/server";

function Home() {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/product/${id}`);
  };

  useEffect(async () => {
    let data = await getProducts();
    setProducts(data);
  }, []);

  return (
    <>
      <Header />
      <Jumbotron />
      <div className="container row mx-auto">
        {products?.map((item, key) => (
          <CardComp
            key={key}
            id={item.id}
            detail={() => handleClick(item.id)}
            imgSource={item.photo}
            beanName={item.name}
            beanPrice={item.price}
            beanStock={item.stock}
            sold={item.sold}
          />
        ))}
      </div>

      <LoginModal />
      <RegisterModal />
    </>
  );
}

export default Home;
