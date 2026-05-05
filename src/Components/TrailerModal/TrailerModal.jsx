import { motion } from "framer-motion";
import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const TrailerModal = ({ trailerKey, onClose }) => {

  const [mute, setMute] = useState(true);
  const [loading, setLoading] = useState(true);

  if (!trailerKey) return null;

  return (
    <div className="trailer-overlay" onClick={onClose}>

      <motion.div
        className="trailer-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Close */}
        <button className="close-btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
        </button>


        {/* Skeleton */}
        {loading && (
          <div className="skeleton-loader"></div>
        )}

        {/* Video */}
        <iframe
          className="trailer-frame"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=${mute ? 1 : 0}`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          onLoad={() => setLoading(false)}
        />

      </motion.div>
    </div>
  );
};

export default TrailerModal;