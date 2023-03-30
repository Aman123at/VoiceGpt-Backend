require('dotenv').config()

const axios = require('axios')
const headers = {
    'Content-Type':'application/json',
    'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`
}

module.exports={

    fetchImage: async(text)=>{
        let data = {
            "prompt": text,
            "n": 1,
            "size": "256x256"
          }
        let result = await axios.post('https://api.openai.com/v1/images/generations',data,{headers:headers})
        return result.data
    }
} 
    