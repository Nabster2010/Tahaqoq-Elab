"use client";
import {
  addLeadingZeros,
  arabicDateFormat,
  englishDateFormat,
  slugify,
} from "@/lib/helpers";
import { ExtendedVehicle } from "@/types";
import {
  Document,
  Page,
  Text,
  View,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import Footer from "../Footer";
import Header from "../Header";
import { styles } from "../styles";
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
function Receipt({ vehicle }: { vehicle: ExtendedVehicle }) {
  return (
    <PDFViewer style={styles.viewer}>
      <Document title={slugify(vehicle.id)} language="arabic">
        <Page size="A4" style={styles.page}>
          <Header
            createdAt={vehicle.createdAt}
            vehicleId={vehicle.id}
            title={`MEMO NO:${addLeadingZeros(vehicle.id)}`}
            description="بيان تنظيمي"
            memo={true}
          />
          <ReceiptInfo vehicle={vehicle} />
          <Footer />
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default Receipt;

const ReceiptInfo = ({ vehicle }: any) => {
  const createdAt = vehicle.createdAt;
  const createdBy = vehicle?.user?.name;
  return (
    <View>
      <View
        style={[
          styles.rowBetween,
          {
            backgroundColor: "#f1f5f9",
            marginTop: 20,
            fontWeight: "bold",
            fontSize: 12,
            paddingVertical: 5,
            paddingHorizontal: 4,
            marginBottom: 4,
          },
        ]}
      >
        <Text style={{ display: "flex", alignSelf: "center" }}>
          بيانات الطلب
        </Text>
        <Text style={{ display: "flex", alignSelf: "center" }}>
          Vehicle Information
        </Text>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-end" }}>
            اسم العميل
          </Text>
        </View>
        <View
          style={[
            styles.tableHead,

            { flex: 1, borderRight: "none", borderLeft: "none" },
          ]}
        >
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "medium",
            }}
          >
            {vehicle.customer?.name}
          </Text>
        </View>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-start" }}>
            Customer Name
          </Text>
        </View>
      </View>
      <View style={[styles.tableRow, { borderTop: 0 }]}>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-end" }}>
            اسم شخص التواصل
          </Text>
        </View>
        <View
          style={[
            styles.tableHead,

            { flex: 1, borderRight: "none", borderLeft: "none" },
          ]}
        >
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "medium",
            }}
          >
            {vehicle?.broker?.name}
          </Text>
        </View>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-start" }}>
            contact Person
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-end" }}>جوال</Text>
        </View>
        <View
          style={[
            styles.tableHead,

            { flex: 1, borderRight: "none", borderLeft: "none" },
          ]}
        >
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "medium",
            }}
          >
            {vehicle.customer?.phone || vehicle?.broker?.phone}
          </Text>
        </View>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-start" }}>
            Contact Number
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-end" }}>
            رقم البيان
          </Text>
        </View>
        <View
          style={[
            styles.tableHead,

            { flex: 1, borderRight: "none", borderLeft: "none" },
          ]}
        >
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "medium",
            }}
          >
            {vehicle.bayanNo}
          </Text>
        </View>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-start" }}>
            Bayan No:
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-end" }}>
            تاريخ البيان
          </Text>
        </View>
        <View
          style={[
            styles.tableHead,

            { flex: 1, borderRight: "none", borderLeft: "none" },
          ]}
        >
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "medium",
            }}
          >
            {arabicDateFormat(new Date(vehicle.bayanDate))}
          </Text>
        </View>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-start" }}>
            Bayan Date:
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-end" }}>
            رقم الاحاله
          </Text>
        </View>
        <View
          style={[
            styles.tableHead,

            { flex: 1, borderRight: "none", borderLeft: "none" },
          ]}
        >
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "medium",
            }}
          >
            {vehicle.reqNo}
          </Text>
        </View>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-start" }}>
            Request No:
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-end" }}>
            تاريخ الاحاله
          </Text>
        </View>
        <View
          style={[
            styles.tableHead,

            { flex: 1, borderRight: "none", borderLeft: "none" },
          ]}
        >
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "medium",
            }}
          >
            {englishDateFormat(vehicle.reqDate)}
          </Text>
        </View>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-start" }}>
            Request Date:
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-end" }}>
            المنفذ الجمركي
          </Text>
        </View>
        <View
          style={[
            styles.tableHead,

            { flex: 1, borderRight: "none", borderLeft: "none" },
          ]}
        >
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "medium",
            }}
          >
            {vehicle.port}
          </Text>
        </View>
        <View style={[styles.tableHead, { width: 120, paddingHorizontal: 4 }]}>
          <Text style={{ display: "flex", alignSelf: "flex-start" }}>
            Custom Port:
          </Text>
        </View>
      </View>
      <View style={styles.tableRow}>
        <View
          style={[
            styles.tableHead,
            styles.cellBottomBorder,
            { width: 120, paddingHorizontal: 4 },
          ]}
        >
          <Text style={{ display: "flex", alignSelf: "flex-end" }}>
            طريقة الدفع
          </Text>
        </View>
        <View
          style={[
            styles.tableHead,
            styles.cellBottomBorder,
            { flex: 1, borderRight: "none", borderLeft: "none" },
          ]}
        >
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "medium",
            }}
          >
            {vehicle.paymentType}
          </Text>
        </View>
        <View
          style={[
            styles.tableHead,
            styles.cellBottomBorder,
            { width: 120, paddingHorizontal: 4 },
          ]}
        >
          <Text style={{ display: "flex", alignSelf: "flex-start" }}>
            Payment Type:
          </Text>
        </View>
      </View>

      {/*Chassis section */}
      <View
        style={[styles.tableRow, { marginTop: 30, backgroundColor: "#f1f5f9" }]}
      >
        {/* th */}
        <View style={[styles.tableHead, { width: "40%", letterSpacing: 1.2 }]}>
          <View
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "extrabold",
              fontSize: 12,
            }}
          >
            <Text style={{ display: "flex", alignSelf: "center" }}>
              Chassis Number{" "}
            </Text>
            <Text
              style={{
                display: "flex",
                alignSelf: "center",
                fontWeight: "medium",
              }}
            >
              رقم الهيكل
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.tableHead,

            { borderRight: "none", borderLeft: "none", width: "30%" },
          ]}
        >
          <View
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "extrabold",
              fontSize: 12,
            }}
          >
            <Text style={{ display: "flex", alignSelf: "center" }}>
              Test Report No
            </Text>
            <Text
              style={{
                display: "flex",
                alignSelf: "center",
                fontWeight: "medium",
              }}
            >
              رقم التقرير
            </Text>
          </View>
        </View>
        <View style={[styles.tableHead, { width: "30%" }]}>
          <View
            style={{
              display: "flex",
              alignSelf: "center",
              fontWeight: "extrabold",
              fontSize: 12,
            }}
          >
            <Text style={{ display: "flex", alignSelf: "center" }}>
              Description
            </Text>
            <Text
              style={{
                display: "flex",
                alignSelf: "center",
                fontWeight: "medium",
              }}
            >
              وصف العملية
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.tableRow]}>
        {/* tr */}

        <View
          style={[styles.tableHead, styles.cellBottomBorder, { width: "40%" }]}
        >
          <Text
            style={{
              display: "flex",
              alignSelf: "center",
              letterSpacing: 1.2,
            }}
          >
            {vehicle.vin}
          </Text>
        </View>
        <View
          style={[
            styles.tableHead,
            styles.cellBottomBorder,
            {
              borderRight: "none",
              borderLeft: "none",
              width: "30%",
            },
          ]}
        >
          <Text style={{ display: "flex", alignSelf: "center" }}>
            {slugify(vehicle.id)}
          </Text>
        </View>
        <View
          style={[
            styles.tableHead,
            styles.cellBottomBorder,
            { width: "30%", fontWeight: "medium" },
          ]}
        >
          <View style={{ display: "flex", alignSelf: "center" }}>
            <Text style={{ display: "flex", alignSelf: "center" }}>
              Vehicle Inspection
            </Text>
            <Text style={{ display: "flex", alignSelf: "center" }}>
              فحص مركبة
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 150,
          textAlign: "left",
          fontWeight: "semibold",
          fontSize: 10,
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
        }}
      >
        <Text>Created by :</Text>
        <Text style={{ fontWeight: "medium", color: "#64748b", fontSize: 9 }}>
          {" "}
          {createdBy}
        </Text>
      </View>
      <View
        style={{
          marginTop: 5,
          textAlign: "left",
          fontWeight: "semibold",
          fontSize: 10,
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "center",
        }}
      >
        <Text>Created At :</Text>
        <Text style={{ fontWeight: "medium", color: "#64748b", fontSize: 9 }}>
          {new Date(createdAt).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};
