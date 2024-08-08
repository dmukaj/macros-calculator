import React from "react";
import { Button } from "@/components/ui/button";
import PieChartComponent from "./PieChartComponent";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdAddCircleOutline } from "react-icons/md";

export function TableComponent() {
  return (
    <div>
      <div className="w-full flex-1">
        <Popover>
          <PopoverTrigger className="flex items-center text-lg bg-white py-2 px-4 rounded-lg">
            Add food
            <MdAddCircleOutline size={20} className="ml-2" />
          </PopoverTrigger>
          <PopoverContent>
            <form>
              <div className="relative">
                <Input
                  type="search"
                  placeholder="search food"
                  className="w-full appearance-none bg-background pl-8"
                />
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>
      <div className="relative shadow-md sm:rounded-lg w-full mt-4 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Food</TableHead>
              <TableHead className="text-right">grams</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Steak</TableCell>
              <TableCell className="text-right">120</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Eggs</TableCell>
              <TableCell className="text-right">60</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function TableDemo() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col lg:gap-6 p-10  gap-14 w-3/4 lg:w-2/3">
        <PieChartComponent />

        <div className=" flex flex-col w-full md:space-y-0 md:gap-8 space-y-8 lg:grid lg:grid-cols-2 items-center justify-center">
          <div
            className="flex flex-col items-center justify-center p-10 rounded-lg border border-dashed shadow-sm bg-gray-100 hover:bg-gray-50"
            x-chunk="dashboard-02-chunk-1"
          >
            <h1 className="text-lg font-semibold md:text-2xl my-4">
              Breakfast
            </h1>

            <TableComponent />
          </div>
          <div
            className="flex flex-col items-center justify-center p-10  rounded-lg border border-dashed shadow-sm bg-gray-100 hover:bg-gray-50"
            x-chunk="dashboard-02-chunk-1"
          >
            <h1 className="text-lg font-semibold md:text-2xl my-4">Lunch</h1>

            <TableComponent />
          </div>
          <div
            className="flex flex-col items-center justify-center rounded-lg p-10  border border-dashed shadow-sm bg-gray-100 hover:bg-gray-50"
            x-chunk="dashboard-02-chunk-1"
          >
            <h1 className="text-lg font-semibold md:text-2xl my-4">Dinner</h1>

            <TableComponent />
          </div>
          <div
            className="flex flex-col items-center justify-center rounded-lg p-10  border border-dashed shadow-sm bg-gray-100 hover:bg-gray-50"
            x-chunk="dashboard-02-chunk-1"
          >
            <h1 className="text-lg font-semibold md:text-2xl my-4">Snacks</h1>

            <TableComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
