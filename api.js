const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let notifications = [];
let nextId = 1;

// Mendapatkan semua pemberitahuan
app.get('/api/notifications', (req, res) => {
    res.json(notifications);
});

// Menambahkan pemberitahuan baru
app.post('/api/notifications', (req, res) => {
    const { message } = req.body;
    const newNotification = { id: nextId++, message };
    notifications.push(newNotification);
    res.status(201).json(newNotification);
});

// Mengedit pemberitahuan
app.put('/api/notifications/:id', (req, res) => {
    const { id } = req.params;
    const { message } = req.body;
    const notification = notifications.find(n => n.id === parseInt(id));

    if (notification) {
        notification.message = message;
        res.json(notification);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
});

// Menghapus pemberitahuan
app.delete('/api/notifications/:id', (req, res) => {
    const { id } = req.params;
    notifications = notifications.filter(n => n.id !== parseInt(id));
    res.status(204).end();
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app; // Export app untuk digunakan di Vercel
