// Placeholder facility data — replace with a real Firestore collection
// or Google Places API call once you're ready to go live.
const facilities = [
  {
    id: "1",
    name: "LVCT Youth Center",
    distance: "1.2 km",
    address: "Thika Road, near Blue Post",
    hours: "Open today, 8:00 to 17:00",
    phone: "+254 700 000 000",
    status: "Open",
    services: ["Free HIV self-test kits", "PrEP", "Walk-ins welcome"],
    tags: ["kits", "prep"],
  },
  {
    id: "2",
    name: "Thika Level 5 Hospital",
    distance: "2.8 km",
    address: "Kenyatta Highway",
    hours: "Open today, 8:00 to 18:00",
    phone: "+254 700 111 111",
    status: "Open",
    services: ["PrEP", "Syphilis testing"],
    tags: ["prep", "syphilis"],
  },
  {
    id: "3",
    name: "Makongeni Health Centre",
    distance: "3.6 km",
    address: "Makongeni",
    hours: "Closed, opens 8:00 tomorrow",
    phone: "+254 700 222 222",
    status: "Closed",
    services: ["Free HIV self-test kits"],
    tags: ["kits"],
  },
];

export default facilities;