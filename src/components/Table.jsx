import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";

export default function TableComponent({ mealType }) {
  const handleAddFood = () => {
    localStorage.setItem("selectedMeal", mealType);
  };
  return (
    <div className=" flex flex-col w-auto lg:w-2/3">
      <div
        onClick={handleAddFood}
        className=" flex items-center justify-center text-lg bg-white py-2 px-4 rounded-lg hover:text-blue-700"
      >
        <Link href="/dashboard/search">Add Food</Link>
      </div>

      <div className="relative shadow-md sm:rounded-lg w-full mt-4 bg-gray-200 ">
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
