import { useState } from "react";
import HoverIcons from "./HoverIcons/HoverIcons";
import { motion } from "framer-motion";

const Card = ({ card, resData }) => {
  const [showIcons, setShowIcons] = useState(false);

  const { title, short_desc, description, color } = card;
  const splittedText = title.split(" ");
  let remainingText;

  if (splittedText.length > 2) {
    const array = [...splittedText];
    array.splice(0, 2);
    remainingText = array.join(" ");
  }


  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20,
      },
    },
  };

  return (
    <>
      <motion.li
        className="item-card"
        style={{ borderColor: color }}
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}
        variants={itemVariants}
      >
        <h2>
          <svg viewBox="0 0 12.32 9.33" aria-hidden="true"><g><line className="st1" x1="7.6" y1="8.9" x2="7.6" y2="6.9"></line><rect width="1.9" height="1.9"></rect><rect x="1.9" y="1.9" width="1.9" height="1.9"></rect><rect x="3.7" y="3.7" width="1.9" height="1.9"></rect><rect x="1.9" y="5.6" width="1.9" height="1.9"></rect><rect y="7.5" width="1.9" height="1.9"></rect></g></svg>
          {" "}
          <span style={{ color: "#2E95D3" }}>{splittedText[0]}</span>{" "}
          <span style={{ color: "#DF3079" }}>{splittedText[1]}</span>{" "}
          <span> {remainingText}</span>
        </h2>
        <p className="short-desc-text">{short_desc}</p>
        <p className="description-text">{description}</p>
        {showIcons && <HoverIcons color={color} title={title} />}
      </motion.li>
    </>

  );
};

export default Card;
