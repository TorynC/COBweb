import {createContext, useState} from "react"
import runChat from "../api_calls/Gemini.jsx"
import Article from "../Article.jsx";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [root, setRoot] = useState(null);

    const onSent = async () => {

        setResultData("");
        setLoading(true);
        setShowResult(true);

        const template = "Follow the following instructions exactly. The prompt in quotes is written by a user" +
            ". That prompt will contain some relevant topic or issue, or a link to an article. If the prompt" +
            " is a topic, you must return your output in the following output exactly. NOTE: " +
            "YOU MUST FIND A LINK TO AN ARTICLE RELATED TO THE TOPIC AND INCLUDE IT:\n" +
            "UP TO FIVE WORDS SUMMARIZING THE TOPIC, A LINK TO AN ARTICLE RELEVANT TO THE TOPIC\n" +
            "If the user inputs a link to an article return the following output exactly:\n" +
            "UP TO FIVE WORDS SUMMARIZING THE TOPIC OF THE ARTICLE, THE LINK TO THE ARTICLE\n" +
            "If you can not access the article return this output:\n" +
            "ERROR\n Always follow these insctructions in your output\n \"" + input + "\"";

        const response = await runChat(template);
        console.log(response);
        const topic = response.split(",")[0];
        const link = response.split(",")[1];
        setResultData(response);
        setLoading(false);
        setInput("");
        setRoot(new Article(topic, link, "zzz"));
    }

    const makeRoot = async () => {

    }

    const contextValue = {
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        root,
        setRoot
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;