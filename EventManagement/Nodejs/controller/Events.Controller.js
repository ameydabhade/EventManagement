import EventModel from '../Model/Events.model.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

export async function createEvent(req, res) {
    const { title, date, location, image, role } = req.body;

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to create events.' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
    }

    try {
        const newEvent = new EventModel({
            title,
            date,
            location,
            image,
        });

        const savedEvent = await newEvent.save();

        if (!savedEvent) {
            return res.status(400).json({ message: 'Something went wrong while saving event' });
        }

        res.status(201).json(savedEvent);
    } catch (err) {
        console.error('Error saving event:', err);
        res.status(500).json({ message: 'Error saving event', error: err.message });
    }
}

export async function fetchEvents(req, res) {
    try {
        const events = await EventModel.find();
        if (events.length === 0) {
            return res.status(404).json({ message: 'No events found' });
        }

        res.status(200).json(events);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function fetchEventById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Event ID' });
    }

    try {
        const event = await EventModel.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

export async function updateEvent(req, res) {
    const { id } = req.params;
    const { title, date, location, image, role } = req.body;

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to update events.' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Event ID' });
    }

    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(
            id,
            { title, date, location, image },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(updatedEvent);
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ message: 'Error updating event', error: err.message });
    }
}

export async function deleteEvent(req, res) {
    const { id } = req.params;
    const { role } = req.body;

    if (role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: You do not have permission to delete events.' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Event ID' });
    }

    try {
        const deletedEvent = await EventModel.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ message: 'Error deleting event', error: err.message });
    }
}
