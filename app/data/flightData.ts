export const flightData = {
  flights: [
    {
      id: "FL001",
      from: "New York",
      to: "London",
      date: "2023-07-15",
      price: 450,
      seats: [
        { id: "A1", available: true },
        { id: "A2", available: false },
        { id: "B1", available: true },
        { id: "B2", available: true },
        { id: "C1", available: false },
        { id: "C2", available: true },
      ],
    },
    {
      id: "FL002",
      from: "Los Angeles",
      to: "Tokyo",
      date: "2023-07-20",
      price: 800,
      seats: [
        { id: "A1", available: true },
        { id: "A2", available: true },
        { id: "B1", available: false },
        { id: "B2", available: true },
        { id: "C1", available: true },
        { id: "C2", available: false },
      ],
    },
    {
      id: "FL003",
      from: "London",
      to: "Paris",
      date: "2023-07-25",
      price: 200,
      seats: [
        { id: "A1", available: false },
        { id: "A2", available: true },
        { id: "B1", available: true },
        { id: "B2", available: false },
        { id: "C1", available: true },
        { id: "C2", available: true },
      ],
    },
  ],
};
