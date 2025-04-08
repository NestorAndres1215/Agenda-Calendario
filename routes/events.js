// backend/routes/events.js
const express = require('express');
const router = express.Router();
const Event = require('../model/Event');

// Obtener todos los eventos (para FullCalendar y listado general)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener eventos.' });
  }
});

// Crear un evento
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el evento.' });
  }
});

// Actualizar un evento (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el evento.' });
  }
});

// Eliminar un evento
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el evento.' });
  }
});

module.exports = router;
