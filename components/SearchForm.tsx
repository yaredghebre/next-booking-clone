'use client';
import * as z from 'zod';
import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BedDoubleIcon, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  //   const router = useRouter();

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // validator
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} // remember to pass fn as a param of handleSubmit
        className="flex flex-col items-center justify-center space-x-0 space-y-4 rounded-lg lg:mx-auto lg:max-w-6xl lg:space-x-2 lg:space-y-0"
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
                  <PopoverTrigger asChild></PopoverTrigger>
                </Popover>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

export default SearchForm;
