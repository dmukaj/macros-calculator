import TableComponent from "@/components/Table";

export default function TableDemo() {
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
