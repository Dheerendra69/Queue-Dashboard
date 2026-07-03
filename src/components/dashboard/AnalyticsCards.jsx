import Card from "../common/Card";

export default function AnalyticsCards({
  stats,
}) {
  const cards = [
    {
      title: "Total Queues",
      value: stats?.totalQueues,
    },
    {
      title: "Waiting Tokens",
      value: stats?.waitingTokens,
    },
    {
      title: "Serving",
      value: stats?.serving,
    },
    {
      title: "Completed Today",
      value: stats?.completedToday,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <h3 className="text-gray-500">
            {card.title}
          </h3>

          <p className="text-4xl font-bold mt-4 text-blue-600">
            {card.value}
          </p>
        </Card>
      ))}
    </div>
  );
}