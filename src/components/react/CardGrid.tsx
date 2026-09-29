type CardData = {
    id: string;
    icon: string;
    link: string;
    title: string;
  };
  
  export default function CardGrid({ cards }: { cards: CardData[] }) {
    return (
      <div className="card-grid">
        {cards.map((card) => (
          <a className="card" href={card.link} key={card.id}>
            <img src={card.icon} alt="" />
            <h3>{card.title}</h3>
          </a>
        ))}
      </div>
    );
  }