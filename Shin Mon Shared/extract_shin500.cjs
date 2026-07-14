const mammoth = require("mammoth");
const fs = require("fs");

async function extractDocx() {
    const file1 = "shin 500 mondai.docx";
    const file2 = "JLPT N2 SHIN 500 MON.docx";

    let result1 = await mammoth.convertToHtml({path: file1});
    fs.writeFileSync("shin500_n3_raw.html", result1.value);

    let result2 = await mammoth.convertToHtml({path: file2});
    fs.writeFileSync("shin500_n2_raw.html", result2.value);

    console.log("Extraction complete!");
}

extractDocx().catch(console.error);
