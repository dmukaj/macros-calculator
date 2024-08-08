import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Result = () => {
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
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Total calories</TableCell>
            <TableCell className="text-right">2500</TableCell>
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
      </Table>
    </div>
  );
};

export default Result;
