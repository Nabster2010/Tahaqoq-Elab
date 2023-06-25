"use client";
import { siteConfig } from "@/config/site";
import { arabicDateFormat, englishDateFormat, slugify } from "@/lib/helpers";
import { Text, View, Image } from "@react-pdf/renderer";
import { styles } from "./styles";
const Header = ({
  createdAt,
  vehicleId,
}: {
  createdAt: Date;
  vehicleId: number;
}) => {
  const date = new Date(createdAt!).toLocaleDateString("en-GB");

  return (
    <View fixed>
      <View style={styles.rowBetween}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <View
          style={[
            styles.floatRight,
            styles.headText,
            { fontWeight: "semibold" },
          ]}
        >
          <Text>مركز التحقق الدولية لفحص المركبات</Text>
          <Text style={styles.englishLightText}>
            TAHAQOQ International Vehicle
          </Text>
          <Text style={styles.englishLightText}>
            {" "}
            Inspection Center - {siteConfig.branch}
          </Text>
        </View>
        <View style={[styles.column]}>
          <Text style={[styles.heading, styles.englishBoldText, {}]}>
            INSPECTION REPORT
          </Text>
          <Text style={[styles.headText]}>تقرير الفحص</Text>
          <Text>
            <Text style={[styles.headText]}>
              {slugify(vehicleId)}
              {`  `}
            </Text>
            <Text style={[styles.headText]}>رقم التقرير:</Text>
          </Text>
          <View style={styles.row}>
            <View
              style={{ display: "flex", flexDirection: "row-reverse", gap: 4 }}
            >
              <Text style={styles.headText}>التاريخ:</Text>
              <Text style={styles.headText}>
                {englishDateFormat(createdAt!)}
              </Text>
              <Text style={styles.headText}>الموافق:</Text>
              <Text style={styles.headText}>
                {arabicDateFormat(createdAt!)}
              </Text>
            </View>
          </View>
        </View>

        <Image src="/images/logo.png" style={styles.logo} />
      </View>
      <View style={[styles.dividerLG, { marginTop: 10 }]} />
    </View>
  );
};
export default Header;
