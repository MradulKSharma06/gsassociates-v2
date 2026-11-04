export interface Service {
    id: string;
    title: string;
    category: string;
    description: string;
    capabilities: string[];
    icon: string; // lucide icon name
    accentColor: "blue" | "navy" | "gold";
}

export const services: Service[] = [
    {
        id: "svc-001",
        title: "Road & Highway Construction",
        category: "Infrastructure",
        description:
            "State and national highway construction, widening, and surface rehabilitation. From earthworks to final asphalt wearing course — fully compliant with IRC and MoRTH specifications.",
        capabilities: [
            "2-lane to 6-lane highway construction",
            "Flexible and rigid pavement design",
            "Road widening & strengthening",
            "Highway maintenance contracts",
            "Junction improvements",
            "Bypass construction",
        ],
        icon: "route",
        accentColor: "blue",
    },
    {
        id: "svc-002",
        title: "Bridges & Flyovers",
        category: "Structural",
        description:
            "Design-build execution for grade separators, vehicular bridges, pedestrian bridges, and elevated corridors. Structural analysis, fabrication, and construction managed in-house.",
        capabilities: [
            "Precast & in-situ RCC bridges",
            "Steel flyovers & grade separators",
            "Pedestrian foot over bridges",
            "Box girder & T-beam construction",
            "Rehabilitation of existing structures",
            "River crossing bridges",
        ],
        icon: "building-bridge",
        accentColor: "navy",
    },
    {
        id: "svc-003",
        title: "Government Buildings & Institutions",
        category: "Civil Works",
        description:
            "Institutional construction for courts, hospitals, administrative offices, and public facilities — all under state PWD and central government specifications.",
        capabilities: [
            "District & sub-district admin offices",
            "Government hospitals & PHCs",
            "Court complexes",
            "Police stations & barracks",
            "Educational institutions",
            "GRIHA green building compliance",
        ],
        icon: "building-2",
        accentColor: "gold",
    },
    {
        id: "svc-004",
        title: "Water Infrastructure",
        category: "Hydraulic",
        description:
            "End-to-end water supply and treatment infrastructure for municipalities and district boards — from intake to consumer distribution.",
        capabilities: [
            "Water treatment plants (WTP)",
            "Underground drainage (UGD) systems",
            "Overhead tank construction",
            "Pipeline laying & rehabilitation",
            "Pump house construction",
            "SCADA integration",
        ],
        icon: "droplets",
        accentColor: "blue",
    },
    {
        id: "svc-005",
        title: "Urban Infrastructure",
        category: "Urban Development",
        description:
            "Comprehensive urban improvement works for corporations and municipalities — storm water drains, footpaths, parks, and Smart City packages.",
        capabilities: [
            "Storm water drain networks",
            "Street & footpath development",
            "Underground utility ducting",
            "Smart City package works",
            "Park & plaza development",
            "Solid waste management infrastructure",
        ],
        icon: "city",
        accentColor: "navy",
    },
    {
        id: "svc-006",
        title: "Project Management & Consultancy",
        category: "Advisory",
        description:
            "Technical consultancy, project management, and quality assurance for large-scale civil infrastructure projects across Tamil Nadu.",
        capabilities: [
            "Third-party quality audits",
            "Project planning & scheduling",
            "Contract management (FIDIC / NIT)",
            "Site supervision & reporting",
            "DPR preparation",
            "Tender documentation support",
        ],
        icon: "clipboard-list",
        accentColor: "gold",
    },
];