export interface Stat {
    value: number;
    suffix: string;
    prefix?: string;
    label: string;
    decimals?: number;
}

export const stats: Stat[] = [
    { value: 200, suffix: "+", label: "Projects Delivered" },
    { value: 10, suffix: "+", label: "Years of Excellence" },
    { value: 500, suffix: " Cr", prefix: "₹", label: "Total Project Value" },
    { value: 15, suffix: "+", label: "Govt. Departments Served" },
];

export interface TeamMember {
    id: string;
    name: string;
    designation: string;
    bio: string;
    photo: string;
}

export const team: TeamMember[] = [
    {
        id: "tm-001",
        name: "R. Subramaniam",
        designation: "Managing Director",
        bio: "Civil engineer with 28 years in infrastructure, former PWD consultant.",
        photo: "/images/team/subramaniam.jpg",
    },
    {
        id: "tm-002",
        name: "K. Meenakshi",
        designation: "Director – Operations",
        bio: "Specialist in highway project delivery and contract management.",
        photo: "/images/team/meenakshi.jpg",
    },
    {
        id: "tm-003",
        name: "P. Rajan",
        designation: "Chief Engineer",
        bio: "Structural engineering lead with expertise in bridge and flyover design.",
        photo: "/images/team/rajan.jpg",
    },
];

export const milestones = [
    {
        year: "2014",
        title: "Founded",
        desc: "Established in Chennai with a core team of 12 engineers and a first govt. road contract.",
    },
    {
        year: "2016",
        title: "First Major Bridge",
        desc: "Completed 450m river crossing bridge at Palar, Vellore — ahead of schedule.",
    },
    {
        year: "2018",
        title: "PWD Empanelment",
        desc: "Officially empanelled as Class A contractor with Tamil Nadu PWD.",
    },
    {
        year: "2020",
        title: "ISO Certification",
        desc: "Achieved ISO 9001:2015 quality management certification.",
    },
    {
        year: "2022",
        title: "₹ 500 Cr Milestone",
        desc: "Crossed cumulative project value of ₹500 crore. 150+ projects delivered.",
    },
    {
        year: "2024",
        title: "Smart Cities & Beyond",
        desc: "Expanding into Smart City works and Water Infrastructure across all 38 districts.",
    },
];

export const clients = [
    "Tamil Nadu PWD",
    "Tamil Nadu Highways",
    "NHAI",
    "TNRDC",
    "TWAD Board",
    "Salem City Corporation",
    "Madurai Corporation",
    "CMDA",
    "Smart Cities Mission",
    "TNUIFSL",
];