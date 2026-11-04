export type ProjectCategory =
    | "Road & Highway"
    | "Bridges & Flyovers"
    | "Government Buildings"
    | "Water Infrastructure"
    | "Urban Development";

export interface Project {
    id: string;
    slug: string;
    title: string;
    category: ProjectCategory;
    client: string;
    location: string;
    value: string;
    duration: string;
    year: string;
    status: "Completed" | "Ongoing" | "Upcoming";
    description: string;
    highlights: string[];
    thumbnail: string; // path to image in /public/images/projects/
    images: string[];
    featured: boolean;
}

export const projects: Project[] = [
    {
        id: "proj-001",
        slug: "chennai-tambaram-elevated-expressway",
        title: "Chennai–Tambaram Elevated Expressway",
        category: "Road & Highway",
        client: "Tamil Nadu Highways Department",
        location: "Chennai, Tamil Nadu",
        value: "₹ 240 Cr",
        duration: "18 months",
        year: "2022",
        status: "Completed",
        description:
            "A 14.5 km elevated corridor connecting Chennai to Tambaram, drastically reducing peak-hour travel time and easing arterial congestion. Executed under the Tamil Nadu Highways Department with 3,200 tonnes of structural steel and full compliance with IRC standards.",
        highlights: [
            "14.5 km elevated corridor",
            "3,200 tonnes structural steel",
            "40% congestion reduction",
            "Delivered on schedule",
        ],
        thumbnail: "/images/projects/proj-001.jpg",
        images: ["/images/projects/proj-001.jpg"],
        featured: true,
    },
    {
        id: "proj-002",
        slug: "vellore-district-collectorate-complex",
        title: "District Collectorate Complex, Vellore",
        category: "Government Buildings",
        client: "Tamil Nadu PWD",
        location: "Vellore, Tamil Nadu",
        value: "₹ 310 Cr",
        duration: "36 months",
        year: "2024",
        status: "Ongoing",
        description:
            "A flagship civic infrastructure spanning 2.4 lakh sq.ft housing district administration, courts, and public service wings. The complex meets GRIHA 4-star green building norms and is being delivered under TNPWD specifications.",
        highlights: [
            "2.4 lakh sq.ft complex",
            "GRIHA 4-star green building",
            "Integrated courts & civic offices",
            "Rainwater harvesting system",
        ],
        thumbnail: "/images/projects/proj-002.jpg",
        images: ["/images/projects/proj-002.jpg"],
        featured: true,
    },
    {
        id: "proj-003",
        slug: "coimbatore-flyover-sihs-colony",
        title: "SIHS Colony Grade Separator, Coimbatore",
        category: "Bridges & Flyovers",
        client: "Tamil Nadu Highways",
        location: "Coimbatore, Tamil Nadu",
        value: "₹ 85 Cr",
        duration: "14 months",
        year: "2021",
        status: "Completed",
        description:
            "A 3-lane grade separator and flyover at one of Coimbatore's most congested junctions, streamlining traffic between the industrial corridor and city centre. Completed 45 days ahead of schedule.",
        highlights: [
            "3-lane flyover, 680m span",
            "Completed 45 days early",
            "Zero structural defect warranty",
            "Dedicated pedestrian underpasses",
        ],
        thumbnail: "/images/projects/proj-003.jpg",
        images: ["/images/projects/proj-003.jpg"],
        featured: true,
    },
    {
        id: "proj-004",
        slug: "madurai-ring-road-widening",
        title: "Madurai Ring Road Widening — Phase II",
        category: "Road & Highway",
        client: "NHAI / TNRDC",
        location: "Madurai, Tamil Nadu",
        value: "₹ 175 Cr",
        duration: "22 months",
        year: "2023",
        status: "Completed",
        description:
            "Widening and rehabilitation of 28 km of ring road from 2-lane to 4-lane divided carriageway with service roads, median landscaping, and highway-grade lighting.",
        highlights: [
            "28 km road widening",
            "4-lane divided carriageway",
            "68 box culverts",
            "Solar-powered highway lighting",
        ],
        thumbnail: "/images/projects/proj-004.jpg",
        images: ["/images/projects/proj-004.jpg"],
        featured: false,
    },
    {
        id: "proj-005",
        slug: "tirunelveli-water-treatment-plant",
        title: "Tirunelveli Combined Water Treatment Plant",
        category: "Water Infrastructure",
        client: "TWAD Board",
        location: "Tirunelveli, Tamil Nadu",
        value: "₹ 130 Cr",
        duration: "20 months",
        year: "2023",
        status: "Completed",
        description:
            "A 25 MLD combined water treatment facility serving three municipalities. Includes intake structure, raw water channels, rapid sand filters, and 24×7 automated SCADA monitoring.",
        highlights: [
            "25 MLD treatment capacity",
            "Serves 3 municipalities",
            "SCADA automated control",
            "Zero liquid discharge compliance",
        ],
        thumbnail: "/images/projects/proj-005.jpg",
        images: ["/images/projects/proj-005.jpg"],
        featured: false,
    },
    {
        id: "proj-006",
        slug: "salem-smart-city-road-package",
        title: "Salem Smart City Road Package",
        category: "Urban Development",
        client: "Salem City Corporation / Smart Cities Mission",
        location: "Salem, Tamil Nadu",
        value: "₹ 95 Cr",
        duration: "18 months",
        year: "2024",
        status: "Ongoing",
        description:
            "Comprehensive road improvement under the Smart Cities Mission: 22 roads totalling 38 km with underground utilities, intelligent street lighting, cycle tracks, and storm water drainage.",
        highlights: [
            "38 km of roads upgraded",
            "Underground utility ducting",
            "Smart LED street lights",
            "Cycle-track integration",
        ],
        thumbnail: "/images/projects/proj-006.jpg",
        images: ["/images/projects/proj-006.jpg"],
        featured: false,
    },
];

export const projectCategories: ProjectCategory[] = [
    "Road & Highway",
    "Bridges & Flyovers",
    "Government Buildings",
    "Water Infrastructure",
    "Urban Development",
];