import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* GIF Section */}
      <section className="relative h-[80vh] bg-black">
        {/* Placeholder for GIF */}
        <div className="absolute inset-0 bg-black/50 animate-pulse" />
        
        {/* Text Overlay */}
        <div className="absolute left-[5%] bottom-[10%] font-roboto-mono font-bold text-[333%]">
          <p>Shop</p>
          <p>Spring /</p>
          <p>Summer '25</p>
        </div>
      </section>

      {/* About Section */}
      <section className="pt-8 pb-16 bg-white flex flex-col items-center justify-center">
        <h2 className="text-6xl font-bold mb-2 text-gray-900 font-space-mono">About</h2>
        
        {/* Dictionary-style breakdown */}
        <div className="mt-4 text-gray-900 font-space-mono">
          <p className="text-base">
            <span className="font-bold">2 6 3</span> <span className="italic">(noun)</span> <span className="text-gray-600">\ tuː sɪks θriː \</span>
          </p>
          <p className="text-sm mt-2">
            <span className="font-bold">1.</span> a creative collective redefining modern fashion
          </p>
          <p className="text-sm mt-1">
            <span className="font-bold">2.</span> a movement blending art, culture, and innovation
          </p>
          <p className="text-sm mt-1">
            <span className="font-bold">3.</span> a student project unlike any other
          </p>
        </div>

        {/* New Section */}
        <div className="mt-8 text-center">
          <p className="font-bold text-gray-900">263 STUDIOS</p>
          <p className="mt-1">
            <a 
              href="https://jaebirdsall.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              a project by Jae Birdsall
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
