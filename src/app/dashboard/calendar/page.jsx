import React from "react";
import TableComponent from "./TableComponent";
import { DatePickerDemo } from "./DatePickerWithRange";

export default function page() {
  return (
    <div className="flex flex-col items-center h-screen min-w-full mt-20">
      <div className="flex flex-col items-center justify-center">
        <DatePickerDemo />
        <TableComponent />
      </div>
    </div>
  );
}
