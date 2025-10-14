import React from "react";

import styles from "./MobileMenu.module.css";
import { motion } from "framer-motion";
import { navItems } from "../../../../lib/categories";

import Background from "../../../../../public/logo-transparent.png";
import NavItem from "../Desktop/NavItem";

type MobileMenuProps = {
  closeMenu: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ closeMenu }) => {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: "100%" }}
      exit={{ height: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
      className={styles.container}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className={styles.outerContainer}
      >
        <motion.div className={styles.innerContainer}>
          <motion.div
            onClick={() => closeMenu()}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: { delay: 0.18 },
            }}
          >
            <NavItem item={{ label: "Naslovnica", path: "" }} />
          </motion.div>
          {navItems.map((el, index) => (
            <motion.div
              key={index}
              onClick={() => closeMenu()}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: { delay: 0.2 + 0.02 * index },
              }}
            >
              <NavItem item={el} key={el.label} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
