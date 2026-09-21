const prefix = "/patient-dashboard";

export const patientRoute = [
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
        title: "My Schedule",
        url: "#",
      },
      {
        title: "Today's Schedule",
        url: "#",
      },
    ],
  },
  {
    title: "Booking",
    url: "#",
    items: [
      {
        title: "Create Booking",
        url: "#",
      },
      {
        title: "My Booking",
        url: "#",
      },
    ],
  },
  {
    title: "Payment",
    url: "#",
    items: [
      {
        title: "Payment Hisory",
        url: "#",
      },
    ],
  },
];
