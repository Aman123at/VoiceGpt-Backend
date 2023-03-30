const { fetchChatWithText } = require("../ApiCalls/chatApi")


module.exports = {
    getChats:(text)=>{
    fetchChatWithText(text)
    .then((response)=>console.log(response))
    .catch((err)=>console.log(err))
}
}