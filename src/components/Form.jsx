import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  Button,
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { addTicket, updateTicket } from '../app/ticketsSlice';

//validation schema with Yup
const validationSchema = Yup.object({
    type: Yup.string()
        .required('Please select an option'),
    status: Yup.string()
        .required('Please select an option'),
    summary: Yup.string()
        .required('Ticket Summary is required'),
    priority: Yup.string()
        .required('Please select an option'),
    storyPoints: Yup.number()
        .min(0, 'Value must be at least 0')
        .max(100, 'Value cannot exceed 100')
        .required('This field is required'),
});

const Form = () => {
  const { ticketId } = useParams(),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    ticket = useSelector((state) =>
      ticketId ? state.tickets.tickets.find((t) => t.id === ticketId) : null
    ),
    { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(validationSchema),
    });

  useEffect(() => {
    if (ticket) {
      reset(ticket);
    }
  }, [ticket, reset]);

  const onSubmit = (data) => {
    if (ticketId) {
      // To update existing ticket
      dispatch(updateTicket({ id: ticketId, updates: data }));
    } else {
      // To create a new ticket
      dispatch(addTicket(data));
    }
    // To redirect ticket page after submission
    navigate('/'); 
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <h1>{ticketId ? 'Edit Ticket' : 'Create Ticket'}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Issue Type</InputLabel>
          <Select
            {...register("type")}
            defaultValue={ticket?.type || 'bug'}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="task">TASK</MenuItem>
            <MenuItem value="story">STORY</MenuItem>
            <MenuItem value="bug">BUG</MenuItem>
          </Select>
          {errors.type && <FormHelperText error>{errors.type.message}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            {...register("status")}
            defaultValue={ticket?.status || 'backlog'}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="backlog">BACKLOG</MenuItem>
            <MenuItem value="inProgress">IN-PROGRESS</MenuItem>
            <MenuItem value="inReview">IN-REVIEW</MenuItem>
            <MenuItem value="qa">QA</MenuItem>
            <MenuItem value="done">DONE</MenuItem>
          </Select>
          {errors.status && <FormHelperText error>{errors.status.message}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Summary"
            {...register("summary")}
            defaultValue={ticket?.summary || ''}
          />
          {errors.summary && <FormHelperText error>{errors.summary.message}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Description"
            multiline
            rows={4}
            {...register("description")}
            defaultValue={ticket?.description || ''}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Priority</InputLabel>
          <Select
            {...register("priority")}
            defaultValue={ticket?.priority || 'medium'}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="highest">HIGHEST</MenuItem>
            <MenuItem value="high">HIGH</MenuItem>
            <MenuItem value="medium">MEDIUM</MenuItem>
            <MenuItem value="low">LOW</MenuItem>
            <MenuItem value="lowest">LOWEST</MenuItem>
          </Select>
          {errors.priority && <FormHelperText error>{errors.priority.message}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Labels"
            {...register("labels")}
            defaultValue={ticket?.labels || ''}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Story Points"
            type="number"
            {...register("storyPoints")}
            defaultValue={ticket?.storyPoints || '0'}
          />
          {errors.storyPoints && <FormHelperText error>{errors.storyPoints.message}</FormHelperText>}
        </FormControl>

        <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
          {ticketId ? 'Save' : 'Create'}
        </Button>
        <Button
          component="a"
          href='/'
          variant="outlined"
          color="secondary"
        >
          View Tickets
        </Button>
      </form>
    </Box>
  );
};

export default Form;
