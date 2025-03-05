import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* GIF Section */}
      <section className="relative h-[80vh] bg-black">
        {/* Placeholder for GIF */}
        <div className="absolute inset-0 bg-black/50 animate-pulse" />
        
        {/* Text Overlay */}
        <div className="absolute left-[10%] bottom-[15%] font-roboto-mono font-bold text-[333%]">
          <p>Shop</p>
          <p>Spring /</p>
          <p>Summer '25</p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white flex flex-col items-center justify-center">
        <h2 className="text-6xl font-bold mb-2 text-gray-900 font-hanken-grotesk">About</h2>
        
        {/* Dictionary-style breakdown */}
        <div className="mt-4 text-gray-900 font-space-mono">
          <p className="text-sm">
            two six three (noun) /tuː sɪks θriː/
          </p>
          <p className="text-xs mt-2">
            <span className="font-bold">1.</span> A creative collective redefining modern fashion
          </p>
          <p className="text-xs mt-1">
            <span className="font-bold">2.</span> A movement blending art, culture, and innovation
          </p>
        </div>
      </section>
    </div>
  );
}
