// Spec sheet data for all 5 phases of the Blueprint UI

export interface SpecEntry {
  key: string;
  value: string;
}

export interface PhaseSpec {
  ref: string;
  title: string;
  entries: SpecEntry[];
  remarks?: string;
}

export const SPEC_DATA: Record<number, PhaseSpec> = {
  1: {
    ref: 'SC-01-CHASSIS',
    title: 'STRUCTURAL FRAME ASSEMBLY',
    entries: [
      { key: 'COMPONENT', value: 'STRUCTURAL FRAME ASSEMBLY' },
      { key: 'MATERIAL', value: 'HIGH-TENSILE STEEL (550 MPa)' },
      { key: 'COMPLIANCE', value: 'AIS 052 : 2008 CERTIFIED' },
      { key: 'WELD TYPE', value: 'MIG / TIG STRUCTURAL' },
      { key: 'SURFACE', value: 'ANTI-CORROSION PRIMER COAT' },
    ],
    remarks: 'Primary load-bearing structure. All joints tested to 3x rated load specification.',
  },
  2: {
    ref: 'SC-02-DRVTRAIN',
    title: 'VOLVO B11R POWERTRAIN',
    entries: [
      { key: 'COMPONENT', value: 'VOLVO B11R POWERTRAIN' },
      { key: 'ENGINE', value: '11L INLINE-6 DIESEL' },
      { key: 'OUTPUT', value: '430 HP @ 1,800 RPM' },
      { key: 'TORQUE', value: '2,100 Nm @ 1,050 RPM' },
      { key: 'EMISSION', value: 'EURO VI COMPLIANT' },
      { key: 'TRANSMISSION', value: 'I-SHIFT 12-SPEED AUTO' },
    ],
  },
  3: {
    ref: 'SC-03-INTERIOR',
    title: 'INTERIOR CONFIGURATION',
    entries: [
      { key: 'LAYOUT', value: 'DOUBLE DECK SLEEPER' },
      { key: 'BERTHS', value: '40 (20 UPPER / 20 LOWER)' },
      { key: 'UPHOLSTERY', value: 'BLUE / TAN LEATHER' },
      { key: 'FLOORING', value: 'WOOD-PATTERN THEATRE' },
      { key: 'AC SYSTEM', value: 'DUAL-ZONE CLIMATE CTRL' },
      { key: 'CURTAINS', value: 'YELLOW PRIVACY SCREEN' },
    ],
  },
  4: {
    ref: 'SC-04-EXTERIOR',
    title: 'EXTERIOR SPECIFICATION',
    entries: [
      { key: 'BODY PANELS', value: 'SILVER METALLIC ALLOY' },
      { key: 'GLASS TYPE', value: 'PANORAMIC TINTED FLOAT' },
      { key: 'WINDSHIELD', value: 'LAMINATED SAFETY GLASS' },
      { key: 'SEALING', value: 'WEATHERPROOF GASKET' },
      { key: 'PAINT', value: 'CUSTOM LIVERY AVAILABLE' },
    ],
  },
  5: {
    ref: 'SC-05-COMPLETE',
    title: 'MANUFACTURING COMPLETE',
    entries: [
      { key: 'STATUS', value: 'MANUFACTURING COMPLETE' },
      { key: 'DIMENSIONS', value: 'L:12,640 x H:3,200mm' },
      { key: 'WEIGHT', value: '~16,500 KG (UNLADEN)' },
      { key: 'TESTING', value: 'FULL QC INSPECTION PASS' },
      { key: 'DELIVERY', value: 'PAN-INDIA TRANSPORT AVAIL' },
    ],
    remarks: 'Commission your build below.',
  },
};
