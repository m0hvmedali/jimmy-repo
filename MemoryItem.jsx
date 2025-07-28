import React from 'react';

export default function MemoryItem({ year, title, desc, img }) {
  return (
    <section className="px-4 pb-6">
      <h2 className="text-[22px] font-bold pb-2 pt-4">About {title.toLowerCase().includes(year) ? title : title}</h2>
      <div className="flex flex-col md:flex-row items-stretch gap-4 rounded-xl bg-[#331a1b] p-4">
        <div className="flex flex-col gap-1 flex-[2]">
          <p className="text-[#c89295] text-sm">{year}</p>
          <p className="text-base font-bold">{title}</p>
          <p className="text-[#c89295] text-sm">{desc}</p>
        </div>
        <div
          className="flex-1 bg-center bg-no-repeat bg-cover aspect-video rounded-xl"
          style={{ backgroundImage: `url(${img})` }}
        />
      </div>
    </section>
  );
}