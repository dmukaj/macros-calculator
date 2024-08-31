import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";

export function TableComponent({ mealType }) {
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

export function TableDemo() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col lg:gap-6 gap-14 w-3/4 lg:w-2/3">
        <div className=" flex flex-col w-full md:space-y-0 md:gap-8 space-y-8 xl:grid xl:grid-cols-2 items-center justify-center">
          <div className="flex flex-col items-center justify-center p-10 rounded-lg border border-dashed  shadow-lg bg-gray-100 hover:bg-gray-50">
            <h1 className="text-lg font-semibold md:text-2xl my-4">
              Breakfast
            </h1>
            <TableComponent mealType="Breakfast" />
          </div>
          <div className="flex flex-col items-center justify-center p-10  rounded-lg border border-dashed shadow-lg bg-gray-100 hover:bg-gray-50">
            <h1 className="text-lg font-semibold md:text-2xl my-4">Lunch</h1>

            <TableComponent mealType="Lunch" />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg p-10  border border-dashed shadow-lg bg-gray-100 hover:bg-gray-50">
            <h1 className="text-lg font-semibold md:text-2xl my-4">Dinner</h1>

            <TableComponent mealType="Dinner" />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg p-10  border border-dashed shadow-lg bg-gray-100 hover:bg-gray-50">
            <h1 className="text-lg font-semibold md:text-2xl my-4">Snacks</h1>

            <TableComponent mealType="Snack" />
          </div>
        </div>
      </div>
    </main>
  );
}
