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
        url: `${prefix}/doctor-approval`,
      },
      {
        title: "Dotors",
        url: `${prefix}/all-doctors`,
      },
    ],
  },
  {
    title: "Patient",
    url: "#",
    items: [
      {
        title: "Patients",
        url: `${prefix}/all-patients`,
      },
    ],
  },
];
