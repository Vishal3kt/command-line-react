import { useState } from "react";
import { motion } from "framer-motion";

const HoverIcons = ({ color, title }) => {

    const [isCopied, setIsCopied] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText(title);
        setIsCopied(true);
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover-icons-wrapper" onClick={handleCopy}>

            {
                isCopied ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="copied-message">Copied...</motion.span>
                ) : (
                    <motion.i initial={{ opacity: 0, scale: 0, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="fa-duotone fa-solid fa-copy" exit={{ y: 20 }}></motion.i>
                )
            }
        </motion.div>
    )
}

export default HoverIcons