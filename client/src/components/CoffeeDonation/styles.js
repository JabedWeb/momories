import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  coffeeOption: {
    padding: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
    },
  },
  selected: {
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.6)',
  },
  paymentContainer: {
    marginTop: theme.spacing(4),
  },
}));
