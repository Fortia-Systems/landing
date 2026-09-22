import { motion } from "framer-motion";

// Line-by-line masked reveal for hero headings
export const MaskedLines = ({ lines, className = "", delay = 0.2, accentIndex = -1 }) => {
  return (
    <span className="block">
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`block ${className} ${
              i === accentIndex ? "text-fortia-accent" : ""
            }`}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// Scroll-triggered fade + rise
export const Reveal = ({ children, delay = 0, y = 28, className = "", ...rest }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
