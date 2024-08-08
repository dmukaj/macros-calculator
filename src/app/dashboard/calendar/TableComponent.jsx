import React from "react";

const TableComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" rounded-lg w-full mt-4 lg:gap-10 ">
        <table className="w-full text-sm text-left bg-neutral-200 text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-[#caf0f8] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Food name
              </th>
              <th scope="col" className="px-6 py-3">
                Protein
              </th>
              <th scope="col" className="px-6 py-3">
                Fats
              </th>
              <th scope="col" className="px-6 py-3">
                Carbs
              </th>
              <th scope="col" className="px-6 py-3">
                Calories
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-100 border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Steak
              </th>
              <td className="px-6 py-4">180</td>
              <td className="px-6 py-4">180</td>
              <td className="px-6 py-4">180</td>
              <td className="px-6 py-4">180</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
