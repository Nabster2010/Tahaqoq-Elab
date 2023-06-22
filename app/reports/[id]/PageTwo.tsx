"use client";
import { categorizedVisualInspectionData } from "@/config/visualInspectionConfig";
import { VisualInspection } from "@prisma/client";
import { Text, View } from "@react-pdf/renderer";
import GroupTestHeader from "./GroupTestHeader";
import { styles } from "./styles";
import VisualInspectionItemBox from "./VisualInspectionItemBox";

const PageTwo = ({
  visualInspectionResult,
}: {
  visualInspectionResult: VisualInspection;
}) => {
  return (
    <View break>
      <Text
        style={[
          styles.heading,
          { alignSelf: "center", fontSize: 12, marginBottom: 5 },
        ]}
      >
        تقرير الفحص الخارجي
      </Text>
      <View style={[styles.rowBetween, { gap: 5 }]}>
        <View
          style={[
            {
              display: "flex",
              flexDirection: "column",
              width: "50%",
            },
          ]}
        >
          <GroupTestHeader>الفحص الخارجي</GroupTestHeader>
          {categorizedVisualInspectionData.exteriorInspection
            .slice(0, 37)
            .map((item) => {
              return (
                <VisualInspectionItemBox
                  key={item.name}
                  no={item.no}
                  title={item.arabicDescription}
                  //@ts-ignore
                  result={visualInspectionResult[item.name]}
                  isHeading={item.isHeading}
                  subHeading={item.subHeading || false}
                />
              );
            })}
        </View>
        <View
          style={[
            {
              width: "50%",
            },
          ]}
        >
          {categorizedVisualInspectionData.exteriorInspection
            .slice(37)
            .map((item) => (
              <VisualInspectionItemBox
                key={item.name}
                no={item.no}
                title={item.arabicDescription}
                //@ts-ignore
                result={visualInspectionResult[item.name]}
                isHeading={item.isHeading}
                subHeading={item.subHeading || false}
              />
            ))}
          <GroupTestHeader>الفحص الداخلي</GroupTestHeader>
          {categorizedVisualInspectionData.interiorInspection.map((item) => (
            <VisualInspectionItemBox
              key={item.name}
              no={item.no}
              title={item.arabicDescription}
              //@ts-ignore
              result={visualInspectionResult[item.name]}
              isHeading={item.isHeading}
              subHeading={item.subHeading || false}
            />
          ))}

          {categorizedVisualInspectionData.saftyRequirements.map((item) => (
            <VisualInspectionItemBox
              key={item.name}
              no={item.no}
              title={item.arabicDescription}
              //@ts-ignore
              result={visualInspectionResult[item.name]}
              isHeading={item.isHeading}
              subHeading={item.subHeading || false}
            />
          ))}
          {categorizedVisualInspectionData.modernSystems.map((item) => (
            <VisualInspectionItemBox
              key={item.name}
              no={item.no}
              title={item.arabicDescription}
              //@ts-ignore
              result={visualInspectionResult[item.name]}
              isHeading={item.isHeading}
              subHeading={item.subHeading || false}
            />
          ))}
          {categorizedVisualInspectionData.fuelEconomy.map((item) => (
            <VisualInspectionItemBox
              key={item.name}
              no={item.no}
              title={item.arabicDescription}
              //@ts-ignore
              result={visualInspectionResult[item.name]}
              isHeading={item.isHeading}
            />
          ))}
          <GroupTestHeader>متطلبات اخري</GroupTestHeader>
          {categorizedVisualInspectionData.otherRequierments.map((item) => (
            <VisualInspectionItemBox
              key={item.name}
              no={item.no}
              title={item.arabicDescription}
              //@ts-ignore
              result={visualInspectionResult[item.name]}
              isHeading={item.isHeading}
              subHeading={item.subHeading || false}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default PageTwo;
