import EventModel from '../Model/Events.model.js';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';

// Create Event Function
export async function createEvent(req, res) {
    const { title, date, location, image } = req.body;

    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Invalid input', errors: errors.array() });
    }

    try {
        // Create a new event
        const newEvent = new EventModel({
            title,
            date,
            location,
            image,
        });

        // Save the new event to the database
        const savedEvent = await newEvent.save();

        if (!savedEvent) {
            return res.status(400).json({ message: 'Something went wrong while saving event' });
        }

        res.status(201).json(savedEvent); // Return the saved event
    } catch (err) {
        console.error('Error saving event:', err);
        res.status(500).json({ message: 'Error saving event', error: err.message });
    }
}

// Fetch All Events
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

// Fetch Single Event by ID
export async function fetchEventById(req, res) {
    const { id } = req.params;

    // Validate the id to ensure it's a valid ObjectId
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

// Update Event
export async function updateEvent(req, res) {
    const { id } = req.params;
    const { title, date, location, image } = req.body;

    // Validate the id to ensure it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Event ID' });
    }

    try {
        // Update the event by ID
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

// Delete Event
export async function deleteEvent(req, res) {
    const { id } = req.params;

    // Validate the id to ensure it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid Event ID' });
    }

    try {
        // Delete the event by ID
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
