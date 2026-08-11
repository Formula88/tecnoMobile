import React from "react";
import AdminLayout from "../../layout/AdminLayout";
import PanelCard from "../../components/PanelCard/PanelCard";
import styles from "./Panel.module.scss";

function Panel() {
  const cards = [
    {
      title: "تعداد کاربران",
      text: "30 نفر",
    },
    {
      title: "تعداد سفارشات",
      text: "16 عدد",
    },
    {
      title: "تعداد وی پی ان ها",
      text: "150 عدد",
    },
    {
      title: "تعداد کالا ها",
      text: "250 عدد",
    },
    {
      title: "تعداد پلن های وی پی ان",
      text: "150 عدد",
    },
    {
      title: "تعداد خدمات",
      text: "15 عدد",
    },
    {
      title: "سفارشات جدید",
      text: "12 عدد",
    },
    {
      title: "درخواست VPN جدید",
      text: "12 عدد",
    },
    {
      title: "روزو خدمات حدید",
      text: "15 عدد",
    },
  ];
  return (
    <AdminLayout>
      <div className={styles.cardBox} dir="rtl">
        <div className="row row-cols-3 justify-content-between h-100">
          {cards.map((value, index) => {
            return (
              <div className={`col ${styles.col}`}>
                <PanelCard title={value.title} text={value.text}/>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Panel;
