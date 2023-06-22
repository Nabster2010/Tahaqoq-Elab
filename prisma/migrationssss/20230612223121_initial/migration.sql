-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "active" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "website" TEXT,
    "taxId" TEXT,
    "customerType" TEXT NOT NULL DEFAULT 'INDIVIDUAL'
);

-- CreateTable
CREATE TABLE "VehicleManufacturer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "description" TEXT,
    "country" TEXT
);

-- CreateTable
CREATE TABLE "VehicleType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "modelType" TEXT,
    "description" TEXT,
    "manufacturerId" TEXT NOT NULL,
    CONSTRAINT "VehicleType_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "VehicleManufacturer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Color" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "color" TEXT,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT,
    "vin" TEXT NOT NULL,
    "reqNo" TEXT NOT NULL,
    "reqDate" TEXT NOT NULL,
    "bayanNo" TEXT NOT NULL,
    "bayanDate" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL DEFAULT 'CARD',
    "price" REAL NOT NULL,
    "tax" REAL NOT NULL,
    "customerId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Vehicle_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE NO ACTION ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VehicleInfo" (
    "vehicleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "colorId" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "vehicleTypeId" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'PASSENGER',
    "condition" TEXT NOT NULL DEFAULT 'USED',
    "fuelType" TEXT NOT NULL DEFAULT 'PETROL',
    "engine" TEXT,
    "engineSize" TEXT,
    "gear" TEXT DEFAULT 'AUTOMATIC',
    "mileage" TEXT NOT NULL,
    "seats" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VehicleInfo_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "VehicleInfo_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "Color" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VehicleInfo_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Emission" (
    "vehicleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "co" REAL,
    "hc" REAL,
    "diesel" REAL,
    "ppm" REAL,
    "result" TEXT DEFAULT 'PASS',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Emission_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HighBeamLevel" (
    "vehicleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "level" REAL,
    "left" REAL,
    "right" REAL,
    "result" TEXT DEFAULT 'PASS',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HighBeamLevel_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SideSlip" (
    "vehicleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reading" REAL,
    "result" TEXT DEFAULT 'PASS',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SideSlip_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Suspension" (
    "vehicleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fl" REAL NOT NULL,
    "fr" REAL NOT NULL,
    "rl" REAL NOT NULL,
    "rr" REAL NOT NULL,
    "result" TEXT DEFAULT 'PASS',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Suspension_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Brake" (
    "vehicleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "parking" REAL NOT NULL,
    "front" REAL NOT NULL,
    "rear" REAL NOT NULL,
    "result" TEXT DEFAULT 'PASS',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Brake_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VisualInspection" (
    "vehicleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dimensions" TEXT NOT NULL DEFAULT 'PASS',
    "color" TEXT NOT NULL DEFAULT 'PASS',
    "identificationNo" TEXT NOT NULL DEFAULT 'PASS',
    "information" TEXT NOT NULL DEFAULT 'PASS',
    "exteriorStructure" TEXT NOT NULL DEFAULT 'PASS',
    "electricSys" TEXT NOT NULL DEFAULT 'PASS',
    "brakeSys" TEXT NOT NULL DEFAULT 'PASS',
    "brakeCylinders" TEXT NOT NULL DEFAULT 'PASS',
    "brakeFluidTank" TEXT NOT NULL DEFAULT 'PASS',
    "brakeHosesAndTubes" TEXT NOT NULL DEFAULT 'PASS',
    "brakePedal" TEXT NOT NULL DEFAULT 'PASS',
    "airTank" TEXT NOT NULL DEFAULT 'PASS',
    "brakeDiscs" TEXT NOT NULL DEFAULT 'PASS',
    "autoBrakeCheck" TEXT NOT NULL DEFAULT 'PASS',
    "staticBrakeCheck" TEXT NOT NULL DEFAULT 'PASS',
    "dynamicBrakeCheck" TEXT NOT NULL DEFAULT 'PASS',
    "lights" TEXT NOT NULL DEFAULT 'PASS',
    "headLights" TEXT NOT NULL DEFAULT 'PASS',
    "rearTrafficLights" TEXT NOT NULL DEFAULT 'PASS',
    "rearFogLights" TEXT NOT NULL DEFAULT 'PASS',
    "turnSignalLights" TEXT NOT NULL DEFAULT 'PASS',
    "hazardWarningLights" TEXT NOT NULL DEFAULT 'PASS',
    "reverseLights" TEXT NOT NULL DEFAULT 'PASS',
    "rearPlateLights" TEXT NOT NULL DEFAULT 'PASS',
    "brakeLights" TEXT NOT NULL DEFAULT 'PASS',
    "glass" TEXT NOT NULL DEFAULT 'PASS',
    "steeringSys" TEXT NOT NULL DEFAULT 'PASS',
    "steeringWheel" TEXT NOT NULL DEFAULT 'PASS',
    "ballJoints" TEXT NOT NULL DEFAULT 'PASS',
    "steeringArms" TEXT NOT NULL DEFAULT 'PASS',
    "steeringGearBox" TEXT NOT NULL DEFAULT 'PASS',
    "hydraulicSteeringSys" TEXT NOT NULL DEFAULT 'PASS',
    "balanceShaft" TEXT NOT NULL DEFAULT 'PASS',
    "transmissionParts" TEXT NOT NULL DEFAULT 'PASS',
    "suspensionSys" TEXT NOT NULL DEFAULT 'PASS',
    "frontRearSuspension" TEXT NOT NULL DEFAULT 'PASS',
    "frontRearSprings" TEXT NOT NULL DEFAULT 'PASS',
    "shockAbsorbers" TEXT NOT NULL DEFAULT 'PASS',
    "exhaustSys" TEXT NOT NULL DEFAULT 'PASS',
    "mufflers" TEXT NOT NULL DEFAULT 'PASS',
    "wipersAndWashers" TEXT NOT NULL DEFAULT 'PASS',
    "sideMirrors" TEXT NOT NULL DEFAULT 'PASS',
    "doorSafty" TEXT NOT NULL DEFAULT 'PASS',
    "tires" TEXT NOT NULL DEFAULT 'PASS',
    "wheels" TEXT NOT NULL DEFAULT 'PASS',
    "engine" TEXT NOT NULL DEFAULT 'PASS',
    "noisePollution" TEXT NOT NULL DEFAULT 'PASS',
    "fuelSys" TEXT NOT NULL DEFAULT 'PASS',
    "truckBarriers" TEXT NOT NULL DEFAULT 'PASS',
    "wheelDeviation" TEXT NOT NULL DEFAULT 'PASS',
    "fifthWheel" TEXT NOT NULL DEFAULT 'PASS',
    "gaseousPollutants" TEXT NOT NULL DEFAULT 'PASS',
    "exhaustGasesGasoline" TEXT NOT NULL DEFAULT 'PASS',
    "exhaustGasesDiesel" TEXT NOT NULL DEFAULT 'PASS',
    "horn" TEXT NOT NULL DEFAULT 'PASS',
    "handBrake" TEXT NOT NULL DEFAULT 'PASS',
    "safetyBelts" TEXT NOT NULL DEFAULT 'PASS',
    "seats" TEXT NOT NULL DEFAULT 'PASS',
    "rearViewMirror" TEXT NOT NULL DEFAULT 'PASS',
    "headRestraints" TEXT NOT NULL DEFAULT 'PASS',
    "sunVisors" TEXT NOT NULL DEFAULT 'PASS',
    "speedometer" TEXT NOT NULL DEFAULT 'PASS',
    "odometer" TEXT NOT NULL DEFAULT 'PASS',
    "speedWarning" TEXT NOT NULL DEFAULT 'PASS',
    "dashboardIndicators" TEXT NOT NULL DEFAULT 'PASS',
    "fireExtinguisher" TEXT NOT NULL DEFAULT 'PASS',
    "reflectiveTriangle" TEXT NOT NULL DEFAULT 'PASS',
    "firstAidKit" TEXT NOT NULL DEFAULT 'PASS',
    "repairKit" TEXT NOT NULL DEFAULT 'PASS',
    "truckReflectors" TEXT NOT NULL DEFAULT 'PASS',
    "obd" TEXT NOT NULL DEFAULT 'PASS',
    "navigationSystemsLanguage" TEXT NOT NULL DEFAULT 'PASS',
    "bos" TEXT NOT NULL DEFAULT 'PASS',
    "abs" TEXT NOT NULL DEFAULT 'PASS',
    "esc" TEXT NOT NULL DEFAULT 'PASS',
    "airbags" TEXT NOT NULL DEFAULT 'PASS',
    "tpms" TEXT NOT NULL DEFAULT 'PASS',
    "immobilizer" TEXT NOT NULL DEFAULT 'PASS',
    "fuelEconomy" TEXT NOT NULL DEFAULT 'PASS',
    "notArmoured" TEXT NOT NULL DEFAULT 'PASS',
    "notTaxi" TEXT NOT NULL DEFAULT 'PASS',
    "notSalvage" TEXT NOT NULL DEFAULT 'PASS',
    "notPolice" TEXT NOT NULL DEFAULT 'PASS',
    CONSTRAINT "VisualInspection_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_slug_key" ON "Vehicle"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_vin_key" ON "Vehicle"("vin");
