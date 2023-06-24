"use client";
import { siteConfig } from "@/config/site";
import { englishDateFormat, getFinalResult } from "@/lib/helpers";
import { ExtendedVehicle } from "@/types";
import { Image, Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";

const FirstPage = ({ vehicle }: { vehicle: ExtendedVehicle }) => {
  return (
    <View>
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row-reverse" }}>
          <View>
            <View style={styles.tableRow}>
              <View
                style={[
                  styles.tableHead,
                  styles.cellBottomBorder,
                  { width: "23.5%" },
                ]}
              >
                <Text>رقـم الشاسيــة </Text>
              </View>
              <View
                style={[
                  styles.tableCol,
                  styles.cellBottomBorder,
                  styles.englishLightText,
                  { width: "76.5%", borderRight: "none" },
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
              width: "60%",
            }}
          >
            <View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "40%" }]}>
                  <Text>مكان الفحص </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "60%", borderRight: "none" },
                  ]}
                >
                  <Text>{siteConfig.inspectionCenter}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "40%" }]}>
                  <Text>الجهة الطالبة للفحص </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "60%", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.port}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "40%" }]}>
                  <Text>تاريخ الفحص</Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "60%", borderRight: "none" },
                  ]}
                >
                  <Text>{englishDateFormat(vehicle?.createdAt!)}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "40%" }]}>
                  <Text>رقـم بيان الاستيراد </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "60%", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.bayanNo}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "40%" }]}>
                  <Text>تاريخ بيان الاستيراد </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "60%", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.bayanDate}</Text>
                </View>
              </View>

              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "40%" }]}>
                  <Text>رقـم الاحالة </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "60%", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.reqNo}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableHead,
                    styles.cellBottomBorder,
                    { width: "40%" },
                  ]}
                >
                  <Text>اسم المستورد </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    styles.cellBottomBorder,
                    { width: "60%", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.customer.name}</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "40%",
            }}
          >
            <View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "50%" }]}>
                  <Text>عدد الركاب </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "50%", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.vehicleInfo.seats}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "50%" }]}>
                  <Text> قراءة العداد </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "50%", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.vehicleInfo.mileage}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "50%" }]}>
                  <Text> نوع المركبة </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "50%", borderRight: "none" },
                  ]}
                >
                  <Text>
                    {vehicle.vehicleInfo.vehicleType.manufacturer.description}
                  </Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "50%" }]}>
                  <Text> الطراز </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "50%", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.vehicleInfo.vehicleType.modelType}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "50%" }]}>
                  <Text> الموديل </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "50%", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.vehicleInfo.year}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={[styles.tableHead, { width: "50%" }]}>
                  <Text> اللون </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    { width: "50%", borderRight: "none" },
                  ]}
                >
                  <Text>{vehicle.vehicleInfo.color.description}</Text>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View
                  style={[
                    styles.tableHead,
                    styles.cellBottomBorder,
                    { width: "50%" },
                  ]}
                >
                  <Text> البلد المستورد منه </Text>
                </View>
                <View
                  style={[
                    styles.tableCol,
                    styles.cellBottomBorder,
                    { width: "50%", borderRight: "none" },
                  ]}
                >
                  <Text>
                    {vehicle.vehicleInfo.vehicleType.manufacturer.country}
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
              { width: "50%", borderLeft: "none" },
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
              {getFinalResult(vehicle) === "PASS" ? "مطابق" : "غيرمطابق"}
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
            <Text style={{ textAlign: "center" }}>
              المدير الفني : عبدالحكيم البريه{" "}
            </Text>
          </View>
        </View>
        {/* الختم والتوقيع */}
        <View style={[styles.row, { marginTop: 10 }]}>
          <View>
            <Image style={{ width: 180 }} src={"/images/stamp.jpeg"} />
          </View>
          <View>
            <Image style={{ width: 200 }} src={"/images/sign.jpeg"} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FirstPage;
