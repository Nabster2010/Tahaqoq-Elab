import { Text, View } from "@react-pdf/renderer";
import { styles } from "./styles";

const GroupTestHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <View
      style={[
        styles.tableHead,
        { paddingVertical: 0, backgroundColor: "#f5f5f5" },
      ]}
    >
      <Text style={{ textAlign: "right", fontSize: 8, fontWeight: "bold" }}>
        {children}
      </Text>
    </View>
  );
};

export default GroupTestHeader;
