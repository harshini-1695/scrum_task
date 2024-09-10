import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Autocomplete,
  TextField,
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
  const typeOptions = [
    { label: 'TASK', value: 'TASK' },
    { label: 'STORY', value: 'STORY' },
    { label: 'BUG', value: 'BUG' },
  ];

  const statusOptions = [
    { label: 'BACKLOG', value: 'BACKLOG' },
    { label: 'IN-PROGRESS', value: 'IN-PROGRESS' },
    { label: 'IN-REVIEW', value: 'IN-REVIEW' },
    { label: 'QA', value: 'QA' },
    { label: 'DONE', value: 'DONE' },
  ];

  const priorityOptions = [
    { label: 'HIGHEST', value: 'HIGHEST' },
    { label: 'HIGH', value: 'HIGH' },
    { label: 'MEDIUM', value: 'MEDIUM' },
    { label: 'LOW', value: 'LOW' },
    { label: 'LOWEST', value: 'LOWEST' },
  ];

  const { ticketId } = useParams(),
    dispatch = useDispatch(),
    navigate = useNavigate(),
    ticket = useSelector((state) =>
      ticketId ? state.tickets.tickets.find((t) => t.id === ticketId) : null
    ),
    { control, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        type: ticket ? ticket.type : "BUG",
        status: ticket ? ticket.status : "BACKLOG",
        priority: ticket ? ticket.priority : "MEDIUM",
        summary: ticket?.summary || "",
        description: ticket?.description || "",
        labels: ticket?.labels || "",
        storyPoints: ticket?.storyPoints || 0
      }
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
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={typeOptions}
              fullWidth
              sx={{ mb: 2 }}
              getOptionLabel={(option) => option.label}
              value={typeOptions.find(option => option.value === field.value) || null}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              onChange={(_, value) => field.onChange(value ? value.value : '')}
              renderInput={(params) => <TextField {...params} label="Issue Type" 
                error={Boolean(errors.type)}
                helperText={errors.type?.message}
              />}
            />
          )}
        />

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={statusOptions}
              fullWidth
              sx={{ mb: 2 }}
              getOptionLabel={(option) => option.label}
              value={statusOptions.find(option => option.value === field.value) || null}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              onChange={(_, value) => field.onChange(value ? value.value : '')}
              renderInput={(params) => <TextField {...params} label="Status" 
                error={Boolean(errors.status)}
                helperText={errors.status?.message}
              />}
            />
          )}
        />
        
        <Controller
          name="summary"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Summary"
              fullWidth
              sx={{ mb: 2 }}
              error={Boolean(errors.summary)}
              helperText={errors.summary?.message}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              label="Description"
              fullWidth
              sx={{ mb: 2 }}
              multiline
              rows={4}
              {...field}
            />
          )}
        />

        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={priorityOptions}
              fullWidth
              sx={{ mb: 2 }}
              getOptionLabel={(option) => option.label}
              value={priorityOptions.find(option => option.value === field.value) || null}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              onChange={(_, value) => field.onChange(value ? value.value : '')}
              renderInput={(params) => <TextField {...params} label="Priority" 
                error={Boolean(errors.priority)}
                helperText={errors.priority?.message}
              />}
            />
          )}
        />

        <Controller
          name="labels"
          control={control}
          render={({ field }) => (
            <TextField
              label="Labels"
              {...field}
              fullWidth
              sx={{ mb: 2 }}
            />
          )}
        />

        <Controller
          name="storyPoints"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Story Points"
              type="number"
              fullWidth
              sx={{ mb: 2 }}
              error={Boolean(errors.storyPoints)}
              helperText={errors.storyPoints?.message}
            />
          )}
        />

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
