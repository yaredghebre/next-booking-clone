'use client';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BedDoubleIcon, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';

export const formSchema = z.object({
  location: z.string().min(2, 'Please digit at least two characters').max(60),
  dates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  adults: z
    .string()
    .min(1, { message: 'Please select at least 1 adult' })
    .max(12, { message: 'Max 12 adults occupancy' }),
  children: z.string().min(1).max(12, { message: 'Max 12 children occupancy' }),
  rooms: z.string().min(1, { message: 'Max 12 children occupancy' }),
});

function SearchForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // to check values
    defaultValues: {
      location: '',
      dates: {
        from: undefined,
        to: undefined,
      },
      adults: '1',
      children: '0',
      rooms: '1',
    },
  });

  // works as a validator!
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    const checkInMonthday = values.dates.from.getDate().toString();
    const checkInMonth = (values.dates.from.getMonth() + 1).toString();
    const checkInYear = values.dates.from.getFullYear().toString();

    const checkOutMonthday = values.dates.to.getDate().toString();
    const checkOutMonth = (values.dates.to.getMonth() + 1).toString();
    const checkOutYear = values.dates.to.getFullYear().toString();

    const checkIn = `${checkInYear}-${checkInMonth}-${checkInMonthday}`;
    const checkOut = `${checkOutYear}-${checkOutMonth}-${checkOutMonthday}`;

    const url = new URL('https://www.booking.com/searchresults.html');
    url.searchParams.set('ss', values.location);
    url.searchParams.set('group_adults', values.adults);
    url.searchParams.set('group_children', values.children);
    url.searchParams.set('no_rooms', values.rooms);
    url.searchParams.set('checkin', checkIn);
    url.searchParams.set('checkout', checkOut);

    router.push(`/search?url=${url.href}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} // remember to pass fn as a param of handleSubmit
        className="flex flex-col items-center justify-center space-x-0 space-y-4 rounded-lg lg:mx-auto lg:max-w-6xl lg:flex-row lg:space-x-2 lg:space-y-0"
      >
        {/* Location */}
        <div className="grid w-full items-center gap-1.5 lg:max-w-sm">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex text-white">
                  Location <BedDoubleIcon className="ml-2 h-4 w-4 text-white" />
                </FormLabel>

                <FormMessage />

                <FormControl>
                  <Input placeholder="London, UK" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Dates */}
        <div className="grid w-full items-center gap-1.5 lg:max-w-sm">
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white">Dates</FormLabel>

                <FormMessage />
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        id="date"
                        name="dates"
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal lg:w-[300px]',
                          !field.value.from && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
                        {field.value?.from ? (
                          field.value?.to ? (
                            <>
                              {format(field.value?.from, 'LLL dd, y')} -{''}
                              {format(field.value?.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(field.value?.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Select your dates</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      selected={field.value}
                      defaultMonth={field.value.from}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>

        {/* People */}
        <div className="flex w-full items-center space-x-2">
          <div className="grid flex-1 items-center">
            <FormField
              control={form.control}
              name="adults"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Adults</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="number" placeholder="Adults" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid flex-1 items-center">
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Children</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="number" placeholder="Children" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid flex-1 items-center">
            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-white">Rooms</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="number" placeholder="Rooms" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <div className="mt-auto">
            <Button type="submit" className="bg-blue-500 text-base">
              Search
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
