import React from 'react'
import { useTranslation } from 'react-i18next';
import "./Home.css";

const Home = () => {
  const { t: translate } = useTranslation('common');
  return (
    <div className="home-container">
      <div className="title-container">
        <h1>{translate("welcomeToMediCare")}</h1>
      </div>
      <div className="home-content-container">
        <div className="card-container">
          <h2 className="first-child">{translate("homeHeader")}</h2>
          <p className="second-child">{translate("checkupMessage")}</p>
        </div>
      </div>
      <div className="moto">
        <h3>
          {translate("mottoMessage")}
    </h3>
      </div>
    </div>
  );
}

export default Home;
