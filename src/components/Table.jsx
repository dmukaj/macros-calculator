import PieChartComponent from "./PieChartComponent";
import {
  Table,
  TableBody,
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
import SearchBar from "./SearchBar";

export function TableComponent() {
  return (
    <div className=" flex flex-col w-auto lg:w-2/3">
      <Popover>
        <PopoverTrigger className="flex items-center text-lg bg-white py-2 px-4 rounded-lg">
          Add food
          <MdAddCircleOutline size={20} className="ml-2" />
        </PopoverTrigger>
        <PopoverContent>
          <SearchBar />
        </PopoverContent>
      </Popover>

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
      <div className="flex flex-col lg:gap-6 gap-14 w-3/4 lg:w-2/3">
        <PieChartComponent />

        <div className=" flex flex-col w-full md:space-y-0 md:gap-8 space-y-8 xl:grid xl:grid-cols-2 items-center justify-center">
          <div className="flex flex-col items-center justify-center p-10 rounded-lg border border-dashed  shadow-lg bg-gray-100 hover:bg-gray-50">
            <h1 className="text-lg font-semibold md:text-2xl my-4">
              Breakfast
            </h1>

            <TableComponent />
          </div>
          <div
            className="flex flex-col items-center justify-center p-10  rounded-lg border border-dashed shadow-lg bg-gray-100 hover:bg-gray-50"
            // x-chunk="dashboard-02-chunk-1"
          >
            <h1 className="text-lg font-semibold md:text-2xl my-4">Lunch</h1>

            <TableComponent />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg p-10  border border-dashed shadow-lg bg-gray-100 hover:bg-gray-50">
            <h1 className="text-lg font-semibold md:text-2xl my-4">Dinner</h1>

            <TableComponent />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg p-10  border border-dashed shadow-lg bg-gray-100 hover:bg-gray-50">
            <h1 className="text-lg font-semibold md:text-2xl my-4">Snacks</h1>

            <TableComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
