export const categorizedVisualInspectionData = {
  exteriorInspection: [
    {
      no: 1,
      name: "dimensions",
      technicalRequirements: "vehicle dimensions and weight",
      placeholder: "",
      standard: "SASO ",
      label: "vehicle dimensions and weight",
      item: "1.1",
      arabicDescription: "ابعاد واوزان المركبة",
      isHeading: false,
      include: ["(1.1.1)", "(1.1.2)", "(1.1.3)", "(1.1.4)", "(1.1.5)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(1.1.1)",
          description: "Total length (specified by manufacturer)",
        },
        {
          id: 2,
          no: "(1.1.2)",
          description: "Total Width (specified by manufacturer)",
        },
        {
          id: 3,
          no: "(1.1.3)",
          description: "Total height (specified by manufacturer)",
        },
        {
          id: 4,
          no: "(1.1.4)",
          description:
            " Total vehicle weight (verification through vehicle identification plate)",
        },
        {
          id: 5,
          no: "(1.1.5)",
          description:
            " Maximum weights on axles (verification through vehicle identification plate)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 2,
      name: "color",
      technicalRequirements: "Vehicle color",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.2",
      arabicDescription: "لون المركبة",
      isHeading: false,
      include: ["(a)", "(b)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "Ensure that the vehicle's primary color is not pale due to weather factors affecting theoverall appearance of the vehicleThe measurement is greater than 50% for each specific area such as doors, hood, roof and wing of the vehicle, although the remnants of the original color are still visible",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "Ensure that unprofessional self-paint is not used for the vehicle such as brush, han spray cans or adhesives",
        },
      ],
      level: "mainHeading",
    },

    {
      no: 3,
      name: "identificationNo",
      technicalRequirements: "Vehicle identification number",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.3",
      arabicDescription: "الرقم المميز للمركبة",
      isHeading: false,
      include: ["(a)", "(b)", "(c)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "Ensure that the distinctive number (VIN) of the vehicle engraved on the chassis is matched with the vehicle structure data",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "Ensure that the location and affixing of the distinctive number (VIN) of the vehicle in accordance with Saudi standard No. SASO GSO 1782",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "Ensure that the distinctive number (VIN) of the vehicle engraved on the body of the vehicle is clearly visible and easily readable",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 4,
      name: "information",
      technicalRequirements: "information of Vehicle ",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.4",
      arabicDescription: "معلومات لوحة بيانات المركبة ",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Manufacturer's name, country of manufacture or country of assembly)",
        },
        {
          id: 2,
          no: "(b)",
          description: "Production date in month and year",
        },
        {
          id: 3,
          no: "(c)",
          description: "Total maximum vehicle weight (GVW) in kg for trucks",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "Maximum total weight on each axle (GAW) in kg for trucks",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 5,
      name: "exteriorStructure",
      technicalRequirements:
        "Safty of exterior structure (chassis),Bridges and cutters",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.5",
      arabicDescription: "سلامة الهيكل الخارجي /الشاسيه /الجسور /القواطع",
      isHeading: false,
      include: [
        "(a)",
        "(b)",
        "(c)",
        "(d)",
        "(e)",
        "(f)",
        "(g)",
        "(h)",
        "(i)",
        "(j)",
        "(k)",
      ],

      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "Observe at the body of the vehicle from the outside to ensure that it is stable and balanced on both sides and that there is no tilt on one side",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "Ensure that no bolts, nuts or installation beams are lost",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "Ensure that there are no weak welding areas around bridge and cutters installation areas",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "Ensure that there are no cracks or fractures in the vehicle's internal structure around bridges and cutters installation areas ",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "Ensure that the internal and external structure is free of rust, corrosion, collusion, modification, shear, welding or any prominent, sharp or rotating parts that can cause danger to road traffic",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "Ensure that the floor of the vehicle is free of any holes or cavities due to rust and prevent exhaust gases from leaking into passenger or cargo space",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "Ensure that there is a front or rear collision or both when the vehicle is already equipped with clashes",
        },
        {
          id: 8,
          no: "(h)",
          description:
            "Ensure that one of the vehicle's fenders is not missing or removed",
        },
        {
          id: 9,
          no: "(i)",
          description:
            "Ensure that the body of the vehicle is not modified, resulting in incoherence and stability",
        },
        {
          id: 10,
          no: "(j)",
          description:
            "Ensure safety from collusions affecting the functioning of certain parts of the vehicle's body",
        },
        {
          id: 11,
          no: "(k)",
          description:
            "Ensuring the safety of collusions, results in the emergence of metal parts affecting pedestrians regardless of their dimensions",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 6,
      name: "electricSys",
      technicalRequirements: "Electrical System",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.6",
      arabicDescription: "مجموعة التوصيلات الكهربائية  ",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "Ensure the safety of insulation of all electrical wires and the absence of cuts in their parts as well as no contact in the wires",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "Ensure that all vehicle battery connection points are safe and tight",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "Ensure the use of a suitable battery size and that it’s not large and unsuitable for the base",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "Ensure that the ground connection wires are completely isolated",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 7,
      name: "brakeSys",
      technicalRequirements: "Brake System",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.7",
      arabicDescription: "مجموعة المكابح",
      isHeading: false,
      subHeading: true,
      include: [
        "(1.7.1)",
        "(1.7.2)",
        "(1.7.3)",
        "(1.7.4)",
        "(1.7.5)",
        "(1.7.6)",
        "(1.7.7)",
      ],
      defaultValue: "PASS",
      itemsToCheck: [],
      level: "mainHeading",
    },
    {
      no: 8,
      name: "brakeCylinders",
      technicalRequirements: "main Cylinders of brake system",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.7.1",
      arabicDescription: "الاسطوانات الرئيسية لنظام المكابح",
      isHeading: false,
      include: ["(a)", "(b)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the main brake cylinder is fixed and there is no laxity as a result of the loss of one of the fixation nuts)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the main brake cylinder responds to braking by pressing the brake pedal.)",
        },
      ],
      level: "heading",
    },
    {
      no: 9,
      name: "brakeFluidTank",
      technicalRequirements: "brake fluid tank",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.7.2",
      arabicDescription: "خزان سائل المكابح",
      isHeading: false,
      include: ["(a)", "(b)"],

      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that there is no leak of brake oil from the main cylinder)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the brake fluid case cover is not missing or replaced with an inappropriate cover)",
        },
      ],
      level: "heading",
    },
    {
      no: 10,
      name: "brakeHosesAndTubes",
      technicalRequirements:
        "Hoses/Tubes/connectors/Handbrake connectors(parking brake)",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.7.3",
      arabicDescription: `خراطيم/ أنابيب / وصلات / وصلات فرملة اليد "الجلنط"`,
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)", "(g)"],

      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the original brake cylinder tubes are not replaced by copper tubes)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that no modification is made in the original design of the brake lines or connectors)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there is no twisting of the brake tubes, which hinders the movement of the liquid inside)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that tubes or brake couplings are rust-free or welded)",
        },
        {
          id: 5,
          no: "(e)",
          description: "(Ensure that none of the mechanical parts are missing)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that there are no cracked, swollen, scraped or cut hoses)",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that there is no cut in the brake wire bristles or welding repair in the brake wire)",
        },
        {
          id: 8,
          no: "(h)",
          description:
            "(Ensure that there are no cracked, swollen, scraped or cut hoses",
        },
      ],
      level: "heading",
    },
    {
      no: 11,
      name: "brakePedal",
      technicalRequirements: "Brake pedal",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.7.4",
      arabicDescription: "دواسة المكابح",
      isHeading: false,
      include: ["(a)", "(b)", "(c)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensuring that there is no softness in the spongy pedals, which indicates a weariness in bushing or leakage of oil from the system)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the remaining distance when pressing the brake pedal is less than 1/4 the total height of the pedal)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there is no twisting or infliction in the brake pedal which hinders its movement or the presence of laxity of the parts and components of the pedal )",
        },
      ],
      level: "heading",
    },
    {
      no: 12,
      name: "airTank",
      technicalRequirements:
        "air Tank and brake/air brake system components (All vehicles with air brake system) ",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.7.5",
      arabicDescription: `خزان الهواء ومكونات نظام المكابح/الفرامل  `,
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that there is no modification to the air brake system) Such as: removal of the mitigation/venting valve.",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that there is no welding repair on brake cylinders or other parts)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there are no infliction on the surface of the tank that affect the volume of air inside it)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there is no air leak from the tank, connectors, valves or any other parts of the system)",
        },
        {
          id: 5,
          no: "(e)",
          description: "(Ensure that the quick-release valve closes tightly)",
        },
      ],
      level: "heading",
    },
    {
      no: 13,
      name: "brakeDiscs",
      technicalRequirements: "brake discs ,drums and pads",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.7.6",
      arabicDescription: "أقراص المكابح والهوبات واللقم و الفحمات",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that there is no modification in the original design of the brake discs or drums) For example: a brake disc lathing to fit in the installation with a smaller wheel or a difference between the brake discs mounted on the right side compared to what is fixed on the left. ",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that there are no fractures or cracks in the brake discs or drums).",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there is no welding in the brake shoe push lever (linings))",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that brake pads are not visibly corroded (remaining thickness less than 1 mm))",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that there are no clear corrosion or holes in brake discs (drums)) over 2 mm.)",
        },
        {
          id: 6,
          no: "(f)",

          description: "(Ensure that the quick-release valve closes tightly)",
        },
      ],
      level: "heading",
    },
    {
      no: 14,
      name: "autoBrakeCheck",
      technicalRequirements:
        "automated brake efficiancy check(using static or dynamic inspection device)",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.7.7",
      arabicDescription: "الفحص الآلي لكفاءة المكابح ",
      isHeading: false,
      subHeading: true,
      include: ["(1.7.7.1)", "(1.7.7.2)"],
      defaultValue: "PASS",
      itemsToCheck: [],
      level: "heading",
    },
    {
      no: 15,
      name: "staticBrakeCheck",
      technicalRequirements:
        "static inspection/check  as Standard no.(SASO 1284/2017)",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.7.7.1",
      arabicDescription: "الفحص الاستاتيكي",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the ratio of the main braking ratio of the two wheels on the same axle) ",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the power ratio of the two-wheel stop brake on the same axle) ",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the ratio of the difference in the strength of the main brake between the two wheels on the same axle) ",
        },
        {
          id: 4,
          no: "(d)",
          description: "(Ensure that the friction force ratio for each wheel) ",
        },
      ],
      level: "subHeading",
    },
    {
      no: 16,
      name: "dynamicBrakeCheck",
      technicalRequirements: "Dynamic Inspection",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.7.7.2",
      arabicDescription: "الفحص الديناميكي",
      isHeading: false,
      include: ["(a)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "Ensure that the vehicle does not deviate from the 3.7-metre-wide test track or achieve a decrease in at least 6.4 m/s2) (The method of examination shall be in accordance with Saudi standard No. SASO 1284/2017 Item No. 6/3/1/1/1) or (Ensure that the vehicle does not deviate from the 3.7-meter-wide test track or stops at a distance of no more than 6.1 meters) (The method of examination shall be in accordance with Saudi standard No. SASO 1284/2017 Item No. 6/3/1/1/2)",
        },
      ],
      level: "subHeading",
    },
    {
      no: 17,
      name: "lights",
      technicalRequirements: "Lights",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.8",
      arabicDescription: "الأنوار",
      isHeading: false,
      subHeading: true,
      include: [
        "(1.8.1)",
        "(1.8.2)",
        "(1.8.3)",
        "(1.8.4)",
        "(1.8.5)",
        "(1.8.6)",
        "(1.8.7)",
        "(1.8.8)",
        "(1.8.9)",
      ],
      defaultValue: "PASS",
      itemsToCheck: [],
      level: "mainHeading",
    },
    {
      no: 18,
      name: "headLights",
      technicalRequirements: "headlights",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.8.1",
      arabicDescription: "الأنوار الأمامية الرئيسية ",
      isHeading: false,
      include: [
        "(a)",
        "(b)",
        "(c)",
        "(d)",
        "(e)",
        "(f)",
        "(g)",
        "(h)",
        "(i)",
        "(j)",
      ],

      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with main headlights in the front one or two on each side) For vehicles over 0.8 m wide and at a top speed of more than 20 km/h shall be well-fixed and balanced ",
        },
        {
          id: 2,
          no: "(b)",
          description:
            " (The main headlights light color shall be white other than what is recommended by the manufacturer)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that no end of the headlights is completely missing as a result of an accident or a break)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there is no weakness in the headlights emitted)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that the main headlights work on both sides in the same color and intensity)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that there are no breaks or holes in the outer glass of the headlights more than 3 mm in diameter or a longitudinal or horizontal fracture of more than 50% of the standard length or width of the light)",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that the main headlights are equipped so that the intensity of their light can be reduced (low beam headlights) or change the direction of the beam to not disturb the eyes of those coming in the opposite direction.",
        },
        {
          id: 8,
          no: "(h)",
          description:
            "(Ensure that the high beam headlights are strong enough to detect any obstacle on the road at night over a distance of 100 meters)",
        },
        {
          id: 9,
          no: "(i)",
          description:
            "(Ensure that the vehicle is equipped with a driver's light alarm when activating the high beam lights)",
        },
        {
          id: 10,
          no: "(j)",
          description:
            "(Ensure that high and low beam headlights operate on both sides in the same color and intensity)",
        },
      ],
      level: "heading",
    },
    {
      no: 19,
      name: "rearTrafficLights",
      technicalRequirements: "Rear Traffic Lights",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.8.2",
      arabicDescription: "أنوار السير الخلفية",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)", "(g)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "Ensure that each vehicle is equipped with at least one rear traffic lights on each side and well fixed)",
        },
        {
          id: 2,
          no: "(b)",
          description: "(The color of the rear traffic lights shall be red)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the rear traffic lights are well connected so that they light up together on each side with the front waiting lights)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that no end of the rear lights is completely missing as a result of an accident or break)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that there is no weakness in the emitted rear traffic lights)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that the rear traffic lights operate on both sides)",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure safety from breakage or holes in the outer glass of rear light over 10 cm2)",
        },
      ],
      level: "heading",
    },
    {
      no: 20,
      name: "rearFogLights",
      technicalRequirements: "Rear fog lights",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.8.3",
      arabicDescription: "أنوار الضباب الخلفية",
      isHeading: false,
      include: ["(i)", "(j)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(i)",
          description:
            "(Ensure that each vehicle is equipped with at least one rear fog light)",
        },

        {
          id: 2,
          no: "(j)",
          description: "(The color of the rear-fog lights shall be red)",
        },
      ],
      level: "heading",
    },
    {
      no: 21,
      name: "frontTrafficLights",
      technicalRequirements: "Front Trafic lights",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.8.4",
      arabicDescription: "أنوار السير الأمامية",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with one front waiting lights on each side and both work well)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(The color of the lighting of the front waiting lights shall be white or crimson)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the front waiting lights can be lit whether the engine is turned on or off)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the front lights are not lost as a result of the fracture or the presence of laxity)",
        },
      ],
      level: "heading",
    },
    {
      no: 22,
      name: "turnSignalLights",
      technicalRequirements: "turn Signal lights",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.8.5",
      arabicDescription:
        "أنوار إشارات الدوران والانعطاف الأمامية والجانبية والخلفية",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)", "(g)", "(h)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with turn signal lights on the sides of both front and rear, and the signal light on the side of the vehicle is optional and well-fixed)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(The color of the lights of the turn signal lights shall be red or crimson)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that no end of the front, side or rear signals is completely missing as a result of an accident)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the signal light flash rate is slow (less than 30 flashes per minute))",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that there is no external cover or supports that hinder clear visibility of signal lights)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that signal lights are not lost as a result of the break exceeding 6 cm2 of signal area)",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that there is no weakness in the signal light emitted)",
        },
        {
          id: 8,
          no: "(h)",
          description: "Ensure that the signal lights operate on both sides)",
        },
      ],
      level: "heading",
    },
    {
      no: 23,
      name: "hazardWarningLights",
      technicalRequirements: "hazard warning flashing lights",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.8.6",
      arabicDescription: "أنوار التحذير",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)", "(g)", "(h)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with warning lights of danger on both front and rear ends and is well fixed)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(The color of the lights of the turn signals lights shall be red or crimson)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that no end of the warning lights is completely missing as a result of an accident or break)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the flash rate of warning lights is slow (less than 30 flashes per minute))",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that there is no external cover or supports that hinder the clear visibility of warning lights of a danger)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure there is no weakness in warning lights of the danger emitted)",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that the warning lights are not lost as a result of the fracture of more than 6 cm2 and over 10 cm2 for the rear signal m of signal area)",
        },
        {
          id: 8,
          no: "(h)",
          description:
            "(Ensure that the warning lights of a danger operate on both sides)",
        },
      ],
      level: "heading",
    },
    {
      no: 24,
      name: "reverseLights",
      technicalRequirements: "Reversing Lights",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.8.7",
      arabicDescription: "أنوار السير إلى الخلف",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with no more than two rear-end lighting units and is well fixed)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(The light color of the reversing lights shall be white)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the light of the reversing lights does not exceed 5000 lumens)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that no end of the reversing lights is completely missing as a result of an accident or break)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that the reversing lights operate on both sides)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that the reversing lights do not remain lit when the vehicle moves forward)",
        },
      ],
      level: "heading",
    },
    {
      no: 25,
      name: "rearPlateLights",
      technicalRequirements: "Rear Plate Lights",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.8.8",
      arabicDescription: "أنوار لوحة الأرقام الخلفية",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)"],

      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with rear number plate lights and well fixed)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(The color of the lights of the rear plate lights shall be white)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(To be clearly visible from a distance of 20 meters back)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the rear plate lights are connected to the headlights and the rear traffic lights)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that no end of the rear number plate lights is completely missing as a result of an accident or break)",
        },
      ],
      level: "heading",
    },
    {
      no: 26,
      name: "brakeLights",
      technicalRequirements: "brake/stop lights",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.8.9",
      arabicDescription: `"أنوار التوقف "المكابح`,
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)", "(g)", "(h)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with one stop lights on each side of the rear of the vehicle and is mounted in one form and another in the middle of the passenger vehicles and multi-purpose vehicles)",
        },
        {
          id: 2,
          no: "(b)",
          description: "(The color of the brake/stop lights shall be red)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the rear brake/stop lights light up if the vehicle is braking with the main brake)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that no end of the brake/stop lights is completely missing as a result of an accident or break)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that there is no external cover or supports that hinder the clear visibility of the brake/stop lights.",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that there is no weakness in the emitted brake/stop lights due to the presence of dust inside the lights or due to the use of light bulbs of lower voltage or due to the hand paint of the outer glass or The outer light cover is pale in color due to exposure to weather factors",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that there is no fractures or holes in the external glass of stop lights over 10 cm2)",
        },
        {
          id: 8,
          no: "(h)",
          description:
            "(Ensure that the brake/stop lights operate on both sides)",
        },
      ],
      level: "heading",
    },
    {
      no: 27,
      name: "glass",
      technicalRequirements: "vehicle glass",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.9",
      arabicDescription:
        "زجاج المركبة: الزجاج الأمامي - الزجاج الخلفي - زجاج النو افذ",
      isHeading: false,
      subHeading: true,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)", "(g)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(The windshield shall be laminar and the window glass for each vehicle shall be of the type of toughened or laminated safety glass and be well fixed).",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(The transparency of the windshield, front and rear side windows and rear glass for all vehicles is not less than 70%)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(The rear window shall have the appropriate means of defogging)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(The glass shall be flawless from defects such as thermal bubbles, cracks, scratching, and so forth. and not have any color/tinting which obscures the driver's visibility)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that there are no fractures, cracks, holes or a stone hit in the rear glass (fracture or crack resulting from a stone hit in front of the driver more than 10 cm in diameter or more than 20 cm in front of the passenger).",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that there are no fractures, cracks, holes or a stone hit in the windshield (radial fracture more than 30 cm in length or a stone hit more than 20 cm in diameter))",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that no part of the vehicle's glass is missing as a result of breakage or removal)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 28,
      name: "steeringSys",
      technicalRequirements: "steering system",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.10",
      arabicDescription: "مجموعة التوجيه",
      isHeading: false,
      subHeading: true,
      include: [
        "(1.10.1)",
        "(1.10.2)",
        "(1.10.3)",
        "(1.10.4)",
        "(1.10.5)",
        "(1.10.6)",
        "(1.10.7)",
      ],
      defaultValue: "PASS",
      itemsToCheck: [],
      level: "mainHeading",
    },
    {
      no: 29,
      name: "steeringWheel",
      technicalRequirements: "Steerin Wheel",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.10.1",
      arabicDescription: `عجلة القيادة "المقود" وعمودها`,
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure there is no modification to the original steering wheel design)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that there are no fractures, deformities, steering wheel twisting or wear with the steering wheel cover)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there is no free movement (clearance) as a result of corrosion or weariness in the steering wheel parts, whether vertically with the wheel shaft or horizontally on the wheel itself)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the wheel returns to its original position after moving right or left)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that the steering wheel is easily moved or rotated left and right)",
        },
      ],
      level: "heading",
    },
    {
      no: 30,
      name: "ballJoints",
      technicalRequirements: "ball joints (steering arms/Rods)",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.10.2",
      arabicDescription: `"الوصلات الكروية "ركب أذرع الدركسيون`,
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that damaged arm/rod joints are not repaired either by hammering or by pressing with a piston, the arms/rods joints shall not be repaired, the damaged ones shall be replaced)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the nuts and arms joints are attached and fixed well to prevent the possibility of the arms detaching during the vehicle's movement)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there is no clearance of the links loaded on springs (spiral spring) more than 1 mm when moving the arm set)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there is no clearance of unloaded links on springs (spiral spring) more than 2.5 mm when moving the arm set)",
        },
      ],
      level: "heading",
    },
    {
      no: 31,
      name: "steeringArms",
      technicalRequirements: "steering arms/Rods",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.10.3",
      arabicDescription: "مجموعة أذرع التوجيه",
      isHeading: false,
      include: ["(a)", "(b)", "(c)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that there is no modification to the original design in any of the steering arms or the addition of an unrelated part or component)",
        },
        {
          id: 2,
          no: "(b)",
          description: "(Ensure that the steering arms are free from welding)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the safety lock nut is not lost, resulting in the steering arms being detached from each other, causing the vehicle to lose the steering entirely)",
        },
      ],
      level: "heading",
    },
    {
      no: 32,
      name: "steeringGearBox",
      technicalRequirements:
        "steering wheel gearbox installation base (steering Wheel)",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.10.4",
      arabicDescription: "قاعدة تركيب صندوق تروس عجلة القيادة المقود",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that there is no loss of one or more screws to install the gearbox base)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the shaft nut or safety lock nut of the steering gearbox is not lost)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the chassis is not worn or corroded at the point of installation of the steering gearbox as a result of oxidation caused by iron rust)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there is no clearance in the rack and pinion when moving the steering wheel)",
        },
      ],
      level: "heading",
    },
    {
      no: 33,
      name: "hydraulicSteeringSys",
      technicalRequirements: "hydraulic steering system",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.10.5",
      arabicDescription: "دائرة التوجيه الهيدروليكية",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the steering circuit is not adjusted from a auxiliary hydraulic oil pressure steering to normal steering without oil pressure)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that there is no continuous oil leakage from hydraulic steering circuit connections)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that hydraulic connection hoses do not come into contact with some moving parts of the vehicle, causing the components to be scraped or torn)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the steering circuit hydraulic pump works well and there is no damage or malfunction in any component of the circuit)",
        },
      ],
      level: "heading",
    },

    {
      no: 34,
      name: "balanceShaft",
      technicalRequirements: "balance Shaft and bushings",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.10.6",
      arabicDescription: "عمود التوازن وجلبه",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the balance shaft is not removed from vehicles equipped with it)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that there is no welding or heating in any part of the balance shaft)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure the safety of the balance shaft from weariness, corrosion and removal)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there is no loss in the support or screws of the balance shaft)",
        },
      ],
      level: "heading",
    },
    {
      no: 35,
      name: "transmissionParts",
      technicalRequirements: "transimission Parts /Cardan shaft / Drive shaft",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.10.7",
      arabicDescription: "أجزاء ناقل الحركة / عمود الكردان / عمود الدوران",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the rubber part of the power disc of the shaft of the vehicles equipped with them is not corroded or broken)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the rubber cover of the shaft joints is not worn or cut with front-wheel drive vehicles)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there is no apparent deformation or sprain of the cardan shaft)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the support link to the cardan shaft is not worn or eroded)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that there is no loss of the cardan shaft or the shaft is not well installed)",
        },
      ],
      level: "heading",
    },
    {
      no: 36,
      name: "suspensionSys",
      technicalRequirements: "syspension system",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.11",
      arabicDescription: "مجموعة التعليق",
      isHeading: false,
      subHeading: true,
      include: ["(1.11.1)", "(1.11.2)", "(1.11.3)"],
      defaultValue: "PASS",
      itemsToCheck: [],
      level: "mainHeading",
    },
    {
      no: 37,
      name: "frontRearSuspension",
      technicalRequirements: "front and rear suspension (springs)",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.11.1",
      arabicDescription: ` " نظام التعليق الأمامي والخلفي " النوابض / السوست`,
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that there is no modification in the original design of the front and rear suspension)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that no rings installed under or above the spring to raise the vehicle or under the springs to support the weak springs)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there is no imbalance of the wheel deviation angle due to improper spring assembly)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there are no fractures, deformities or inflictions to the upper or lower control arms (tie rods))",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that there is no corrosion or wear in the bushings of multi-bar curved springs, resulting in the iron parts being in contact with each other)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure the safety of all springs from defects after the automatic examination of the suspension system in accordance with the clause 6/7 stipulated in Saudi standard SASO 1284)",
        },
      ],
      level: "heading",
    },
    {
      no: 38,
      name: "frontRearSprings",
      technicalRequirements: "front and rear  springs",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.11.2",
      arabicDescription: "النوابض الأمامية والخلفية",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the spring height is not reduced by cutting of one of the windings)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure no welding or heating of the spring or torsion shaft)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there is no shortage of air or a hole in the air bag (balloon))",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the spring does not fall due to loads on it)",
        },
      ],
      level: "heading",
    },
    {
      no: 39,
      name: "shockAbsorbers",
      technicalRequirements: "shock Absorbers",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.11.3",
      arabicDescription: `" ممتص الصدمات " المساعدات`,
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the shock absorbers are not removed from its position for vehicles equipped with it)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the type of shock absorber on each side is not different compared to the other side)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the hydraulic fluid is not leaked from the shock absorber, resulting in loss of function)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there are no inflictions or deformations on the surface of the shock absorber, which hinders its performance)",
        },
      ],
      level: "heading",
    },
    {
      no: 40,
      name: "exhaustSys",
      technicalRequirements: "exhaust system",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.12",
      arabicDescription: "مجموعة العادم",
      isHeading: false,
      subHeading: true,
      include: ["(1.12.1)", "(1.12.2)"],
      defaultValue: "PASS",
      itemsToCheck: [],
      level: "mainHeading",
    },
    {
      no: 41,
      name: "mufflers",
      technicalRequirements: "mufflers / exhaust pips",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.12.1",
      arabicDescription: `" مخمد ا لأصوات / مواسير العادم " الشكمان`,
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the exhaust system is not modified to obstruct the automatic exhaust smoke density inspection parts)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the muffler is not removed or an alternative muffler not intended for the vehicle is installed)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there are no cuts, fractures, or rust in the exhaust pipes, connections, or the cylinder that leads to gases leaking from the system)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that mufflers or exhaust cylinders are well installed)",
        },
      ],
      level: "heading",
    },
    {
      no: 42,
      name: "wipersAndWashers",
      technicalRequirements: "windshield Wipers and Washers",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.12.2",
      arabicDescription: "مساحات ومغاسل الزجاج الأمامي",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that every vehicle is equipped with windshield wipers and washers that are in good working condition)",
        },
        {
          id: 2,
          no: "(b)",
          description: "(The windshield wipers have two speeds)",
        },
        {
          id: 3,
          no: "(c)",
          description: "(Ensure that no part of the wipers is lost or damaged)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the wiper arm does not bend or warp, resulting in the blades being not completely in contact with the glass surface)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that there is no obstacle that causes the rotation to be incomplete when operating, which affects the driver's vision)",
        },
      ],
      level: "heading",
    },
    {
      no: 43,
      name: "sideMirrors",
      technicalRequirements: "Side view mirrors",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.13",
      arabicDescription: "المرايا الجانبية الخارجية للرؤية الخلفية",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that every vehicle is equipped with two external mirrors installed on the front of the vehicle's side doors) applied from 1982 models and above",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(The edges of the side mirrors or their fasteners do not exceed the maximum width of the vehicle except in cases where the necessary visibility is required - specified by the vehicle manufacturer)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that one or both of the side mirrors are not lost for any type of vehicle)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there is no crack, fracture, distortion or dimness in the surface of one or both of the side mirrors, which leads to dichotomy or blurring of the side vision)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that the outside mirrors are installed in a good manner, so that they do not vibrate while the vehicle is moving)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 44,
      name: "doorSafty",
      technicalRequirements: "Door Safty",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.14",
      arabicDescription: "أقفال الأبواب ومفصلاتهاوغطاءالمحرك الصندوق الخلفي",
      isHeading: false,
      include: [
        "(a)",
        "(b)",
        "(c)",
        "(d)",
        "(e)",
        "(f)",
        "(g)",
        "(h)",
        "(i)",
        "(j)",
        "(k)",
      ],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the hinged door latch is available in two locking positions: fully closed and imperfect (medium) closed)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(In the event that the side rear doors are locked, ensure it is impossible to open them from the inside or the outside without unlocking the door)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the dashboard is equipped with an indicator light that alerts the driver when one of the doors is not completely closed)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that one of the main parts of the vehicle’s body that affect its grip is not lost or removed) such as: removing the truck tailgate.",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that one of the door handles is not lost, broken, or modified, so that it is difficult to close or easily open or lose the key lock)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure the ability of a latch or the efficiency of the engine cover locked is secure and remain in a completely closed state)",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that there is no damage or corrosion of one of the door hinges, which leads to free movement (clearance) in the door when closing or opening)",
        },
        {
          id: 8,
          no: "(h)",
          description:
            "(Ensure that there are no breakages or cracks in the sunroof (for vehicles equipped with it), which leads to water leakage into the vehicle or the inability to lock it if it is open)",
        },
        {
          id: 9,
          no: "(i)",
          description:
            "(Ensure that a door, hood or trunk cover can be locked or unlocked for light duty vehicles)",
        },
        {
          id: 10,
          no: "(j)",
          description:
            "(Ensure that the electric front windows are in good working condition (open or close).",
        },
        {
          id: 11,
          no: "(k)",
          description:
            "(Ensure that the external emergency door lock cannot be opened suddenly without force effect on it (for large buses)).",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 45,
      name: "tires",
      technicalRequirements: "Tires",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1,15",
      arabicDescription: "الإطارات ",
      isHeading: false,
      include: [
        "(a)",
        "(b)",
        "(c)",
        "(d)",
        "(e)",
        "(f)",
        "(g)",
        "(h)",
        "(i)",
        "(j)",
      ],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that passenger vehicles and multi-purpose passenger vehicles equipped with passenger car tires are equipped with tires of temperature classes (A) or (B) and with a speed symbol (S), a minimum that is equal to (180 km / h) and higher)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that multipurpose passenger vehicles equipped with light truck tires are equipped with a minimum speed symbol (S), which is equal to (180 km / h) and higher)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that light truck tires are equipped with a minimum (L) speed symbol, which is equal to (120 km / h) and higher)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that heavy truck tires are equipped with a minimum speed (K) symbol, which is equal to (110 km / h) and higher)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that bus tires are equipped with a speed symbol (M) as a minimum, which is equal to (130 km / h) and higher)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that all vehicles are equipped with a spare tire)",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that the tire data provided with the vehicle is matched, including the size, installation, loads manual, speed symbol, tire data available in the owner's manual and vehicle dashboard recommended by the vehicle manufacturer)",
        },
        {
          id: 8,
          no: "(h)",
          description:
            "(Ensure that passenger and multi-purpose vehicles are not equipped with retreaded tires)",
        },
        {
          id: 9,
          no: "(i)",
          description:
            "(Ensure that there is no sectional repair (patch) in the tire wall or tire wear or damage)",
        },
        {
          id: 10,
          no: "(j)",
          description:
            "(Ensure that vehicles equipped with sand or nylon balloon tires are not accepted)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 46,
      name: "wheels",
      technicalRequirements: "wheels",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.16",
      arabicDescription: "العجلات",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that wheel bolts and nuts are not lost, damaged, or incompatible)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that there is no difference in the wheels in terms of design or manufacturing material on any of the axes except for the wheels with double design)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there is no deformation, buckling, fracture, or re-welding of any part of the wheel)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there are no elongation (expansion) holes for any of the wheel bolts and nuts, which affects the wheel grip and stability with the vehicle body)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that there are no attachments projecting on the center of the wheel, which would affect pedestrians)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 47,
      name: "engine",
      technicalRequirements: "Engine",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.17",
      arabicDescription: "المحرك",
      isHeading: false,
      include: [
        "(a)",
        "(b)",
        "(c)",
        "(d)",
        "(e)",
        "(f)",
        "(g)",
        "(h)",
        "(i)",
        "(j)",
        "(k)",
      ],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the engine is suitable for the type of fuel used locally, whether petrol or diesel)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that there is no modification in the engine from gasoline to diesel or vice versa, or from a small capacity engine to a larger capacity engine and vice versa)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the air filter is not removed in order to affect the exhaust gas test result)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the air hoses connected to the injection system are not removed in order to affect the exhaust gas test result)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that the engine belts are not lost, damaged or cracked)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that there is no dense smoke from the engine of gasoline-powered vehicles) (Whether the smoke color is black, white or blue)",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that no dense smoke comes out from the engine of diesel vehicles) (Smoke color is white)",
        },
        {
          id: 8,
          no: "(h)",
          description:
            "(Ensure that the motor base mounting screws (engine mounts) are not lost)",
        },
        {
          id: 9,
          no: "(i)",
          description:
            "(Ensure that the beams or base of the motor (engine mounts) are not modified or welded)",
        },
        {
          id: 10,
          no: "(j)",
          description:
            "(Ensure that the engine belts are not damaged or cracked)",
        },
        {
          id: 11,
          no: "(k)",
          description:
            "(Ensure the safety of the mechanical parts attached to the engine)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 48,
      name: "noisePollution",
      technicalRequirements: "noise pollution",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.18",
      arabicDescription: "التلوث الضوضائي",
      isHeading: false,
      include: ["(a)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that vehicles do not exceed the maximum permissible limits for noise stipulated in the Saudi Standard Specification No. SASO GSO 1624)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 49,
      name: "fuelSys",
      technicalRequirements: "fuel system",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.19",
      arabicDescription: "مجموعة الوقود",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)", "(g)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle has its designated primary fuel tank and/or reserve and is well fixed)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that there is no leakage of steam or liquid from the fuel tank, or fuel leak from the lines that connect to the fuel pump as a result of corrosion of one of the parts)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that each fuel tank fill tube is fitted with a cap that closes tightly on the slot of the tube)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the fuel tank filler hole and its ventilation tube are not located in the exhaust pipe drain path and that the distance between it and the exhaust pipe hole is not less than 300 mm)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that the fuel tank filling hole and its ventilation tube are at a distance of no less than 200 mm from any exposed electrical connections or switches, and that there is a separation between them)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that there are no cracks or damage to the fuel system hoses)",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure the safety of the fuel tank structure from rust, wear and dent that weakens that structure)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 50,
      name: "truckBarriers",
      technicalRequirements: "Front ,side rear protection barriers for trucks",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.20",
      arabicDescription: "حواجز الحماية الامامية والجانبية والخلفية للشاحنات",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that all trucks with a gross weight of more than 3.5 tons are fitted with front, side and rear protection barriers and are well fixed)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(The specifications of the front, side and rear protection barriers comply shall with the Saudi standard No. SASO GSO 2112, SASO GSO 2113 and SASO GSO 2114 in terms of dimensions, materials used, installation method and others)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there are no cracks, sharp edges or corners in the front, side and rear barriers)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the reflective tapes are on the side and rear barriers in accordance with Saudi Standard No. SASO 2913))",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 51,
      name: "wheelDeviation",
      technicalRequirements: "wheel deviation",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.21",
      arabicDescription:
        "التأكد من أن المركبة لا تميل ولا تنحرف عن 7 متر/كم للداخل أو للخارج",
      isHeading: false,
      include: ["(a)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the vehicle does not tilt or deviate more than 7 meters / km in or out)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 52,
      name: "fifthWheel",
      technicalRequirements: "fifth wheel",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.22",
      arabicDescription: "العجلة الخامسة",
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)", "(g)", "(h)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that there is no unoriginal modification of the trailer hitch (fifth wheel) or its mounting base)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that there is no clearance in the bolt holes that secure the trailer hitch (fifth wheel) with the locomotive body due to movement and effort)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there are no repair work by welding on the trailer hitch (fifth wheel))",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there is no loss of the bolts securing the trailer link (fifth wheel) with the chassis)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that the safety pin of the trailer hitch connecting rod is not lost)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that there are no fractures or cracks in the auxiliary locomotive body on which the trailer hitch (fifth wheel) is installed)",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that there is no significant weakness in installing the trailer hitch with the base chassis)",
        },
        {
          id: 8,
          no: "(h)",
          description:
            "(Ensure that there are no fractures in the linkage or separation arm (release arm) of the locomotive with the trailer).",
        },
      ],
      level: "mainHeading",
    },
    //TODO: add to db or check
    {
      no: 53,
      name: "gaseousPollutants",
      technicalRequirements: "Gaseous Pollutants",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.23",
      arabicDescription: "الملوثات الغازية",
      isHeading: false,
      subHeadung: true,
      include: ["(1.23.1)", "(1.23.2)"],
      defaultValue: "PASS",
      itemsToCheck: [],
      level: "mainHeading",
    },

    {
      no: 54,
      name: "exhaustGasesGasoline",
      technicalRequirements:
        "Exhaust Gases (CO and HC) All Gasoline-powered Vehicles",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1,23.1",
      arabicDescription: ` " غازات العادم للمركبات البنزين" اول اكسيدالكربون وغاز الهيدروكربون`,
      isHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the percentage of carbon monoxide in the exhaust gases does not exceed 3.5% when the engine is not in gear)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the percentage of HC (hydrocarbons) emitted from the fuel system does not exceed 1200 parts per million)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the proportion of exhaust gases is correctly measured and free from swindle)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there is no emission from the crankcase to the outside atmosphere)",
        },
      ],
      level: "heading",
    },
    {
      no: 55,
      name: "exhaustGasesDiesel",
      technicalRequirements:
        "Exhaust Gases (measuring the amount of smoke density in exhaust) All Diesel Vehicles",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "1.23.2",
      arabicDescription: `غازات العادم للمركبات الديزل " قياس كثافة الدخان بالعادم" `,
      isHeading: false,
      include: ["(a)", "(b)", "(c)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the average reading value of the meter does not exceed three times from the act of acceleration in the engine speed without an external load for the maximum speed of 40).",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that there is no emission from the crankcase to the outside atmosphere)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the proportion of exhaust gases is correctly measured and free from swindle)",
        },
      ],
      level: "heading",
    },
  ],
  interiorInspection: [
    {
      no: 56,
      name: "horn",
      technicalRequirements: "Vehicles Sound Alert Tool (Horn) ",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "2.1",
      arabicDescription: "أداة التنبيه الصوتي للمركبة",
      isHeading: false,
      subHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with a sound alert (horn))",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the horn beeps continuously and with a tone that does not change during operation)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the horn is not completely lost or is not functioning properly)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that no additional connections or adjustments are made that trigger the horn using an alternate key after canceling the original key for the horn)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 57,
      name: "handBrake",
      technicalRequirements: "Handbrake",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "2.2",
      arabicDescription: "(فرملة اليد)الجلنط",
      isHeading: false,
      subHeading: false,
      include: ["(a)", "(b)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the retractor lever is not lost or the handbrake is activated)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that there is no defect in the handbrake lever, such as a break in the handle, loosening in its components, or being completely tightened and cannot be released due to wrong adjustment)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 58,
      name: "safetyBelts",
      technicalRequirements: "Safety Belts",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "2.3",
      arabicDescription: "أحزمة الأمان",
      isHeading: false,
      subHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the front and rear seats in passenger and SUV vehicles are equipped with triple-mounted seat belts, while the other seats are equipped with dual or triple-fixed seat belts)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that all tripe-fastened seat belts are equipped with a pullback to return the belt, while dual-fastening belts are optional)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that there is no laceration, corrosion or rupture in the seat belt)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the belt buckle performs efficiently in terms of retractability and return to the original position)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 59,
      name: "seats",
      technicalRequirements: "Seats",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "2.4",
      arabicDescription: "المقاعد ",
      isHeading: false,
      subHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)", "(g)", "(h)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description: "(Ensure that the driver seat in on the left side)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the seats are automatically lockable in all possible positions)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(The adjustable seat backs must be lockable in all possible positions)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that seat bolts and anchors are well fixed to the vehicle's floor)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that the seat cover and seat cushions are not torn (synthetic foam) causing the seat metal frame to protrude)",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that the rear barriers of the driver's seat are not lost, or having broken barriers, or rusted fasteners, or loosening (for buses only))",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that the side barriers beside the exit doors are not lost, or having broken side barriers, or rust in their fasteners, or loosening (for buses only))",
        },
        {
          id: 8,
          no: "(h)",
          description:
            "(Ensure that the bus floor is fitted with non-slip floors (for buses only))",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 60,
      name: "rearViewMirror",
      technicalRequirements: "Rear View Mirror",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "2.5",
      arabicDescription: "المرآة الداخلية للرؤية الخلفية",
      isHeading: false,
      subHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with an interior mirror mounted at the top of the middle of the vehicle's windshield)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the interior mirror can be easily adjusted in the vertical and horizontal directions of the driver's seating position)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(The interior mirror should be free of sharp edges or points)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that there is no crack, fracture, distortion or dimming of the surface of the interior mirror resulting in dual image or blurred rear view)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that the rear view interior mirror can be installed with a distance of at least 60 meters)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 61,
      name: "headRestraints",
      technicalRequirements: "Head Restraints",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "2.6",
      arabicDescription: "مساند الرأس",
      isHeading: false,
      subHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that the front seats have adjustable headrests or that the seatback is extended upward to create a head restraint)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the outer surface of the headrest is free from roughness and sharp edges that may cause any injury to occupants)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that the headrest is fastened/secured to the seat in a way to prevent any solid and dangerous part from protruding from the headrest cover).",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that all external metal parts of the headrest are made of rust-resistant materials or are properly treated to protect them from corrosion).",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 62,
      name: "sunVisors",
      technicalRequirements: "Sun Visors",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "2.7",
      arabicDescription: "حاجبات الشمس",
      isHeading: false,
      include: ["(a)", "(b)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that every vehicle is equipped with sun visors and are well fixed)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that the position of the sun visor is not changed due to the vibrations caused by the operation of the vehicle's engine)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 63,
      name: "speedometer",
      technicalRequirements: "Speedometer (km/h) ",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "2.8",
      arabicDescription: "(عداد السرعة) كم/ساعة",
      isHeading: false,
      subHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with a dashboard-mounted speedometer that the driver can easily see and that its gradations are clear day and night)",
        },
        {
          id: 2,
          no: "(b)",
          description: "(The speedometer units should be in km per hour)",
        },
        {
          id: 3,
          no: "(c)",
          description: "(The speedometer scale should be 1, 2, 5 or 10 km/h)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that the speedometer wire is not disconnected from the gearbox resulting in interruptions in its function)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 64,
      name: "odometer",
      technicalRequirements: "Odometer (km)",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "2.9",
      arabicDescription: " (عداد المسافات)كم ",
      isHeading: false,
      subHeading: false,
      include: ["(a)", "(b)", "(c)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with a dashboard-mounted odometer that the driver can easily see and that its gradations are clear day and night)",
        },
        {
          id: 2,
          no: "(b)",
          description: "(The odometer units should be in km)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(The odometer displays an integer number consisting of 6 digits as a minimum)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 65,
      name: "speedWarning",
      technicalRequirements: "Speed Warning Device",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "2.10",
      arabicDescription: "جهاز إنذار تجاوز السرعة",
      isHeading: false,
      subHeading: false,
      include: ["(a)", "(b)", "(c)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with an optical and/or sound alarm system that automatically alerts the driver when the speedometer indicator exceeds (120 ± 5 km / h))",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(The light alarm remains illuminated continuously when the speedometer indicator exceeds (120 ± 5 km / h))",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(To activate the sound alarm at least once when exceeding the speedometer indicator each time (120 ± 5 km / h)",
        },
      ],
      level: "mainHeading",
    },
    {
      no: 66,
      name: "dashboardIndicators",
      technicalRequirements:
        "Dashboard indicators (controls, indicators and alarm)",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "2.11",
      arabicDescription:
        "( مؤشرات لوحة القيادة )أدوات التحكم و المؤشرات و التنبيه",
      isHeading: false,
      subHeading: false,
      include: [
        "(2.11.1)",
        "(2.11.2)",
        "(2.11.3)",
        "(2.11.4)",
        "(2.11.5)",
        "(2.11.6)",
        "(2.11.7)",
        "(2.11.8)",
        "(2.11.9)",
        "(2.11.10)",
        "(2.11.11)",
        "(2.11.12)",
        "(2.11.13)",
        "(2.11.14)",
        "(2.11.15)",
        "(2.11.16)",
        "(2.11.17)",
        "(2.11.18)",
        "(2.11.19)",
        "(2.11.20)",
        "(2.11.21)",
        "(2.11.22)",
        "(2.11.23)",
        "(2.11.24)",
        "(2.11.25)",
        "(2.11.26)",
        "(2.11.27)",
        "(2.11.28)",
        "(2.11.29)",
      ],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(2.11.1)",
          description: "Speedometer indicator (km / h)",
        },
        {
          id: 2,
          no: "(2.11.2)",
          description: "Odometer indicator (km)",
        },
        {
          id: 3,
          no: "(2.11.3)",
          description: "Horn control",
        },
        {
          id: 4,
          no: "(2.11.4)",
          description: "Airbags indicator",
        },
        {
          id: 5,
          no: "(2.11.5)",
          description: "Fuel level indicator and tell-tale",
        },
        {
          id: 6,
          no: "(2.11.6)",
          description: "Engine oil pressure indicator and tell-tale",
        },
        {
          id: 7,
          no: "(2.11.7)",
          description: "Engine malfunction tell-tale",
        },
        {
          id: 8,
          no: "(2.11.8)",
          description: "Engine coolant temperature indicator and tell-tale",
        },
        {
          id: 9,
          no: "(2.11.9)",
          description: "Brake system malfunction tell-tale",
        },
        {
          id: 10,
          no: "(2.11.10)",
          description: "Antilock-brake system (ABS) malfunction tell-tale",
        },
        {
          id: 11,
          no: "(2.11.11)",
          description: "Parking brake tell-tale",
        },
        {
          id: 12,
          no: "(2.11.12)",
          description: "Windscreen washing and wiping control",
        },
        {
          id: 13,
          no: "(2.11.13)",
          description: "Safety belt reminder tell-tale",
        },
        {
          id: 14,
          no: "(2.11.14)",
          description: "Air Conditioning and Heating System Control",
        },
        {
          id: 15,
          no: "(2.11.15)",
          description: "Automatic transmission position indicator",
        },
        {
          id: 16,
          no: "(2.11.16)",
          description: "Engine start ignition control",
        },
        {
          id: 17,
          no: "(2.11.17)",
          description: "Low tire pressure tell-tale",
        },
        {
          id: 18,
          no: "(2.11.18)",
          description: "Electronic stability control system (ECS) tell-tale",
        },
        {
          id: 19,
          no: "(2.11.19)",
          description: "Master lighting switch control",
        },
        {
          id: 20,
          no: "(2.11.20)",
          description: "Low beam headlights control and tell-tale",
        },
        {
          id: 21,
          no: "(2.11.21)",
          description: "High beam headlights control and tell-tale",
        },
        {
          id: 22,
          no: "(2.11.22)",
          description: "Headlight clearance control",
        },
        {
          id: 23,
          no: "(2.11.23)",
          description: "Turn signal lights control and tell-tale",
        },
        {
          id: 24,
          no: "(2.11.24)",
          description: "Hazard warning signal lights control and tell-tale",
        },
        {
          id: 25,
          no: "(2.11.25)",
          description: "Position and side marker lights control and tell-tale",
        },
        {
          id: 26,
          no: "(2.11.26)",
          description: "Rear-fog lights control and tell-tale",
        },
        {
          id: 27,
          no: "(2.11.27)",
          description: "Parking lights control and tell-tale",
        },
        {
          id: 28,
          no: "(2.11.28)",
          description: "Speed Warning tell-tale",
        },
        {
          id: 29,
          no: "(2.11.29)",
          description: "Door(s) ajar tell-tale",
        },
      ],
      level: "mainHeading",
    },
  ],
  saftyRequirements: [
    {
      no: 67,
      name: "saftyRequirements",
      technicalRequirements: "Safety Requirements",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "3",
      arabicDescription: "متطلبات السلامة",
      isHeading: true,
      subHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description:
            "(Ensure that each vehicle is equipped with a 1 kg dry powder fire extinguisher that is in good condition and usable)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(Ensure that each vehicle is equipped with a reflective warning triangle and is in good condition and usable)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that each vehicle has a first aid kit and is in good condition and usable)",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that each vehicle is equipped with a quick repair and wheel-dismantling kit)",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that reflectors for buses and trucks that exceed (2.1) meters in width are at least one on each side and on the rear, and are visible at a distance of 20 meters)",
        },
      ],
      level: "mainHeading",
    },
  ],
  modernSystems: [
    {
      no: 68,
      name: "modernSystems",
      technicalRequirements: "Modern Systems",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "4",
      arabicDescription: "الأنظمة الحديثة",
      isHeading: true,
      subHeading: false,
      include: ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)", "(g)", "(h)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: 1,
          no: "(a)",
          description: "(Ensure that every vehicle is equipped with an OBD)",
        },
        {
          id: 2,
          no: "(b)",
          description:
            "(If the vehicle is equipped with a navigation system, ensure that the systems, information, all data, maps and voice guidance systems are available in Arabic or in both Arabic and English)",
        },
        {
          id: 3,
          no: "(c)",
          description:
            "(Ensure that every vehicle is equipped with the Smart Stop System (BOS))",
        },
        {
          id: 4,
          no: "(d)",
          description:
            "(Ensure that every vehicle is equipped with the Anti-lock Braking System (ABS))",
        },
        {
          id: 5,
          no: "(e)",
          description:
            "(Ensure that every vehicle is equipped with an Electronic Balance System (ESC))",
        },
        {
          id: 6,
          no: "(f)",
          description:
            "(Ensure that each vehicle or bus with a capacity of (22) passengers and less is equipped with front airbags for the driver and front seat passenger)",
        },
        {
          id: 7,
          no: "(g)",
          description:
            "(Ensure that every vehicle is equipped with a Tire Pressure Monitoring System (TPMS))",
        },
        {
          id: 8,
          no: "(h)",
          description:
            "(Ensure that each vehicle is equipped with an electronically encoded immobilizer device to prevent unauthorized use)",
        },
      ],
      level: "mainHeading",
    },
  ],
  fuelEconomy: [
    {
      no: 69,
      name: "fuelEconomy",
      technicalRequirements: "fuel economy",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "5",
      arabicDescription: "معيار اقتصاد الوقود للمركبات ذات الخدمة الخفيفة",
      isHeading: true,
      subHeading: false,
      include: ["(a)"],
      defaultValue: "PASS",
      itemsToCheck: [
        {
          id: "1",
          no: "a",
          description:
            "(Ensure that the vehicle does not exceed the minimum permissible fuel economy according to the vehicle category according to Item No. 5/2 stipulated in the Saudi Standard No. SASO 2864)",
        },
      ],
      level: "mainHeading",
    },
  ],
  otherRequierments: [
    {
      no: 70,
      name: "notArmoured",
      technicalRequirements: "The Vehicle Is Not Armoured ",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "6.1",
      arabicDescription: "السيارة ليست مصفحة ",
      isHeading: false,
      subHeading: false,
      include: [],
      defaultValue: "PASS",
      itemsToCheck: [],
      level: "mainHeading",
    },
    {
      no: 71,
      name: "notTaxi",
      technicalRequirements: "The Vehicle Is Not Taxi ",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "6.2",
      arabicDescription: "السيارة ليست من سيارة الأجرة تاكسي",
      isHeading: false,
      subHeading: false,
      include: [],
      defaultValue: "PASS",
      itemsToCheck: [],
      level: "mainHeading",
    },
    {
      no: 72,
      name: "notSalvage",
      technicalRequirements: "The Vehicle Is Not Salvage or Drown ",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "6.3",
      arabicDescription: "السيارات ليست سالفيج او غرق ",
      isHeading: false,
      subHeading: false,
      include: [],
      defaultValue: "PASS",
      itemsToCheck: [],
      level: "mainHeading",
    },
    {
      no: 73,
      name: "notPolice",
      technicalRequirements: "The Vehicle Is Not Police ",
      placeholder: "",
      standard: "SASO ",
      label: "",
      item: "6.4",
      arabicDescription: "السيارات ليست من سيارات الشرطة ",
      isHeading: false,
      subHeading: false,
      include: [],
      defaultValue: "PASS",
      itemsToCheck: [],
      level: "mainHeading",
    },
  ],
};

export const visualInspectionData = [
  ...categorizedVisualInspectionData.exteriorInspection,
  ...categorizedVisualInspectionData.interiorInspection,
  ...categorizedVisualInspectionData.saftyRequirements,
  ...categorizedVisualInspectionData.modernSystems,
  ...categorizedVisualInspectionData.fuelEconomy,
  ...categorizedVisualInspectionData.otherRequierments,
];
