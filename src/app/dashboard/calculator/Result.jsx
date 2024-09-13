import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { calculateMacros } from "@/utils/calculateMacros";
import { useEffect, useState } from "react";

const Result = ({ bmr }) => {
  const [calculatedValues, setCalculatedValues] = useState();

  useEffect(() => {
    const data = calculateMacros(bmr);
    setCalculatedValues(data);
  }, [bmr]);

  return (
    <div className="p-20">
      <Table>
        <TableCaption>Your Results.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Macros</TableHead>
            <TableHead className="text-right">Amount </TableHead>
          </TableRow>
        </TableHeader>
        {calculatedValues && (
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Total calories</TableCell>
              <TableCell className="text-right">
                {calculatedValues.calories} cal
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Protein</TableCell>
              <TableCell className="text-right">
                {calculatedValues.protein} g
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Carbs</TableCell>
              <TableCell className="text-right">
                {calculatedValues.carbs} g
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Fats</TableCell>
              <TableCell className="text-right">
                {calculatedValues.fats} g
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      <Button variant="outline">
        <Link asChild href="/dashboard/info">
          Read more about Macros
        </Link>
      </Button>
    </div>
  );
};

export default Result;
