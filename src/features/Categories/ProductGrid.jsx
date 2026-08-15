const   BookCard = ({ book }) => (
  <div className="group relative bg-[#121214] rounded-[2.5rem] p-4 border border-white/5 hover:border-emerald-500/30 transition-all duration-500">
    {/* صورة الغلاف بتأثير ثلاثي الأبعاد */}
    <div className="relative h-42 rounded-[2rem] overflow-hidden mb-6 shadow-2xl transition-transform duration-500 group-hover:-translate-y-3">
      <img src={book.cover} className="w-full h-full object-cover" alt="" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
        <button className="bg-white text-black text-[10px] font-black px-6 py-3 rounded-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
          معاينة سريعة
        </button>
      </div>
    </div>

    {/* تفاصيل الكتاب */}
    <div className="px-2 space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-md tracking-tighter">
          {book.badge}
        </span>
        <div className="flex text-amber-500 gap-0.5">
          {'★'.repeat(5)}
        </div>
      </div>
      
      <h3 className="text-lg font-black text-white truncate">{book.title}</h3>
      <p className="text-gray-500 text-xs font-medium">الكاتب: {book.author}</p>
      
      <div className="pt-4 flex items-center justify-between">
        <div>
          <span className="text-2xl font-black text-white">${book.price}</span>
          {book.oldPrice && <span className="text-xs text-gray-600 line-through mr-2">${book.oldPrice}</span>}
        </div>
        <button className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl hover:bg-emerald-500 hover:text-black transition-all">
          <i className="lucide-shopping-cart"></i> 🛒
        </button>
      </div>
    </div>
  </div>
);

export default BookCard