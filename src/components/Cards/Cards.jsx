import Card from "./Card/Card";
import { motion } from "framer-motion";
import { v4 as uuid } from "uuid";

const Cards = ({ selectedTab }) => {
  const containerVariants = {
    hidden: {
      opacity: 1,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  return (
    <>
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="cards-list-wrapper"
      >
        {selectedTab?.list_items?.length > 0 ? (selectedTab.list_items.map((card) => (
          <Card key={uuid()} card={card} />
        ))
        ) : (
          <p>No items to display</p>
        )}
      </motion.ul>
    </>
  );
};

export default Cards;
