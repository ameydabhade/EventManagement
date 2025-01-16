import UserModel from '../Model/Users.model.js';

export function createUser(req, res) {
    const { Name, Email, Password } = req.body;

    // Log the incoming request data for debugging
    console.log('Request Body:', req.body);

    const newUser = new UserModel({
        Name,
        Email,
        Password,
    });

    // Try saving the user and handle the response
    newUser.save()
        .then((data) => {
            // Log the saved data to see what's being returned
            console.log('Saved Data:', data);

            if (!data) {
                return res.status(400).json({ message: 'Something Went Wrong' });
            }
            // Return the saved user data as response
            res.status(201).json(data);
        })
        .catch((err) => {
            // Log the error message for debugging
            console.error('Error Saving User:', err);

            // Send a response with the error
            res.status(500).json({ message: 'Error saving user', error: err.message });
        });
}
