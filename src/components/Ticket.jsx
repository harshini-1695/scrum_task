import { useDispatch } from 'react-redux';
import { deleteTicket } from '../app/ticketsSlice';

const Ticket = ({ ticket }) => {
  const dispatch = useDispatch();
  const { id, summary, priority, type, status } = ticket;
  const handleDelete = (id) => {
    // To confirm deletion
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      dispatch(deleteTicket({ id }));
    }
  };

  return (
    <div className="ticket">
      <h4><i>ISSUE-{id}:</i> {summary}</h4>
      <p>Priority: {priority}</p>
      <p>Type: {type}</p>
      <p>Status: {status}</p>
      <div className="labels"></div>
      <a className="edit" href={`/form/${id}`}>[Edit Ticket]</a>  
      <span className="delete" onClick={() => handleDelete(id)}>[- Delete Ticket]</span>
    </div>
  );
};

export default Ticket;
