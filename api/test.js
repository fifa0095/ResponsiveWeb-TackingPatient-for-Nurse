const axios = require("axios");
const getAge = (dob) => {
	const dobDate = new Date(dob);
	const diffMs = Date.now() - dobDate.getTime();
	const ageDate = new Date(diffMs); 
	return Math.abs(ageDate.getUTCFullYear() - 1970);
  };


const handleHNRequest = async (userId, replyToken, messageText) => {
	try {
		// Split the message text by newline to extract HN and DOB
		const [hncodefault, dob] = messageText.split('\n').map(line => line.trim());
		const hnCode = hncodefault.trim().toUpperCase();

		// Prepare the request to the patient controller
		// const patientResponse = await FindPatient({
		// 	query: { HN: hnCode, DOB: dob },
		// });

		const patientResponse = await axios.get('https://icareu-api.vercel.app/api/v1/patient', {
			params: {
			  HN: hnCode,
			  DOB: dob
			}
		  });

		const patientData = patientResponse.data[0];

		if (!patientData) {
			// If no patient found, send a reply indicating this
			return console.log('error not found patientData');
			
		}

		// Get patient records using the record controller
		// const recordsResponse = await GetRecord({ params: { HN: hnCode } });

		const recordsResponse = await axios.get(`https://icareu-api.vercel.app/api/v1/patient/${hnCode}/record`);

		// Process the records and format the response
		if (recordsResponse.data.length > 0) {
			const latestRecord = recordsResponse.data.sort(
				(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
			)[0];

			// Format the food intake string
			const foodIntakeStr = latestRecord.food_intake ? latestRecord.food_intake.join(", ") : " ";
			const age = getAge(patientData.DOB);


			// Prepare the response message
			const latestRecordMessage = `
HN: ${hnCode} DOB: ${patientData.DOB}
${patientData.prefix} ${patientData.name} ${patientData.surname} เพศ${patientData.gender} อายุ ${age}
อาการประจำวันนี้ ${new Date(latestRecord.timestamp).toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}

1. สัญญาณชีพ : ${latestRecord.BT}, ความดันโลหิต: ${latestRecord.BP}, หัวใจเต้นเร็ว: ${latestRecord.HR}, หายใจเร็ว: ${latestRecord.RR}, ค่าออกซิเจน: ${latestRecord.O2sat}
2. อาการเบื้องต้น : รู้สึกตัว: ${latestRecord.conscious}, หายใจ: ${latestRecord.breath_pattern}, กินอาหาร: ${latestRecord.eat_method}  สามารถกิน${ foodIntakeStr || " "} ได้ เกี่ยวกับอาหารเพิ่มเติม: ${latestRecord.extra_food || "ไม่มี"},   ไม่มีอาการแทรกซ้อน: ${latestRecord.extra_symptoms || "ไม่มี"}, นอนหลับดี: ${latestRecord.sleep} , ถ่าย: ${latestRecord.excretion || "ปกติ"}
3. หมายเหตุ:   ${ latestRecord.notes || " ไม่มี"}
            `.trim();


			// Send the formatted message as a response
			// await axios.post(
			// 	"https://api.line.me/v2/bot/message/reply",
			// 	{
			// 		replyToken,
			// 		messages: [{ type: "text", text: latestRecordMessage.trim() }],
			// 	},
			// 	{
			// 		headers: { Authorization: `Bearer ${config.line.channelAccessToken}` },
			// 	}
			// );
            console.log(latestRecordMessage);
		} else {
			// If no records found, inform the user
			const responseMessage = {
				type: "text",
				text: "ไม่พบข้อมูลประวัติการรักษาของผู้ป่วยในระบบค่ะ",
			};
            console.log(responseMessage);
		}
	} catch (error) {
		console.error("Error in handleHNRequest:", error);
    }
};

const text = `NP001
6/1/2560`;

handleHNRequest(1 ,1 , text)