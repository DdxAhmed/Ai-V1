const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// تأكد أن المفتاح يبدأ بـ gsk_ ولا يوجد قبله أو بعده مسافات أو حروف عربي
const API_KEY = process.env.API_KEY; // كدا السيرفر هيدور على المفتاح في إعدادات ريندر مش في الكود
app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
            model: "llama-3.3-70b-versatile",
            messages: req.body.messages
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'حدث خطأ في الاتصال بالسيرفر' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});