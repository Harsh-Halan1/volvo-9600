export interface PhaseSpec {
  label: string;
  value: string;
}

export interface PhaseContent {
  number: string;
  phase: number;
  title: string;
  description: string;
  accentColor: string;
  specs: PhaseSpec[];
  mobileFrameSrc: string; // key frame image path
}

export const PHASE_DATA: PhaseContent[] = [
  {
    number: "01",
    phase: 1,
    title: "The Bare Foundation",
    description:
      "Every Surendra coach begins the same way — raw high-tensile structural steel, precision-cut and welded by hand. The chassis is the covenant. Everything else is built upon it.",
    accentColor: "#C8851A",
    mobileFrameSrc: "/assets/ezgif-frame-001.jpg",
    specs: [
      { label: "FRAMEWORK",    value: "High-Tensile Steel"  },
      { label: "COMPLIANCE",   value: "AIS 052 Certified"   },
      { label: "WELD TYPE",    value: "MIG/TIG Structural"  },
      { label: "UNDERCARRIAGE",value: "Commercial Grade"    },
    ],
  },
  {
    number: "02",
    phase: 2,
    title: "Drivetrain Integration",
    description:
      "The Volvo B11R engine — 430 horsepower, Euro VI compliant — is seated into the rear compartment. Four heavy-duty commercial axle assemblies lock into position.",
    accentColor: "#3A7FBF",
    mobileFrameSrc: "/assets/ezgif-frame-095.jpg",
    specs: [
      { label: "ENGINE",       value: "Volvo B11R"          },
      { label: "OUTPUT",       value: "430 HP"              },
      { label: "TORQUE",       value: "2100 Nm"             },
      { label: "EMISSION",     value: "Euro VI"             },
      { label: "TRANSMISSION", value: "I-Shift 12-speed"    },
    ],
  },
  {
    number: "03",
    phase: 3,
    title: "Bespoke Interior Architecture",
    description:
      "A custom double-decker steel cage rises around the sleeper layout. Individual berths are upholstered in blue and tan leather. Theatre-gradient wood flooring. Yellow privacy curtains on both decks.",
    accentColor: "#8B5CF6",
    mobileFrameSrc: "/assets/ezgif-frame-341.jpg",
    specs: [
      { label: "BERTHS",      value: "40 Premium Sleepers"       },
      { label: "UPHOLSTERY",  value: "Italian-Grade Leather"     },
      { label: "FLOORING",    value: "Wood-Pattern Theatre"      },
      { label: "DECKS",       value: "Double — Upper + Lower"    },
      { label: "CLIMATE",     value: "Dual-Zone AC"              },
    ],
  },
  {
    number: "04",
    phase: 4,
    title: "The Exterior Shell",
    description:
      "Aerodynamic silver metallic body panels slide into place over the structural cage. Panoramic glass units are precision-fitted — keeping the interior fully visible and the exterior fully sealed.",
    accentColor: "#3A7FBF",
    mobileFrameSrc: "/assets/ezgif-frame-544.jpg",
    specs: [
      { label: "PANELS",       value: "Silver Metallic Alloy"   },
      { label: "GLASS",        value: "Panoramic Tinted"        },
      { label: "WINDSHIELD",   value: "Laminated Safety"        },
      { label: "SEALING",      value: "Weatherproof Gasket"     },
      { label: "AERODYNAMICS", value: "Wind-Tunnel Tested"      },
    ],
  },
  {
    number: "05",
    phase: 5,
    title: "The Finished Masterpiece",
    description: "25 years of craft. One coach at a time.",
    accentColor: "#C8851A",
    mobileFrameSrc: "/assets/ezgif-frame-720.jpg",
    specs: [],
  },
];
