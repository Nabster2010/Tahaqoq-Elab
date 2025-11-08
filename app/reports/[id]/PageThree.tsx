"use client";

import { styles } from "./styles";
import { ExtendedVehicle } from "@/types";
import { Text, View } from "@react-pdf/renderer";

const PageThree = ({ vehicle }: { vehicle: ExtendedVehicle }) => {
  return (
    <View break>
      <Text
        style={[
          styles.heading,
          { alignSelf: "center", fontSize: 12, marginBottom: 5 },
        ]}
      >
        تقرير الفحوصات الفنية
      </Text>
      {/* thead */}
      <View
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          height: 40,
          fontSize: 10,
          fontWeight: "bold",
        }}
      >
        <View
          style={{
            width: "5%",
            border: "1px solid #cbd5e1",
            borderLeft: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>م.</Text>
        </View>
        <View
          style={{
            width: "12%",
            border: "1px solid #cbd5e1",
            borderLeft: 0,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>المواصفة</Text>
        </View>
        <View
          style={{
            width: "8%",
            border: "1px solid #cbd5e1",
            borderLeft: 0,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>البند</Text>
        </View>
        <View
          style={{
            width: "20%",
            border: "1px solid #cbd5e1",
            borderLeft: 0,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>اسم الفحص</Text>
        </View>
        <View
          style={{
            width: "45%",
            border: "1px solid #cbd5e1",
            borderLeft: 0,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>النتائج</Text>
        </View>
        <View
          style={{
            width: "10%",
            border: "1px solid #cbd5e1",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text wrap> المطابقة </Text>
        </View>
      </View>
      {/* tbody */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 9,
          fontWeight: "semibold",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            height: 40,
          }}
        >
          <View
            style={{
              width: "5%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>1</Text>
          </View>
          <View
            style={{
              width: "12%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>م ق س ٤٨٢١</Text>
          </View>
          <View
            style={{
              width: "8%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            {vehicle.vehicleInfo.fuelType === "DIESEL" ? (
              <Text>2/4/6</Text>
            ) : (
              <Text>1/4/6</Text>
            )}
          </View>
          <View
            style={{
              width: "20%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>فحص غازات العادم</Text>
          </View>
          {/*  */}
          {vehicle.vehicleInfo.fuelType === "PETROL" && (
            <View style={{ width: "45%", flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  borderRight: "1px solid #cbd5e1",
                  borderBottom: "1px solid #cbd5e1",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text>هيدروكربونات </Text>
                <Text>جزء من المليون</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderRight: "1px solid #cbd5e1",
                  borderBottom: "1px solid #cbd5e1",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text>اول اكسيد </Text>
                <Text> الكربون</Text>
              </View>
            </View>
          )}
          {vehicle.vehicleInfo.fuelType === "DIESEL" && (
            <View style={{ width: "45%", flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  borderRight: "1px solid #cbd5e1",
                  borderBottom: "1px solid #cbd5e1",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text>وقود الديزل </Text>
              </View>
            </View>
          )}

          {/*  */}
          <View
            style={{
              width: "10%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: vehicle?.emissionTest?.result === "FAIL" ? "red" : "",
              }}
            >
              {vehicle?.emissionTest?.result === "FAIL" ? "فشل" : "اجتياز"}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            height: 40,
          }}
        >
          <View
            style={{
              width: "5%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "12%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "8%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "20%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {vehicle.vehicleInfo.fuelType === "DIESEL" ? (
              <View style={{ display: "flex", flexDirection: "row-reverse" }}>
                <Text>-</Text>
                <Text>مقدار كثافة الدخان</Text>
              </View>
            ) : (
              <>
                <View style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <Text>-</Text>
                  <Text>اول اكسيدالكربون</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row-reverse" }}>
                  <Text>-</Text>
                  <Text>غاز الهيدروكربون</Text>
                </View>
              </>
            )}
          </View>
          <View style={{ width: "45%", flexDirection: "row" }}>
            {vehicle.vehicleInfo.fuelType === "PETROL" && (
              <>
                <View
                  style={{
                    flex: 1,
                    borderRight: "1px solid #cbd5e1",
                    borderBottom: "1px solid #cbd5e1",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                  }}
                >
                  <Text>{vehicle?.emissionTest?.hc} ppm</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderRight: "1px solid #cbd5e1",
                    borderBottom: "1px solid #cbd5e1",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 40,
                  }}
                >
                  <Text>{vehicle?.emissionTest?.co} %</Text>
                </View>
              </>
            )}
            {vehicle.vehicleInfo.fuelType === "DIESEL" && (
              <View
                style={{
                  flex: 1,
                  borderRight: "1px solid #cbd5e1",
                  borderBottom: "1px solid #cbd5e1",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <Text>{vehicle?.emissionTest?.diesel} %</Text>
              </View>
            )}
          </View>
          <View
            style={{
              width: "10%",
              border: "1px solid #cbd5e1",
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        </View>
        {/* tr */}
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            height: 40,
          }}
        >
          <View
            style={{
              width: "5%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>2</Text>
          </View>
          <View
            style={{
              width: "12%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>م ق س ٤٨٢١</Text>
          </View>
          <View
            style={{
              width: "8%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>5/6</Text>
          </View>
          <View
            style={{
              width: "20%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>فحص استقامة</Text>
          </View>
          {/*  */}
          <View style={{ width: "45%", flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>يمين </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text> يسار</Text>
            </View>
          </View>

          {/*  */}
          <View
            style={{
              width: "10%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: vehicle?.highBeamLevel?.result === "FAIL" ? "red" : "",
              }}
            >
              {vehicle?.highBeamLevel?.result === "FAIL" ? "فشل" : "اجتياز"}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            height: 40,
          }}
        >
          <View
            style={{
              width: "5%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "12%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "8%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "20%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                borderTop: 0,
                flexDirection: "row-reverse",
              }}
            >
              <Text>وشدة شعاع الانوار</Text>
            </View>
          </View>
          <View style={{ width: "45%", flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>{vehicle?.highBeamLevel?.right} cd</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>{vehicle?.highBeamLevel?.left} cd</Text>
            </View>
          </View>
          <View
            style={{
              width: "10%",
              border: "1px solid #cbd5e1",
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        </View>
        {/* tr */}
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            height: 40,
          }}
        >
          <View
            style={{
              width: "5%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>3</Text>
          </View>
          <View
            style={{
              width: "12%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>م ق س ٤٨٢١</Text>
          </View>
          <View
            style={{
              width: "8%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>2/6</Text>
          </View>
          <View
            style={{
              width: "20%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>فحص انحراف انزلاق </Text>
            <Text>العجلات م/كم</Text>
          </View>
          <View
            style={{
              width: "45%",
              flexDirection: "row",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
          >
            <Text>{vehicle?.sideSlip?.reading}</Text>
          </View>
          <View
            style={{
              width: "10%",
              border: "1px solid #cbd5e1",
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: vehicle?.sideSlip?.result === "FAIL" ? "red" : "",
              }}
            >
              {" "}
              {vehicle?.sideSlip?.result === "FAIL" ? "فشل" : "اجتياز"}{" "}
            </Text>
          </View>
        </View>
        {/* tr */}
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            height: 40,
          }}
        >
          <View
            style={{
              width: "5%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>4</Text>
          </View>
          <View
            style={{
              width: "12%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>م ق س ٤٨٢١</Text>
          </View>
          <View
            style={{
              width: "8%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>7/6</Text>
          </View>
          <View
            style={{
              width: "20%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>فحص نظام التعليق </Text>
          </View>
          {/*  */}
          <View style={{ width: "45%", flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>محور خلفي </Text>
              <Text>يسار</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>محور خلفي</Text>
              <Text>يمين</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>محور امامي</Text>
              <Text> يسار</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>محور امامي</Text>
              <Text> يمين</Text>
            </View>
          </View>
          {/*  */}
          <View
            style={{
              width: "10%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: vehicle?.suspensionTest?.result === "FAIL" ? "red" : "",
              }}
            >
              {vehicle?.suspensionTest?.result === "FAIL" ? "فشل" : "اجتياز"}
            </Text>
          </View>
        </View>
        {/* tr */}
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            height: 40,
          }}
        >
          <View
            style={{
              width: "5%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "12%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "8%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "20%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          {/*  */}
          <View style={{ width: "45%", flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>{vehicle?.suspensionTest?.rl} %</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>{vehicle?.suspensionTest?.rr} %</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text> {vehicle?.suspensionTest?.fl} %</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text> {vehicle?.suspensionTest?.fr} %</Text>
            </View>
          </View>
          {/*  */}
          <View
            style={{
              width: "10%",
              border: "1px solid #cbd5e1",
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        </View>

        {/* tr */}
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            height: 40,
          }}
        >
          <View
            style={{
              width: "5%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>5</Text>
          </View>
          <View
            style={{
              width: "12%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>م ق س ٤٨٢١</Text>
          </View>
          <View
            style={{
              width: "8%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>3/6</Text>
          </View>
          <View
            style={{
              width: "20%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text>فحص مكابح الانتظار</Text>
          </View>
          {/*  */}
          <View style={{ width: "45%", flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>Rear Brake </Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>front Brake</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>Parking Brake</Text>
            </View>
          </View>
          {/*  */}
          <View
            style={{
              width: "10%",
              border: "1px solid #cbd5e1",
              borderBottom: "1px solid white",
              borderTop: 0,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: vehicle?.brakeTest?.result === "FAIL" ? "red" : "",
              }}
            >
              {vehicle?.brakeTest?.result === "FAIL" ? "فشل" : "اجتياز"}
            </Text>
          </View>
        </View>
        {/* tr */}
        <View
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            height: 40,
          }}
        >
          <View
            style={{
              width: "5%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "12%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "8%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              width: "20%",
              border: "1px solid #cbd5e1",
              borderLeft: 0,
              borderTop: 0,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text>فحص مكابح الخدمة</Text>
          </View>
          <View style={{ width: "45%", flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text>{vehicle?.brakeTest?.rear} %</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text> {vehicle?.brakeTest?.front} %</Text>
            </View>
            <View
              style={{
                flex: 1,
                borderRight: "1px solid #cbd5e1",
                borderBottom: "1px solid #cbd5e1",
                justifyContent: "center",
                alignItems: "center",
                height: 40,
              }}
            >
              <Text> {vehicle?.brakeTest?.parking} %</Text>
            </View>
          </View>
          <View
            style={{
              width: "10%",
              border: "1px solid #cbd5e1",
              borderTop: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        </View>
      </View>
    </View>
  );
};

export default PageThree;
