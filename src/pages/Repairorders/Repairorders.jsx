import { useEffect, useState } from "react";
import RepairorderCard from "../../components/cards/RepairorderCard/RepairorderCard";
import { RepairorderCardSkeleton } from "../../components/ui/Skeleton/Skeleton";
import Footer from "../../components/layout/Footer/Footer";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import styles from "./Repairorders.module.scss";
import { getUserRepairOrders } from "../../services/api";

function Repairorders() {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserRepairOrders().then((result) => {
      if (result?.success && Array.isArray(result.data)) {
        setRepairs(result.data);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <HeaderNav />
      <div className={styles.repairorders}>
        <h1 className={styles.title}>رزرو تعمیرات</h1>
        <div className="container">
          {loading ? (
            <div className="row row-cols-xl-2 row-cols-1">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div className="col mb-3" key={idx}>
                  <RepairorderCardSkeleton />
                </div>
              ))}
            </div>
          ) : repairs.length === 0 ? (
            <p className="text-center text-secondary py-5">هیچ نوبت تعمیری رزرو نشده است.</p>
          ) : (
            <div className="row row-cols-xl-2 row-cols-1">
              {repairs.map((item) => (
                <div className="col mb-3" key={item.id}>
                  <RepairorderCard
                    fullName={item.fullName}
                    phoneNumber={item.phoneNumber}
                    deviceType={item.deviceType}
                    serviceType={item.serviceType}
                    reviewed={item.status === "reviewed"}
                    status={item.status}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Repairorders;
