const CardComp = (props) => {
  const { imgSource, beanName, beanPrice, beanStock, sold, detail } = props;

  return (
    <div className="col-md-3 mb-4" onClick={detail}>
      <div className="card card_product_custom" style={{ width: "18rem" }}>
        <img src={imgSource} />

        <div className="card-body">
          <h3 className="fw-bold">{beanName}</h3>
          <p className="card-text fw-light">
            Rp : {parseInt(beanPrice).toLocaleString("id-ID")}
          </p>
          <p className="card-text fw-light">
            Stock : {parseInt(beanStock).toLocaleString("id-ID")}
          </p>
          <p className="card-text fw-light">
            Sold : {parseInt(sold).toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardComp;
