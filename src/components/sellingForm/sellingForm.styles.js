import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  test: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  test2: {
    width: 100,
    background: 'red'
  },
  test3: {
    background: 'red'
  }
}));
