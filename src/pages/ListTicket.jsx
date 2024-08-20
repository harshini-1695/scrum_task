import { useSelector } from 'react-redux';
import Ticket from '../components/Ticket';

const ListTicket = () => {
  const tickets = useSelector((state) => state.tickets.tickets);
  return (
    <div>
      <div className="ticket-header">
        <h1 style={{ textAlign: 'center' }}>Tickets</h1>
        <a className="create" href="/form">[+ Create Ticket]</a>
      </div>
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <Ticket key={index} ticket={ticket} />
        ))
      ) : (
        <p>No tickets available.</p>
      )}
    </div>
  );
};

export default ListTicket;