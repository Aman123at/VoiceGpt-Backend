require('dotenv').config()

const axios = require('axios')
const headers = {
    'Content-Type':'application/json',
    'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
}

module.exports={

    fetchChatWithText: async(text)=>{
        let data = {
            "model": "gpt-3.5-turbo",
            "messages": [{"role": "user", "content": `${text}`}],
            "temperature": 0.7
          }
        let result = await axios.post('https://api.openai.com/v1/chat/completions',data,{headers:headers})
        return result.data
    }
} 
    