const prefix = "/doctor-dashboard";

export const doctorRoute = [
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
    title: "Schedule",
    url: "#",
    items: [
      {
        title: "Create Schedule",
        url: `${prefix}/schedules`,
      },
      {
        title: "",
        url: "#",
      },
    ],
  },
  {
    title: "Booking",
    url: "#",
    items: [
      {
        title: "Incomming Booking",
        url: "#",
      },
    ],
  },
];
