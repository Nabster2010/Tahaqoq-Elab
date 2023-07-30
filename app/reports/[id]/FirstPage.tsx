"use client";
import { siteConfig } from "@/config/site";
import {
  arabicDateFormat,
  englishDateFormat,
  getFinalResult,
  slugify,
} from "@/lib/helpers";
import { ExtendedVehicle } from "@/types";
import { Image, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";
import QRCode from "qrcode";

const FirstPage = ({ vehicle }: { vehicle: ExtendedVehicle }) => {
  const finalResult = getFinalResult(vehicle);
  // const inspectionDate = vehicle.vehicleInfo.inspectionDate
  //   ? new Date(vehicle?.vehicleInfo.inspectionDate)
  //   : vehicle.createdAt;

  const data = `
  Company Name : ${siteConfig.title}
  Report Number : ${slugify(vehicle.id)}
  Inspection Date : ${englishDateFormat(vehicle.createdAt)}
  Vin : ${vehicle.vin}
  Result : ${finalResult}
  `;
  const result = QRCode.toDataURL(data, {
    margin: 2,
  });
  return (
    <View>
      <View
        style={{
          marginTop: 30,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row-reverse" }}>
          <View>
            <View style={styles.tableRow}>
              <View
                style={[
                  styles.tableHead,
                  styles.cellBottomBorder,
                  { width: "16.7%" },
                ]}
              >
                <Text>رقـم الهيكل </Text>
              </View>
              <View
                style={[
                  styles.tableCol,
                  styles.cellBottomBorder,
                  styles.englishLightText,
                  {
                    width: "83.3%",
                    borderRight: "none",
                    fontWeight: "bold",
                    fontSize: 12,
                    letterSpacing: 1,
                  },
                ]}
              >
                <Text>{vehicle.vin}</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.row,
            {
              marginTop: 20,
            },
          ]}
        >
          <View
            style={{
              width: "62%",
              fontSize: "9.3px",
            }}
          >
            <View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "27%" }]}>
                  <Text>مكان الفحص </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "73%", fontSize: "9.5px", borderRight: "none" },
                  ]}
                >
                  <Text>{siteConfig.inspectionCenter}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "27%" }]}>
                  <Text>جهة طلب الفحص </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "73%", fontSize: "9.5px", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle?.port}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "27%" }]}>
                  <Text>تاريخ الفحص</Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "73%", fontSize: "9.5px", borderRight: "none" },
                  ]}
                >
                  <Text>{englishDateFormat(vehicle.createdAt)}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "27%" }]}>
                  <Text>رقـم بيان الاستيراد </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "73%", fontSize: "9.5px", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle?.bayanNo}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "27%" }]}>
                  <Text>تاريخ بيان الاستيراد </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "73%", fontSize: "9.5px", borderRight: "none" },
                  ]}
                >
                  <Text>{arabicDateFormat(new Date(vehicle?.bayanDate))}</Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "27%" }]}>
                  <Text>رقـم الاحالة </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "73%", fontSize: "9.5px", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle?.reqNo}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableHead,
                    styles.cellBottomBorder,
                    { width: "27%" },
                  ]}
                >
                  <Text>اسم المستورد </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    styles.cellBottomBorder,
                    { width: "73%", fontSize: "9.3px", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle?.customer?.name}</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "38%",
            }}
          >
            <View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "38%" }]}>
                  <Text>عدد الركاب </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "62%", fontSize: "9.3px", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.vehicleInfo?.seats}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "38%" }]}>
                  <Text> قراءة العداد </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "62%", fontSize: "9.3px", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.vehicleInfo?.mileage}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "38%" }]}>
                  <Text> نوع المركبة </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "62%", fontSize: "9.3px", borderRight: "none" },
                  ]}
                >
                  <Text>
                    {vehicle.vehicleInfo.vehicleType?.manufacturer?.description}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "38%" }]}>
                  <Text> الطراز </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "62%", fontSize: "9.3px", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.vehicleInfo?.vehicleType?.modelType}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "38%" }]}>
                  <Text> الموديل </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "62%", fontSize: "9.3px", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.vehicleInfo?.year}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "38%" }]}>
                  <Text> اللون </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "62%", fontSize: "9.3px", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.vehicleInfo.color?.description}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableHead,
                    styles.cellBottomBorder,
                    { width: "38%" },
                  ]}
                >
                  <Text>بلد الاستيراد</Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    styles.cellBottomBorder,
                    { width: "62%", fontSize: "9.3px", borderRight: "none" },
                  ]}
                >
                  <Text>
                    {vehicle.vehicleInfo.vehicleType?.manufacturer?.country}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.column}>
        {/* نتيجة الفحص */}

        <View style={[styles.row, { gap: 0, width: "40%", marginTop: 80 }]}>
          <View
            style={[
              styles.tableHead,
              styles.cellBottomBorder,
              { width: "50%", borderLeft: "none", textAlign: "center" },
            ]}
          >
            <Text>: نتيجة الفــحص</Text>
          </View>
          <View
            style={[
              styles.tableCol,
              styles.cellBottomBorder,
              { width: "50%", justifyContent: "center" },
            ]}
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {finalResult === "PASS" ? "مطابق" : "غيرمطابق"}
            </Text>
          </View>
        </View>

        {/* المدير الفني */}
        <View style={[{ marginTop: 40, width: "100%" }]}>
          <View
            style={[
              styles.tableHead,
              styles.cellBottomBorder,
              { width: "40%" },
            ]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Text style={{ textAlign: "center" }}>المدير الفني : </Text>
              <Text style={{ textAlign: "center" }}>{siteConfig.manager}</Text>
            </View>
          </View>
        </View>
        {/* الختم والتوقيع */}
        <View style={[styles.row, { marginTop: 10, gap: 100 }]}>
          <View>
            <Image
              style={{ width: 180 }}
              src={`/images/stamp-${siteConfig.branch}.jpeg`}
            />
          </View>
          <View>
            <Image
              style={{ width: 180 }}
              src={`/images/sign-${siteConfig.branch}.jpeg`}
            />
          </View>
        </View>
        {/* qr code */}
        <View style={[styles.qrContainer]}>
          <Image src={result} style={[styles.qrImg]} />
        </View>
      </View>
    </View>
  );
};

export default FirstPage;
