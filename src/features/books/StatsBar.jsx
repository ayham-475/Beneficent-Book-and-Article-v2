import React from 'react';

const StatsBar = () => {
  const stats = [
    { label: "قارئ نشط", value: "+45K" },
    { label: "كتاب رقمي", value: "+12K" },
    { label: "أرباح الكتاب", value: "$120K" },
    { label: "تقييم إيجابي", value: "4.9" },
  ];

  return (
    <div className="bg-blue-600/10 border-y border-white/5 py-[3vw]">
      <div className="flex flex-row justify-around items-center">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <h4 className="text-[3.5vw] font-black text-white leading-none">{stat.value}</h4>
            <p className="text-blue-400 text-[1.2vw] font-bold mt-[0.5vw] uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;