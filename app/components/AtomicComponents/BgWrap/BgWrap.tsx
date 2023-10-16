import Image from "next/image";
import React from "react";
import Bg from "../../../../public/landing-bg.png";
import styles from "./BgWrap.module.scss";

const BgWrap = () => {
  return (
    <div className={styles.bgWrap}>
      <Image
        alt="landging background"
        blurDataURL={"/landing-bg.jpg"}
        src={Bg}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default BgWrap;
