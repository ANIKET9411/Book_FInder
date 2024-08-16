// src/HeroSection.js

const Hero = () => {
  return (
    <div className="bg-blue-500 text-white text-center w-full relative h-[80vh]">
      <img
        src="https://images.unsplash.com/photo-1491841651911-c44c30c34548?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="w-[100%] h-[100%]"
      />
      <div
        className="absolute top-1/3 p-3 left-0 lg:left-20 md:left-20 m-4 rounded-md"
        style={{ backgroundColor: " rgba(255, 255, 255, 0.4)" }}
      >
        <h1 className="text-4xl font-extrabold mb-4 text-[#e4842e]">
          Find Your Next Favorite Book
        </h1>
        <p className="mb-6 text-black">
          Search through thousands of books in just a few clicks.
        </p>
        <button>Get Started</button>
      </div>
    </div>
  );
};

export default Hero;
