import ColorListItem from "@/components/color-list-item";
import Pagination from "@/components/Pagination";
import SearchForm from "@/components/search-form";
import Title from "@/components/Title";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authOptions } from "@/lib/auth";
import { getPaginatedColors } from "@/lib/db/color";
import { cn } from "@/lib/utils";
import { PageSearchParams } from "@/types";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata = {
  title: "Colors",
  description: "add and edit colors",
};
const ColorsPage = async ({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) => {
  const session = await getServerSession(authOptions);
  const isAdminUser = session?.user?.role === "admin";
  const { colors, currentPage, totalPages } = await getPaginatedColors({
    ...searchParams,
    search: searchParams.search
      ? decodeURIComponent(searchParams.search as string)
      : undefined,
  });

  return (
    <Card className="mt-2">
      <CardHeader className="space-y-2">
        <Title>Colors</Title>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <SearchForm />
          <Link
            href="/colors/create"
            className={cn(buttonVariants({}), "ml-auto w-full md:w-auto")}
          >
            Create New
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="font-bold ">
              <TableHead className="w-fit ">Color</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="text-right">Edit</TableHead>
              {isAdminUser && (
                <TableHead className="text-right">Delete</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {colors && colors?.length > 0 ? (
              colors.map((color) => (
                <ColorListItem
                  key={color.id}
                  color={color}
                  isAdminUser={isAdminUser}
                />
              ))
            ) : (
              <TableRow>
                <TableCell className="w-full text-center" colSpan={3}>
                  No Colors found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {totalPages && totalPages >= 1 ? (
          <Pagination
            pathName="colors"
            totalPages={totalPages}
            currentPage={currentPage}
            searchParams={searchParams}
          />
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
};

export default ColorsPage;
