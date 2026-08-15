const PromoBanner = () => (
  <section className="px-[4vw] py-[2vw]">
    <div className="relative h-[30vw] rounded-[3vw] bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 overflow-hidden flex items-center justify-between px-[6vw]">
      <div className="z-10 space-y-[1.5vw]">
        <span className="bg-amber-500 text-black font-black px-[1.5vw] py-[0.5vw] rounded-full text-[1.2vw]">خصم 40% لفترة محدودة</span>
        <h2 className="text-[4.5vw] font-black leading-none">مكتبة رمضان <br/> <span className="text-blue-400">للفكر والتطوير</span></h2>
        <button className="bg-white text-blue-900 px-[3vw] py-[1.2vw] rounded-xl font-black text-[1.5vw] shadow-2xl">تسوق الآن</button>
      </div>
      <div className="relative w-[25vw] h-[25vw] flex items-center justify-center">
         <div className="absolute inset-0 bg-blue-500/20 blur-[5vw] rounded-full animate-pulse"></div>
         <img src="./imgs/OIP (11).webp" className="w-[58vw] h-100 rotate-1 shadow-[20px_20px_50px_rgba(0,0,0,0.5)] rounded-lg relative z-0" />
      </div>
    </div>
  </section>
);
export default PromoBanner