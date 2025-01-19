import {createContext, useContext, useState} from "react"
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
    const [topic, setTopic] = useState("");
    const [adjacent, setAdjacent] = useState("");
    const [newNode, setNewNode] = useState(0);
    const [nodes, setNodes] = useState(0);
    const [oldId, setOldId] = useState(null);
    const [error, setError] = useState(false);

    const onSent = async (type) => {

        setResultData("");
        setLoading(true);
        setShowResult(true);
        var template = "";
        if (type == 0) {
            template = "Follow the following instructions exactly. Make sure you capitalize the first letter of each" +
                "output. The prompt in quotes is written by a user" +
                ". That prompt will contain some relevant topic or issue, or a link to an article. If the prompt" +
                " is a topic, you must return your output in the following output exactly. Make sure" +
                "this is a real article link by visiting it and ensuring it is not a 404 error. :\n" +
                "UP TO FIVE WORDS SUMMARIZING THE TOPIC, A HYPERLINK TO AN ARTICLE RELEVANT TO THE TOPIC," +
                " UP TO FIVE WORDS SUMMARIZING AN ADJACENT BUT STILL DISTINCT TOPIC\n" +
                "\"If you can not find any adjacent article at all DO NOT RETURN \"No Link \", or " +
                "\"not found\" instead, return this output exactly:\n" +
                "ERROR\\n" +
                "For example if the input is Electric vehicles a potential output could be \"" +
                "Electric vehicles, https://www.cnn.com/interactive/2019/08/business/electric-cars-audi-volkswagen-tesla/," +
                "Climate change\"" +
                "If the user inputs a link to an article return the following output exactly:\n" +
                "UP TO FIVE WORDS SUMMARIZING THE TOPIC OF THE ARTICLE, THE LINK TO THE ARTICLE, " +
                "UP TO FIVE WORDS SUMMARIZING AN ADJACENT BUT STILL DISTINCT TOPIC\n" +
                "If you can not access the article return this output:\n" +
                "ERROR\n Always follow these insctructions in your output\n \"" + input + "\"";
        } else if (type == 1){
            template = "Follow the following instructions exactly. Make sure you capitalize the first letter of each" +
                "output. The prompt in quotes is written by a user" +
                ". That prompt will contain some relevant topic or issue. Make sure" +
                "this is a real article link by visiting it and ensuring it is not a 404 error. You must return your output in the following" +
                " output exactly.:\n" +
                "THE ORIGINAL PROMPT, A HYPERLINK TO AN ARTICLE RELATED TO THE TOPIC BUT NOT NECESSARILY THE SAME TOPIC OR SOURCE," +
                " UP TO FIVE WORDS SUMMARIZING AN ADJACENT BUT STILL DISTINCT TOPIC\n" +
                "For example if the input is Electric vehicles a potential output could be \"" +
                "Electric vehicles, https://www.cnn.com/interactive/2019/08/business/electric-cars-audi-volkswagen-tesla/," +
                "Climate change\"" +
                "\"If you can not find any adjacent article at all DO NOT RETURN \"No Link \", or " +
                "\"not found\" instead, return this output exactly:\n" +
                "ERROR\n Always follow these instructions in your output\n \"" + topic + "\"";
        } else if (type == 2){
            template = "Follow the following instructions exactly. Make sure you capitalize the first letter of each" +
                "output. The prompt in quotes is written by a user" +
                ". Make sure" +
                "this is a real article link by visiting it and ensuring it is not a 404 error. That prompt will contain some relevant topic or issue. You must return your output in the following" +
                " output. :\n" +
                "THE ORIGINAL PROMPT, A HYPERLINK TO AN ARTICLE RELATED TO THE TOPIC BUT NOT NECESSARILY THE SAME TOPIC OR SOURCE," +
                " UP TO FIVE WORDS SUMMARIZING AN ADJACENT BUT STILL DISTINCT TOPIC\n" +
                "For example if the input is Electric vehicles a potential output could be \"" +
                "Electric vehicles, https://www.cnn.com/interactive/2019/08/business/electric-cars-audi-volkswagen-tesla/," +
                "Climate change\"" +
                "\"If you can not find any adjacent article at all DO NOT RETURN \"No Link \", or " +
                "\"not found\" instead, return this output exactly:\n" +
                "ERROR\n Always follow these insctructions in your output\n \"" + adjacent + "\"";
        }

        const response = await runChat(template);
        console.log(response);
        if ((response + "").trim("\"").trim() != "ERROR" ||
            (response + "").trim("\"").trim().split(5) != "Okay,"){
            const link = response.split(",")[1];
            if ((link + "").trim("\"").trim() != "ERROR") {
                const topic = response.split(",")[0];
                const adjacent = response.split(",")[2];
                setResultData(response);
                setInput("Complete");
                setTopic(topic);
                setAdjacent(adjacent);
                if (root) {
                    setOldId(root.id);
                }
                setNodes(nodes + 1);
                setRoot(new Article(topic, link, 10, adjacent, nodes + 1));
                if (type != 0){
                    setNewNode(newNode + 1);
                }
            } else{
                setError(true);
            }
        } else {
            setError(true);
        }
        setLoading(false);
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
        setRoot,
        newNode,
        setNewNode,
        nodes,
        setNodes,
        oldId,
        setOldId,
        error,
        setError
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;