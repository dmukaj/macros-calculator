import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calculateMacros } from "@/utils/calculateMacros";
import { useEffect, useState } from "react";

const Result = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const handleData = async () => {
      const data = await calculateMacros();
      console.log("data", data);
      setUserData(data);
    };
    handleData();
  }, []);
  console.log("userData", userData);
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
        {userData && (
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Total calories</TableCell>
              <TableCell className="text-right">{userData.bmr}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Protein</TableCell>
              <TableCell className="text-right">150 gram</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Carbs</TableCell>
              <TableCell className="text-right">300 gram</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Fats</TableCell>
              <TableCell className="text-right">80 gram</TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default Result;
