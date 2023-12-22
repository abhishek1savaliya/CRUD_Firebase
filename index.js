const express = require('express');
const cors = require('cors');
const User = require('./config');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/create', async (req, res) => {
    const data = req.body;

    await User.add(data);
    res.send({ msg: "User Added" });
});

app.get('/users', async (req, res) => {
    const data = await User.get();
    const userList = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    
    res.json({ msg: "Users Retrieved", data: userList, totalUser: userList.length });
});

app.put('/update', async (req, res) => {
    const id = req.body.id;
    delete req.body.id;

    await User.doc(id).update(req.body);

    res.json({ msg: "User updated successfully" });
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await User.doc(id).delete();

    res.json({ message: "User deleted successfully" });
});

app.listen(4000, () => {
    console.log('Server is running on PORT 4000');
});
