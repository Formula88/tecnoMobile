import styles from "./Skeleton.module.scss";

export function Skeleton({
  width,
  height,
  borderRadius,
  variant = "rounded",
  className = "",
  style = {},
}) {
  const customStyles = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...(borderRadius ? { borderRadius } : {}),
    ...style,
  };

  return (
    <div
      className={`${styles.skeleton} ${styles[variant] || ""} ${className}`}
      style={customStyles}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.productSkeletonCard}>
      <Skeleton className={styles.imageBox} />
      <div className={styles.contentBox}>
        <Skeleton className={styles.titleSkeleton} />
        <Skeleton className={styles.descSkeleton} />
        <Skeleton className={styles.descSkeletonShort} />
        <div className={styles.priceBoxSkeleton}>
          <Skeleton className={styles.btnSkeleton} />
          <Skeleton className={styles.priceSkeleton} />
        </div>
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className={styles.serviceSkeletonCard}>
      <Skeleton className={styles.badgeSkeleton} />
      <Skeleton className={styles.titleSkeleton} />
      <Skeleton className={styles.descLine1} />
      <Skeleton className={styles.descLine2} />
      <div className={styles.bottomSection}>
        <div className={styles.priceRow}>
          <Skeleton width="80px" height="18px" />
          <Skeleton width="100px" height="22px" />
        </div>
        <Skeleton className={styles.btnSkeleton} />
      </div>
    </div>
  );
}

export function VPNCardSkeleton() {
  return (
    <div className={styles.vpnSkeletonCard}>
      <div className={styles.headerRow}>
        <Skeleton width="90px" height="24px" borderRadius="16px" />
        <Skeleton width="70px" height="20px" borderRadius="12px" />
      </div>
      <Skeleton className={styles.titleSkeleton} />
      <div className={styles.featureRow}>
        <Skeleton width="85%" height="16px" />
        <Skeleton width="75%" height="16px" />
        <Skeleton width="65%" height="16px" />
      </div>
      <div className={styles.buyWrapper}>
        <div className={styles.priceRow}>
          <Skeleton width="60px" height="16px" />
          <Skeleton width="110px" height="24px" />
        </div>
        <Skeleton className={styles.btnSkeleton} />
      </div>
    </div>
  );
}

export function VPNServicesCardSkeleton() {
  return (
    <div className={styles.vpnServiceSkeletonCard}>
      <div className={styles.cardHeader}>
        <Skeleton width="180px" height="24px" />
        <Skeleton width="110px" height="28px" borderRadius="20px" />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.specsPart}>
          <Skeleton width="90%" height="18px" />
          <Skeleton width="75%" height="18px" />
          <Skeleton width="80%" height="18px" />
          <Skeleton width="60%" height="18px" />
        </div>
        <Skeleton className={styles.actionPart} />
      </div>
    </div>
  );
}

export function ShoppingCartCardSkeleton() {
  return (
    <div className={styles.cartSkeletonCard}>
      <div className={styles.right}>
        <Skeleton className={styles.imgBox} />
        <div className={styles.textBox}>
          <Skeleton width="60%" height="22px" />
          <Skeleton width="90%" height="16px" />
          <Skeleton width="40%" height="16px" />
          <Skeleton width="100px" height="22px" />
        </div>
      </div>
      <div className={styles.left}>
        <Skeleton width="28px" height="28px" borderRadius="6px" />
        <Skeleton width="100px" height="36px" borderRadius="10px" />
      </div>
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        border: "1px solid #333338",
        borderRadius: "16px",
        padding: "20px 24px",
        marginBottom: "16px",
        direction: "rtl",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Skeleton width="140px" height="22px" />
        <Skeleton width="90px" height="26px" borderRadius="16px" />
      </div>
      <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-10">
        <Skeleton width="120px" height="18px" />
        <Skeleton width="80px" height="34px" borderRadius="8px" />
      </div>
    </div>
  );
}

export function RepairorderCardSkeleton() {
  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        border: "1px solid #333338",
        borderRadius: "16px",
        padding: "22px 24px",
        marginBottom: "16px",
        direction: "rtl",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Skeleton width="160px" height="22px" />
        <Skeleton width="100px" height="26px" borderRadius="16px" />
      </div>
      <Skeleton width="85%" height="16px" className="mb-2" />
      <Skeleton width="60%" height="16px" className="mb-3" />
      <Skeleton width="120px" height="16px" />
    </div>
  );
}

