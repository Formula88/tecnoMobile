import styles from "./Profile.module.scss";
import HeaderNav from "../../components/layout/HeaderNav/HeaderNav";
import Footer from "../../components/layout/Footer/Footer";
import UserCard from "../../components/sections/UserCard/UserCard";

function profile() {
  return (
    <div>
      <HeaderNav />
      <section className={styles.profile}>
        <div className="container">
          <UserCard userNumber={"09129072416"} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default profile;
