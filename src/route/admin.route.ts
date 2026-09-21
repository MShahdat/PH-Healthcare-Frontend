const prefix = "/admin-dashboard";

export const adminRoute = [
  {
    title: "Dashboard",
    url: `${prefix}`,
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
    ],
  },
  {
    title: "Doctor",
    url: "#",
    items: [
      {
        title: "Doctor Aproval",
        url: "#",
      },
      {
        title: "Dotors",
        url: "#",
      },
    ],
  },
  {
    title: "Patient",
    url: "#",
    items: [
      {
        title: "Patients",
        url: "#",
      },
    ],
  },
];
