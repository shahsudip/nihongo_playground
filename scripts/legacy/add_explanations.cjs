const fs = require('fs');

const path = 'src/data/somatome_week1_day1.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Add explanations for practice
data.practice.options_explanation = {
    1: "Correct. The girl states 'Today is the 3rd Monday...' and the boy replies 'When the 3rd Monday is a national holiday, the next day is closed.' This confirms today is a holiday.",
    2: "Incorrect. The boy says 'No, it is open' (ううん、開いてるよ).",
    3: "Incorrect. The boy corrects the girl about the holiday rule, so he is well aware of the date.",
    4: "Correct. The girl says 'Oh? Isn't it closed today because it's the 3rd Monday?' (え？今日は第3月曜日だから休みなんじゃないの？).",
    5: "Incorrect. Tomorrow is Tuesday and it will be closed (火曜日が休館), so it will not be open."
};

// Add explanations for mondai questions
data.mondai.questions[0].explanation = "The library is closed from Oct 1 to Oct 10 due to electrical work (10月1日より10日まで電気工事のために臨時で休館します). Therefore, Option 4 (Oct 10th from noon to 2pm) is a time when the library cannot be used.";

data.mondai.questions[1].explanation = "The notice says 'from Oct 1 to Oct 10, it will be temporarily closed' (臨時で休館します). This matches Option 4: 'In addition to regular holidays, there are days when the library is temporarily closed' (休館日以外にも臨時で休む日がある).";

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log("Explanations added successfully!");
