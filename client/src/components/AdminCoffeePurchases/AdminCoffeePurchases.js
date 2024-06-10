import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@material-ui/core';
import useStyles from './styles';

const AdminCoffeePurchases = () => {
  const classes = useStyles();
  const [purchases, setPurchases] = useState([]);
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (user?.result?.email === 'jabedweb73@gmail.com') {
      fetch('http://localhost:5000/coffee-purchases?email=' + user.result.email)
        .then(res => res.json())
        .then(data => setPurchases(data));
    }
  }, [user]);

  if (user?.result?.email !== 'jabedweb73@gmail.com') {
    return <Typography variant="h6" color="error">Access denied</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Coffee Purchases
      </Typography>
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Coffee Count</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map(purchase => (
              <TableRow key={purchase._id}>
                <TableCell>{purchase.name}</TableCell>
                <TableCell>{purchase.email}</TableCell>
                <TableCell>{purchase.coffeeCount}</TableCell>
                <TableCell>${purchase.price.toFixed(2)}</TableCell>
                <TableCell>{new Date(purchase.date).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default AdminCoffeePurchases;
