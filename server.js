
const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const uri = "mongodb+srv://SahalShaikh:<db_password>@cluster0.mjrq6ti.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.set('view engine', 'ejs');

// 🔥 This is crucial for parsing form data
app.use(express.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://SahalShaikh:Sahal%402212@cluster0.mjrq6ti.mongodb.net/demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});
const User = mongoose.model('User', userSchema);



app.get('/', (req, res) => {
    res.render('index');
});

app.post('/new', (req, res) => {
    const userInput = req.body.userText; // 💡 Make sure 'userText' matches the input's name
    console.log('User Input:', userInput);
    res.render('new-page', { text: userInput });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newUser = new User({ name, email, message });
    await newUser.save();
    res.render('success', { name });
  } catch (err) {
    console.error('❌ Save error:', err);
    res.status(500).send('Something went wrong!');
  }
});
