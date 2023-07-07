import BrokerListItem from "@/components/broker-list-item";
import Pagination from "@/components/Pagination";
import SearchForm from "@/components/filter-form";
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
import { siteConfig } from "@/config/site";
import { authOptions } from "@/lib/auth";
import { getPaginatedBrokers } from "@/lib/db/broker";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata = {
  title: "Brokers",
  description: "add and edit Brokers",
};
const BrokersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getServerSession(authOptions);
  const isAdminUser = session?.user?.role === "admin";
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = searchParams.pageSize
    ? parseInt(searchParams.pageSize)
    : siteConfig.pageSize;
  const search = searchParams.search
    ? decodeURIComponent(searchParams.search as string)
    : "";
  const { brokers, currentPage, totalPages } = await getPaginatedBrokers(
    search,
    page,
    pageSize
  );

  return (
    <Card className="mt-4">
      <CardHeader className="">
        <Title className="mb-4">Brokers</Title>
        <div className="flex flex-col-reverse gap-8 md:items-center md:justify-between md:flex-row">
          <SearchForm
            path="/brokers"
            //action={searchAction}
            defaultValue={search}
            searchParams={searchParams}
          />
          <Link
            href="/brokers/create"
            className={cn(buttonVariants({}), "ml-auto w-full md:w-auto ")}
          >
            Create New
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="font-bold ">
              <TableHead className="w-fit ">Name</TableHead>
              <TableHead className="hidden md:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Percentage</TableHead>
              <TableHead className="text-right">Edit</TableHead>
              {isAdminUser && (
                <TableHead className="text-right">Delete</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {brokers && brokers?.length > 0 ? (
              brokers.map((broker) => (
                <BrokerListItem
                  broker={broker}
                  key={broker.id}
                  page={page}
                  pageSize={pageSize}
                  search={search}
                  isAdminUser={isAdminUser}
                />
              ))
            ) : (
              <TableRow>
                <TableCell className="w-full text-center" colSpan={5}>
                  No Brokers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {totalPages && totalPages >= 1 ? (
          <Pagination
            pathName="brokers"
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

export default BrokersPage;
