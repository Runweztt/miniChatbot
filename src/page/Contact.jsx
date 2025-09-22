
import { useEffect, useRef, useState } from "react";
import Chatboticon from "../Components/Chatboticon";
import Chatform from "../Components/Chatform";
import "./Chatbot.css"
import Chatmessage from "../Components/Chatmessage";
import { companyInfo } from "../Companyinfo";

const Contact = () => {

    const [ChatHistory,  setChatHistory] = useState([{
      hideInChat:true,
      role: "model",
      text: companyInfo
    }])
    const [showBot, setShowBot] =useState(false)
    const chatbodymove = useRef();

   
    const generateBot = async(history)=>{
       // help function to update chat history
      const updateHistory = (text)=>{
        setChatHistory(prev => [...prev.filter(msg => msg.text !== "thinking..."), {role:"model", text}])
      }
      // format chat history for api request
      history=history.map(({role,text}) => ({role, parts: [{text}]}))
      
      const requestData ={
        method: "post",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify({contents: history})

      }
       try {
        // making the api call to get the bot response
        const response = await fetch(import.meta.env.VITE_API_URL, requestData);
        const data = await response.json();
           
        // clean and update chat history with bot response
        if(!response.ok) throw new Error(data.error.message || "something went wrong")
          const apiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();

          updateHistory(apiResponse)

       } catch (error) {
          console.log(error)
       }

    }

  useEffect(()=>{
    //  auto scroll
   chatbodymove.current.scrollTo({top: chatbodymove.current.scrollHeight, behavior: "smooth"})
  },[ChatHistory])



  return (
    <div className={`container ${showBot ? "show-chatbot" : ""}`}>

      <button onClick={() => setShowBot(prev => !prev)} id="chat-toggler">
  <span className="material-symbols-rounded">
    {showBot ? "close" : "mode_comment"}
  </span>
</button>



      <div className="chatbot-popup">
        {/* chatbot header  */}
        <div className="chat-header">
          <div className="header-info">
            <Chatboticon />
            <h2 className="logo-text">chatbot</h2>
          </div>
          <button className="material-symbols-rounded">
            keyboard_arrow_down{" "}
          </button>
        </div>
        {/* chat body */}
        <div ref={chatbodymove} className="chat-body">
          <div className="message bot-message">
            <Chatboticon />
            <p className="message-text">
              hey there <br /> how can i help you today?
            </p>
          </div>
          {/* render the chat dynamically */}
              {ChatHistory.map((chat, index)=>(
                <Chatmessage key={index} chat={chat}/>
              ))}
        
        </div>
        {/* chat footer */}
        <div className="chat-footer">
          <Chatform ChatHistory={ChatHistory} setChatHistory={setChatHistory}  generateBot={generateBot}/>
        
        </div>
      </div>
    </div>
  );
};

export default Contact;
