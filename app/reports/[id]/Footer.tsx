import { siteConfig } from "@/config/site";
import { Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./styles";
const Footer = () => {
  return (
    <View style={{ marginTop: "auto" }} fixed>
      <View style={[styles.dividerLG]} />
      <View style={[styles.footer]}>
        <View
          style={[
            styles.floatRight,
            styles.headText,
            { fontWeight: "semibold" },
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
        </View>
        <View>
          <Image src="/images/logo.png" style={styles.logo} />
          <Text
            style={[
              styles.englishBoldText,
              styles.headText,
              { alignSelf: "center", marginTop: 10 },
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
            styles.column,
            { alignItems: "flex-start", justifyContent: "flex-start", gap: 3 },
          ]}
        >
          <Text>TAHAQOQ Vehicle Inspection Center</Text>
          <Text>Address: {siteConfig.address}</Text>
          <Text>Phone: {siteConfig.phone}</Text>
          <Text>Email:{siteConfig.email}</Text>
        </View>
      </View>
    </View>
  );
};
export default Footer;
