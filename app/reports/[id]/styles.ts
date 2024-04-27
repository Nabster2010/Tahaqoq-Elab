import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  document: {},
  page: {
    backgroundColor: "#ffffff",
    color: "#000",
    paddingHorizontal: 30,
    paddingVertical: 20,
    fontSize: 16,
    fontFamily: "Cairo",
  },
  viewer: {
    width: "100%",
    height: "100vh",
    border: "none",
  },

  row: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  rowBetween: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  colBetween: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  floatRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },

  logo: {
    width: "120px",
    height: "auto",
  },

  heading: {
    fontWeight: "bold",
    fontSize: 12,
  },
  englishBoldText: {
    fontFamily: "Times-Bold",
  },
  englishLightText: {
    fontFamily: "Times-Roman",
  },
  headText: {
    fontWeight: "bold",
    fontSize: 10,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  tableCol: {
    paddingVertical: 4,
    textAlign: "right",
    paddingRight: 4,
    paddingLeft: 0,
    fontSize: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    border: "1px solid #cbd5e1",
    borderBottom: "none",
    height: "auto",
  },
  tableHead: {
    paddingVertical: 4,
    textAlign: "right",
    paddingRight: 2,
    paddingLeft: 2,
    fontSize: 10,
    fontWeight: "bold",
    border: "1px solid #cbd5e1",
    borderBottom: "none",
  },
  cellBottomBorder: {
    borderBottom: "1px solid #cbd5e1",
  },
  textSm: {
    fontSize: 8,
    fontWeight: "normal",
  },
  //-----
  signture: {
    marginTop: 8,
    textAlign: "right",
  },

  dividerLG: {
    width: "100%",
    height: 0.75,
    backgroundColor: "black",
  },

  footer: {
    paddingTop: 3,
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  title: { fontSize: 14, fontWeight: "semibold" },
  tableHeadText: { fontSize: 12, fontWeight: "medium" },
  tableCellText: { fontSize: 10, fontWeight: "normal" },
  qrContainer: {
    alignSelf: "flex-start",
  },

  qrImg: {
    width: 90,
    height: 90,
    border: "1px solid gray",
    padding: 1,
    marginBottom: 10,
  },
});
