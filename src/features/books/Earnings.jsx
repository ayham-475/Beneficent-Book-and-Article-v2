const FlashSales = () => (
  <section className="px-[4vw]">
    <div className="bg-[#1e1b4b] rounded-[3vw] p-[3vw] flex items-center justify-between border border-blue-500/30">
      <div className="flex items-center gap-[3vw]">
        <div className="text-right">
          <h3 className="text-[2.5vw] font-black text-white">عروض الصاعقة ⚡</h3>
          <p className="text-blue-300 text-[1.2vw]">تنتهي خلال: <span className="font-mono text-white">02:45:10</span></p>
        </div>
        <div className="h-[5vw] w-[1px] bg-white/10 mx-[2vw]"></div>
        <div className="flex gap-[2vw]">
           {/* هنا يتم وضع كتب مصغرة بأسعار محروقة */}
           <div className="w-[10vw] text-center">
              <div className="bg-black/40 rounded-xl p-[1vw] mb-[0.5vw]">
                <img src="https://via.placeholder.com/80x120" className="mx-auto" />
              </div>
              <span className="text-emerald-400 font-bold">$5.00</span>
              <span className="text-gray-500 line-through text-[0.8vw] mr-1">$15</span>
           </div>
        </div>
      </div>
      <button className="text-blue-400 font-bold text-[1.4vw] flex items-center gap-1">شاهد كل العروض ←</button>
    </div>
  </section>
);
export default FlashSales