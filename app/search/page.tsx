import { notFound } from 'next/navigation';
import React from 'react';
import { fetchResults } from '@/lib/fetchResults';
import Link from 'next/link';

type Props = {
  searchParams: SearchParams;
};

export type SearchParams = {
  // ss: string;
  // src: string;
  url: URL;
  group_adults: string;
  group_children: string;
  no_rooms: string;
  checkin: string;
  checkout: string;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

async function SearchPage({ searchParams }: Props) {
  if (!searchParams.url) {
    return notFound();
  }
  const results = await fetchResults(searchParams);
  if (!results) {
    return <div>No results...</div>;
  }
  console.log(results);

  return (
    <section>
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <h1 className="pb-3 text-4xl font-bold">Your trip results</h1>
        <h2 className="pb-3">
          {/* Dates:{' '} */}
          <span className="ml-2 italic">
            {formatDate(searchParams.checkin)} to{' '}
            {formatDate(searchParams.checkout)}
          </span>
        </h2>

        <hr className="mb-5" />

        <h3 className="font-semibold">{results.content.total_listings}</h3>

        <div className="mt-5 space-y-2">
          {results.content.listings.map((item, i) => (
            <div
              key={item.link}
              className="flex flex-col justify-between space-x-4 space-y-2 rounded-lg border p-5 md:flex-row"
            >
              <img
                src={item.url}
                alt="Image of property found"
                className="h-44 w-full rounded-lg object-cover md:w-44"
              />
              <div className="flex flex-col justify-between space-x-5 md:flex-1 md:flex-row">
                <div>
                  <Link
                    href={item.link}
                    className="font-bold text-blue-600 duration-150 hover:text-blue-600 hover:underline"
                  >
                    {item.title}
                  </Link>
                  <p className="text-xs">{item.description}</p>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="flex space-x-2 md:items-start md:justify-end md:text-right">
                    <div>
                      <p className="font-bold">{item.rating_word}</p>
                      <p className="text-xs">{item.rating_count}</p>
                    </div>

                    <p className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-900 text-sm font-bold text-white">
                      {item.rating || 'N/A'}
                    </p>
                  </div>

                  <div className="md:text-right">
                    <p className="text-xs">{item.booking_metadata}</p>
                    <p className="text-2xl font-bold">{item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SearchPage;
