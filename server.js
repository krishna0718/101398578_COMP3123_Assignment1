const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee');

const app = express();

app.use(express.json());


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);


const uri = "mongodb+srv://krishnathakkar072004:thakkar0718@cluster0.i6c8e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error:', error));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
