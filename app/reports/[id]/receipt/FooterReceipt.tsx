import { siteConfig } from "@/config/site";
import { Text, View, Image } from "@react-pdf/renderer";
import { styles } from "../styles";
const FooterReceipt = () => {
  return (
    <View style={{ marginTop: "auto" }} fixed>
      <View style={[styles.dividerLG]} />

      <View style={[styles.footer]}>
        <View
          style={[
            styles.floatRight,
            styles.headText,
            { fontWeight: "semibold", fontSize: 8 },
          ]}
        >
          <Text>
            <Text>{siteConfig.ar_branch}</Text>
            <Text>مركز التحقق الدولية لفحص السيارات </Text>
          </Text>
          <Text>
            <Text>{siteConfig.ar_address}</Text>
            <Text>العنوان :</Text>
          </Text>
          <Text>
            <Text style={styles.englishLightText}>{siteConfig.phone}</Text>
            <Text> الهاتف:</Text>
          </Text>
          <Text>
            <Text style={styles.englishLightText}>{siteConfig.email}</Text>
            <Text>: ايميل</Text>
          </Text>
          <View>
            <Text
              style={{ fontFamily: "Cairo", fontSize: 8, fontWeight: "medium" }}
            >
              <Text>{" 4.1.7- ن"}</Text>
            </Text>
          </View>
        </View>
        <View>
          <Image src="/images/logo.png" style={styles.logo} />
          <Text
            style={[
              styles.englishBoldText,
              styles.headText,
              { alignSelf: "center", marginTop: 6 },
            ]}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
        <View
          style={[
            styles.englishLightText,
            styles.headText,
            { fontSize: 9, fontWeight: "semibold" },
            styles.column,
            { alignItems: "flex-start", justifyContent: "flex-start" },
          ]}
        >
          <Text>TAHAQOQ Vehicle Inspection Center</Text>
          <Text>Address: {siteConfig.address}</Text>
          <Text>Phone: {siteConfig.phone}</Text>
          <Text>Email:{siteConfig.email}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: 1,
              fontFamily: "Cairo",
              fontSize: 8,
              fontWeight: "medium",
            }}
          >
            <Text>اصدار رقم</Text>
            <Text>{" 8 "}</Text>
            <Text>بتاريخ</Text>
            <Text>{"01/03/2024"}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: 1,
              fontFamily: "Cairo",
              fontSize: 8,
              fontWeight: "medium",
            }}
          >
            <Text>رقم المراجعة</Text>
            <Text>{" 00 "}</Text>
            <Text>بتاريخ</Text>
            <Text>{"01/03/2024"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default FooterReceipt;
