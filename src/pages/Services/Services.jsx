import { useEffect, useState } from "react";
import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import IntroServices from "../../components/sections/IntroServices/IntroServices";
import Pagination from "../../components/ui/Pagination/Pagination";
import styles from "./Services.module.scss";
import { GetServices } from "../../services/api";
import { ServerErrorSwal } from "../../Swals/Swals";
import ServiceCard from "../../components/cards/ServiceCard/ServiceCard";
import ServicesForm from "../../components/forms/ServicesForm/ServicesForm";
import { useScrollTo } from "../../utils/Utils";

function Services() {
  const [services, setServices] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };

  useScrollTo("form");

  useEffect(() => {
    GetServices(currentPage).then((result) => {
      if (result?.success === true) {
        setServices(result.data);
        setPageCount(result.countPage);
      } else {
        ServerErrorSwal();
      }
    });
  }, [currentPage]);
  return (
    <>
      <HeaderNav />
      <section className={styles.services}>
        <IntroServices />
        <div className={styles.serviceCards}>
          <div className="container">
            <div className="row row-cols-lg-3 row-cols-sm-2 row-cols-1 justify-content-center">
              {services.map((service) => {
                return (
                  <div className="col" key={service.id}>
                    <ServiceCard
                      title={service.name}
                      description={service.description}
                      priceIn={service.priceIn}
                      priceOut={service.priceOut}
                      warranty={service.warranty}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        <ServicesForm />
      </section>
      <Footer />
    </>
  );
}

export default Services;
