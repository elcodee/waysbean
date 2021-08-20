import icon from "../common/jumbotron.svg";
import jumbotron from "../common/jumbotron-img.svg";
import waves from "../common/waves.svg";

export default function Jumbotron() {
  return (
    <>
      <img src={waves} className="jumbotron_img_waves" alt="" />
      <img src={jumbotron} className="jumbotron_img" alt="" />
      <div className="jumbotron_custom mt-0 mb-5">
        <div className="d-block ms-3">
          <img src={icon} width="400" className="img-fluid mb-3" />
          <h3>BEST QUALITY COFFEE BEANS</h3>
          <br />
          <p className="col-md-6 fs-4 fw-light mb-0">
            Quality freshly roasted coffee made just for you. Pour, brew and
            enjoy.
          </p>
        </div>
      </div>
    </>
  );
}
