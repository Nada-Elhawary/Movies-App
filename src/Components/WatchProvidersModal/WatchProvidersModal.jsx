import { motion } from "framer-motion";

const IMG_PATH = "https://image.tmdb.org/t/p/w200";

const WatchProvidersModal = ({ providers, onClose }) => {

    return (
        <div className="providers-overlay" onClick={onClose}>

            <motion.div
                className="providers-modal"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
            >

                <h3 className="text-center mb-4 text-warning">
                    Where to Watch 🎬
                </h3>

                {/* 🔥 لو مفيش منصات */}
                {providers.list.length === 0 ? (
                    <p className="text-center text-light">
                        No streaming available 😢
                    </p>
                ) : (
                    <div className="providers-list">

                        {providers.list.map((p) => (

                            <div
                                key={p.provider_id}
                                className="provider-card"
                                onClick={() => window.open(providers.link, "_blank")}
                            >

                                <img
                                    src={`https://image.tmdb.org/t/p/w200${p.logo_path}`}
                                    alt={p.provider_name}
                                />

                                <p>{p.provider_name}</p>

                            </div>

                        ))}

                    </div>
                )}

                <button className="close-btn" onClick={onClose}>
                    ✖
                </button>

            </motion.div>

        </div>
    );
};

export default WatchProvidersModal;