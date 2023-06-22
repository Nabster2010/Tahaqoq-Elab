import { Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";

type Props = {
  no: number;
  title: string;
  result: string;
  isHeading?: boolean;
  subHeading?: boolean;
};

const VisualInspectionItemBox = ({
  no,
  title,
  result,
  isHeading,
  subHeading,
}: Props) => {
  return (
    <View
      style={[
        styles.tableRow,
        {
          gap: 0,
          backgroundColor: isHeading ? "#f5f5f5" : "",
        },
      ]}
    >
      <View
        style={[
          styles.tableHead,
          {
            paddingVertical: 0,
            paddingHorizontal: 0,
            width: "6%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={[styles.textSm]}>{no}</Text>
      </View>
      <View
        style={[
          styles.tableHead,
          {
            flex: 1,
            paddingVertical: 0,
            paddingHorizontal: 0,
            borderLeft: "none",
            borderRight: "none",
          },
        ]}
      >
        <Text
          style={[
            styles.textSm,
            {
              textAlign: "right",
              fontWeight: isHeading ? "bold" : "normal",
            },
          ]}
        >
          {title}
        </Text>
      </View>
      <View
        style={[
          styles.tableCol,
          {
            paddingVertical: 0,
            paddingHorizontal: 0,
            width: "9%",
            justifyContent: "center",
          },
        ]}
      >
        <Text
          style={[
            styles.textSm,
            {
              fontWeight: result === "FAIL" ? "bold" : "normal",
              color: result === "FAIL" ? "red" : "",
            },
          ]}
        >
          {result}
        </Text>
      </View>
    </View>
  );
};

export default VisualInspectionItemBox;
