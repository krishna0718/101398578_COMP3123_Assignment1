const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();


router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
});


router.post('/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully.', employee_id: employee._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error });
  }
});


router.get('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.eid);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
});


router.put('/employees/:eid', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.status(200).json({ message: 'Employee details updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating employee', error });
  }
});


router.delete('/employees', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.query.eid);
    res.status(200).json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
});

module.exports = router;
