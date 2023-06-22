"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { ExtendedVehicle } from "@/types";
import {
  Document,
  Page,
  Font,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import FirstPage from "./FirstPage";
import Footer from "./Footer";
import Header from "./Header";
import PageThree from "./PageThree";
import PageTwo from "./PageTwo";
import { styles } from "./styles";
Font.register({
  family: "Cairo",
  fonts: [
    {
      src: "/fonts/cairo/Cairo-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/cairo/Cairo-Medium.ttf",
      fontWeight: "medium",
    },
    {
      src: "/fonts/cairo/Cairo-SemiBold.ttf",
      fontWeight: "semibold",
    },
    {
      src: "/fonts/cairo/Cairo-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const ReportViewer = ({ vehicle }: { vehicle: ExtendedVehicle }) => (
  <div className="relative">
    <PDFDownloadLink
      document={<Report vehicle={vehicle as ExtendedVehicle} />}
      fileName={slugify(vehicle.id)}
    >
      {({ blob, url, loading, error }) => (
        <Button
          disabled={loading}
          className={cn(
            "fixed z-50 transition-opacity opacity-50 hover:opacity-100 bottom-6 right-6 dark:bg-background dark:text-foreground",
            loading && "hidden"
          )}
        >
          <Icons.download className="w-5 h-5" />
        </Button>
      )}
    </PDFDownloadLink>
    <PDFViewer showToolbar style={styles.viewer}>
      <Report vehicle={vehicle as ExtendedVehicle} />
    </PDFViewer>
  </div>
);

export default ReportViewer;

const Report = ({ vehicle }: { vehicle: ExtendedVehicle }) => (
  <Document
    subject="Report"
    creator="Tahaqoq International Co."
    author="Tahaqoq International Co."
    title={slugify(vehicle.id)}
    style={styles.document}
  >
    <Page style={styles.page} size="A4">
      <Header vehicleId={vehicle.id} createdAt={vehicle.createdAt!} />
      <FirstPage vehicle={vehicle} />
      <PageTwo visualInspectionResult={vehicle.visualInspection} />
      <PageThree vehicle={vehicle} />
      <Footer />
    </Page>
  </Document>
);
