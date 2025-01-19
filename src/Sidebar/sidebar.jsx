import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph} from "docx";
import "./sidebar.css";
import Topics from "./topics.jsx";

import { jsPDF } from "jspdf";


import { assets } from "../assets/assets.jsx";
import Help from "./help.jsx";
import Settings from "./settings.jsx";
import Article from "../Article.jsx";

const Sidebar = ({ darkness, setDarkness }) => {
    const [extended, setExtended] = useState(false);
    const [helpVisible, setHelpVisible] = useState(false);
    const [settingsVisible, setSettingsVisible] = useState(false);

    const [showAnalysis, setShowAnalysis] = useState(false);

    const [showExport, setShowExport] = useState(false);

    const toggleHelpPopup = () => setHelpVisible((prev) => !prev);
    const toggleSettingsPopup = () => setSettingsVisible((prev) => !prev);


    const toggleExtended = () => {
        setExtended(prev=> !prev);
        if (extended) {
            setShowExport(false);
        }
    }

    const toggleExport = () => {
        setShowExport(prev=> !prev);
    }

    const exportToPdf = () => {
        const doc = new jsPDF();

        // Add a title
        doc.setFontSize(18);
        doc.text("Article Links", 10, 10);

        // Add articles to the PDF
        articles.forEach((article, index) => {
            const y = 20 + index * 10; // Adjust spacing between lines
            doc.setFontSize(12);
            doc.text(`${article.title}: ${article.link}`, 10, y);
        });

        // Save the PDF
        doc.save("ArticlesLinks.pdf");
        console.log("PDF file generated and downloaded.");
    };

    const exportToDocx = () => {
        console.log("Generating DOCX file...");


        const paragraphs = articles.map(
            (article) =>
                new Paragraph({
                    text: `${article.title}: ${article.link}`,
                })
        );

        const doc = new Document({
            sections: [
                { children: paragraphs }
            ]
        });
        // doc.addSection({ children: paragraphs });

        Packer.toBlob(doc)
            .then((blob) => {
                saveAs(blob, "ArticlesLinks.docx");
                console.log("DOCX file generated and downloaded.");
            })
            .catch((error) => {
                console.error("Error generating DOCX file:", error);
                alert("Failed to generate DOCX file. Please try again.");
            });
    };

    return (
        <div className="sidebar" data-theme = {darkness ? "dark" : "light"}>
            <div className="top">
                <img onClick={toggleExtended} className="menu" src={assets.menu_icon} alt="" />
                {extended && <Topics />} {/* Add Topics here */}
                    {extended
                        ? <div className="export"
                        onClick={toggleExport}>
                            <img src={assets.export_icon} alt=""/>
                            <p>Export</p>
                        </div>
                        : null}
                {extended && showExport &&(
                    <div className="export">
                        {["docs", "pdf"].map(option => (
                            <button key={option}
                                    className={"exportOptions"}
                                    onClick={
                                option === "docs"
                                        ? exportToDocx : exportToPdf}
                                >
                                {option}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div
                    className="bottom-item analysis"
                    onClick={toggleHelpPopup}>
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bottom-item analysis"
                     onClick={toggleSettingsPopup}>
                    <img src={assets.gear_icon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>

            {/* Render the Help popup */}
            <Help visible={helpVisible} onClose={toggleHelpPopup} />
            {/* Render the Settings popup */}
            <Settings visible={settingsVisible} darkness = {darkness} setDarkness={setDarkness} onClose={toggleSettingsPopup} />
        </div>
    )
}

export default Sidebar;