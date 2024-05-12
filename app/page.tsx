import Image from 'next/image';
import { trendingData } from './data/trending';
import SearchForm from '@/components/SearchForm';

export default function Home() {
  return (
    <main className="bg-azul">
      {/* Heading */}
      <section className="mx-auto max-w-7xl p-6 font-bold">
        <h2 className="text-5xl font-bold text-white">Find your next Stay</h2>
        <h3 className="py-5 text-xl text-white">
          Search low prices on hotels, homes and much more
        </h3>
      </section>

      {/* Search Form */}
      <section className="m-4 -mb-14 mt-0 px-2 lg:px-4">
        <SearchForm />
      </section>

      <section className="mx-auto mt-10 max-w-7xl rounded-t-lg bg-white p-6">
        <div className="pt-5">
          <h3 className="text-xl font-bold">Trending Destinations</h3>
          <p className="font-light">
            Most popular choices for travellers from around the world
          </p>
        </div>

        <div className="flex space-x-4 overflow-x-scroll py-5">
          {trendingData.map((item) => (
            <div key={item.id} className="shrink-0 cursor-pointer space-y-1">
              <img
                key={item.id}
                // width={300}
                // objectFit="cover"
                // height={300}
                className="h-72 w-80 rounded-lg object-cover pb-2"
                alt={`${item.title} picture`}
                src={item.src}
              />
              <h3 className="">{item.title}</h3>
              <p className="">{item.location}</p>
              <p className="text-sm font-light">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