export function GlassItemSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: "20px",
        backgroundColor: "#1e1e1e",
        border: "1px solid #333338",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        boxSizing: "border-box",
        marginBottom: "24px",
      }}
    >
      <Skeleton width="70%" height="22px" className="mb-2" />
      <Skeleton width="90%" height="14px" />
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className={`container ${styles.detailSkeletonLayout}`}>
      <Skeleton className={styles.breadcrumbSkeleton} />
      <div className={styles.infoRow}>
        <Skeleton className={styles.imgSide} />
        <div className={styles.textSide}>
          <Skeleton width="75%" height="32px" />
          <Skeleton width="95%" height="16px" />
          <Skeleton width="85%" height="16px" />
          <Skeleton width="40%" height="24px" className="mt-3" />
          <div className="d-flex flex-column gap-2 mt-4">
            <Skeleton width="60%" height="18px" />
            <Skeleton width="50%" height="18px" />
            <Skeleton width="55%" height="18px" />
          </div>
          <Skeleton width="100%" height="52px" borderRadius="12px" className="mt-4" />
        </div>
      </div>
    </div>
  );
}

export function AdminTableSkeleton({ rows = 5, columns = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={rIdx} className="align-middle">
          {Array.from({ length: columns }).map((_, cIdx) => (
            <td key={cIdx} className="py-3 px-2">
              <Skeleton
                width={cIdx === 0 ? "24px" : cIdx === 1 ? "120px" : "80%"}
                height={cIdx === 7 || cIdx === 8 ? "32px" : "18px"}
                borderRadius={cIdx === 7 || cIdx === 8 ? "8px" : "6px"}
                style={{ margin: "0 auto" }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function OrderDetailsSkeleton() {
  return (
    <div>
      <div className="table-responsive mb-4">
        <table className="table text-center align-middle table-bordered table-dark table-striped mb-0">
          <thead>
            <tr>
              <th><Skeleton width="80px" height="18px" style={{ margin: "0 auto" }} /></th>
              <th><Skeleton width="70px" height="18px" style={{ margin: "0 auto" }} /></th>
              <th><Skeleton width="90px" height="18px" style={{ margin: "0 auto" }} /></th>
              <th><Skeleton width="60px" height="18px" style={{ margin: "0 auto" }} /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3"><Skeleton width="60px" height="20px" style={{ margin: "0 auto" }} /></td>
              <td className="py-3"><Skeleton width="80px" height="20px" style={{ margin: "0 auto" }} /></td>
              <td className="py-3"><Skeleton width="100px" height="24px" borderRadius="12px" style={{ margin: "0 auto" }} /></td>
              <td className="py-3"><Skeleton width="110px" height="20px" style={{ margin: "0 auto" }} /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Skeleton width="120px" height="24px" className="mb-3" />
      <div className="table-responsive mb-4">
        <table className="table text-center align-middle table-bordered table-dark table-striped mb-0">
          <thead>
            <tr>
              <th><Skeleton width="40px" height="18px" style={{ margin: "0 auto" }} /></th>
              <th><Skeleton width="80px" height="18px" style={{ margin: "0 auto" }} /></th>
              <th><Skeleton width="60px" height="18px" style={{ margin: "0 auto" }} /></th>
              <th><Skeleton width="40px" height="18px" style={{ margin: "0 auto" }} /></th>
              <th><Skeleton width="70px" height="18px" style={{ margin: "0 auto" }} /></th>
              <th><Skeleton width="70px" height="18px" style={{ margin: "0 auto" }} /></th>
            </tr>
          </thead>
          <tbody>
            {[1, 2].map((i) => (
              <tr key={i}>
                <td className="py-2"><Skeleton width="50px" height="50px" borderRadius="8px" style={{ margin: "0 auto" }} /></td>
                <td className="py-2"><Skeleton width="120px" height="18px" style={{ margin: "0 auto" }} /></td>
                <td className="py-2"><Skeleton width="70px" height="18px" style={{ margin: "0 auto" }} /></td>
                <td className="py-2"><Skeleton width="30px" height="18px" style={{ margin: "0 auto" }} /></td>
                <td className="py-2"><Skeleton width="90px" height="18px" style={{ margin: "0 auto" }} /></td>
                <td className="py-2"><Skeleton width="90px" height="18px" style={{ margin: "0 auto" }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Skeleton;
