import Pagination from "@/components/Pagination";
import SearchForm from "@/components/search-form";
import Title from "@/components/Title";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { siteConfig } from "@/config/site";
import { getPaginatedManufacturers } from "@/lib/db/manufacturer";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ManufacturersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize)
    : siteConfig.pageSize;
  const search = searchParams.search ? searchParams.search : "";

  const { manufacturers, currentPage, totalPages } =
    await getPaginatedManufacturers(search, page, pageSize);

  return (
    <Card className="mt-4">
      <CardHeader className="space-y-4">
        <Title>Manufacturers</Title>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <SearchForm searchParams={searchParams} />

          <Link
            href="/manufacturers/create"
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
              <TableHead className="w-fit ">Manufacturer</TableHead>
              <TableHead className="hidden md:table-cell">
                Description
              </TableHead>
              <TableHead className="hidden md:table-cell">Country</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manufacturers && manufacturers?.length > 0 ? (
              manufacturers.map((manufacturer) => (
                <TableRow key={manufacturer.id}>
                  <TableCell className="font-medium">
                    {manufacturer.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {manufacturer.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {manufacturer.country}
                  </TableCell>

                  <TableCell className="text-right">
                    <Link
                      className={cn(buttonVariants({}))}
                      href={`/manufacturers/${manufacturer.id}`}
                    >
                      Update
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="w-full text-center" colSpan={4}>
                  No Manufacturers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {totalPages && totalPages >= 1 ? (
          <Pagination
            pathName="manufacturers"
            currentPage={page}
            totalPages={totalPages}
            pageSize={pageSize}
            search={search}
          />
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
};

export default ManufacturersPage;
