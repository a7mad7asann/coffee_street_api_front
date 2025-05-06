const BuildingLoader = ({ loading }) => {
    return (
      <div
        className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-white z-50 transition-opacity duration-700 ${loading ? "opacity-100" : "opacity-0 invisible"}`}
      >
        <video
          src="/loader/Animation.webm"
          alt="loading"
          className="w-80 h-80"  // حجم الفيديو هنا (80x80)
          autoPlay
          loop
          muted
        />
      </div>
    );
  };
  
  export default BuildingLoader;
  