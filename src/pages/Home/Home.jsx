import { useEffect, useState } from "react";

import { FaTools } from "react-icons/fa";
import { MdVpnKey } from "react-icons/md";

import DescriptionCard from "../../components/DescriptionCard/DescriptionCard";
import GlassItemCard from "../../components/GlassItemCard/GlassItemCard";
import HeaderNav from "../../components/HeaderNav/HeaderNav";
import IntroHome from "../../components/IntroHome/IntroHome";
import NavElement from "../../components/NavElement/NavElement";
import WhyUs from "../../components/WhyUs/WhyUs";
import Footer from "../../components/Footer/Footer";
import { GetItemInHome } from "../../services/api";

import styles from "./Home.module.scss";
import { ServerErrorSwal } from "../../Swals/Swals";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    GetItemInHome().then((result) => {
      if (result?.success === true) {
        setItems(result.data);
      } else {
        ServerErrorSwal();
      }
    });
  }, []);
  return (
    <>
      <HeaderNav />
      <IntroHome />
      <section className={styles.bestItem}>
        <div className="container">
          <NavElement title="محصولات برگزیده" link="#" />
          <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1">
            {items.map((item,index) => {
              return (
                <div className="col" key={index}>
                  <GlassItemCard
                    title={item.name}
                    img={item.imgs}
                    description={item.description}
                    id={item.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className={styles.descriptionCard}>
        <div className="container">
          <div className="row row-cols-md-2 row-cols-1 flex-row-reverse">
            <div className="col">
              <DescriptionCard
                icon={MdVpnKey}
                title="کانفیگ‌های اختصاصی VPN"
                description="اتصال پایدار و پرسرعت با امنیت کامل. سرویس‌های اختصاصی ما با پینگ پایین برای گیمینگ و استریمینگ بهینه‌سازی شده‌اند."
                cardTitle1="VLESS / VMESS"
                cardDes1="سرعت نامحدود"
                cardTitle2="Dedicated IP"
                cardDes2="آی‌پی ثابت"
                btnLink="#"
                btnText="دریافت کانفیگ فوری"
              />
            </div>
            <div className="col">
              <DescriptionCard
                icon={FaTools}
                title="خدمات سخت‌افزاری"
                description="تعمیرات تخصصی انواع گوشی‌های هوشمند و تبلت با قطعات اورجینال. مهندسین ما با پیشرفته‌ترین ابزارها آماده خدمت‌رسانی هستند."
                cardTitle1="Fast / Immediate"
                cardDes1="سرعت بالا"
                cardTitle2="Warranty"
                cardDes2="با گارانتی"
                btnLink="/Services#form"
                btnText="ثبت درخواست تعمیر"
              />
            </div>
          </div>
        </div>
      </section>
      <section className={styles.whyUs}>
        <WhyUs />
      </section>
      <Footer />
    </>
  );
}

export default Home;
