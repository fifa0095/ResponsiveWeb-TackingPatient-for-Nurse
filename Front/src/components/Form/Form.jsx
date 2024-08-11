import React, { useState, useEffect } from "react";
import "./Form.css";

const Form = () => {
  const [patientData, setPatientData] = useState({
    HN: "",
    BT: "",
    BP: "",
    HR: "",
    RR: "",
    O2sat: "",
    conscious: "",
    breath_pattern: "",
    extra_symptoms: "",
    eat_method: "",
    food_type: "",
    extra_food: "",
    food_intake: [],
    sleep: "",
    excretion: "",
    notes: "",
  });

  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (patientData.HN.length === 7) {
      fetchPatientData();
    }
  }, [patientData.HN]);

  const fetchPatientData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/patients/get?HN=${patientData.HN}`);
      if (response.ok) {
        const data = await response.json();
        setPatientData({
          ...patientData,
          ...data,
        });
      } else {
        console.error("Failed to fetch patient data");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value
    });
  };

  const handleFoodIntakeChange = (e) => {
    const options = e.target.options;
    const selectedOptions = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setPatientData({
      ...patientData,
      food_intake: selectedOptions
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/patients/record", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmittedData(result);
        alert("Record submitted successfully!");
      } else {
        console.error("Failed to submit record");
      }
    } catch (error) {
      console.error("Error submitting record:", error);
    }
  };

  return (
    <section className="container-form">
      <header>บันทึกอาการรายวัน ประจำวันที่ {new Date().toLocaleDateString()}</header>

      <form className="form" onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Hospital Number (HN)</label>
          <input 
            type="text" 
            name="HN"
            placeholder="Enter hospital number" 
            value={patientData.HN} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        {/* Other input fields remain the same */}
        <div className="column">
        <fieldset className="input-box">
          <legend>ส่วนที่ 1: สัญญาณชีพ</legend>
          <label>BT (อุณหภูมิ)</label>
          <div className="column">
            <label><input type="radio" name="BT" value="ไม่มีไข้" onChange={handleInputChange} checked={patientData.BT === "ไม่มีไข้"} /> ไม่มีไข้</label>
            <label><input type="radio" name="BT" value="ไข้ต่ำ" onChange={handleInputChange} checked={patientData.BT === "ไข้ต่ำ"} /> ไข้ต่ำ</label>
            <label><input type="radio" name="BT" value="ไข้สูง" onChange={handleInputChange} checked={patientData.BT === "ไข้สูง"} /> ไข้สูง</label>
          </div>

          <label>BP (ความดันโลหิต)</label>
          <div className="column">
            <label><input type="radio" name="BP" value="ปกติ" onChange={handleInputChange} checked={patientData.BP === "ปกติ"} /> ปกติ</label>
            <label><input type="radio" name="BP" value="ต่ำ" onChange={handleInputChange} checked={patientData.BP === "ต่ำ"} /> ต่ำ</label>
            <label><input type="radio" name="BP" value="สูง" onChange={handleInputChange} checked={patientData.BP === "สูง"} /> สูง</label>
          </div>

          <label>HR (อัตราการเต้นของหัวใจ)</label>
          <div className="column">
            <label><input type="radio" name="HR" value="ปกติ" onChange={handleInputChange} checked={patientData.HR === "ปกติ"} /> ปกติ</label>
            <label><input type="radio" name="HR" value="ช้า" onChange={handleInputChange} checked={patientData.HR === "ช้า"} /> ช้า</label>
            <label><input type="radio" name="HR" value="เร็ว" onChange={handleInputChange} checked={patientData.HR === "เร็ว"} /> เร็ว</label>
          </div>

          <label>RR (อัตราการหายใจ)</label>
          <div className="column">
            <label><input type="radio" name="RR" value="ปกติ" onChange={handleInputChange} checked={patientData.RR === "ปกติ"} /> ปกติ</label>
            <label><input type="radio" name="RR" value="ช้า" onChange={handleInputChange} checked={patientData.RR === "ช้า"} /> ช้า</label>
            <label><input type="radio" name="RR" value="เร็ว" onChange={handleInputChange} checked={patientData.RR === "เร็ว"} /> เร็ว</label>
          </div>

          <label>O2sat (ค่าออกซิเจนในเลือด)</label>
          <div className="column">
            <div>----</div>
            <label><input type="radio" name="O2sat" value="ปกติ" onChange={handleInputChange} checked={patientData.O2sat === "ปกติ"} /> ปกติ</label>
            <label><input type="radio" name="O2sat" value="ต่ำ" onChange={handleInputChange} checked={patientData.O2sat === "ต่ำ"} /> ต่ำ</label>
          </div>
        </fieldset>

        <fieldset className="input-box">
          <legend>ส่วนที่ 2: อาการเบื้องต้น</legend>
          <label>ระดับความรู้สึกตัว</label>
          <div className="column">
            <label><input type="radio" name="conscious" value="ตื่น รู้สึกตัวดี" onChange={handleInputChange} checked={patientData.conscious === "ตื่น รู้สึกตัวดี"} /> ตื่น รู้สึกตัวดี</label>
            <label><input type="radio" name="conscious" value="หลับ" onChange={handleInputChange} checked={patientData.conscious === "หลับ"} /> หลับ</label>
            <label><input type="radio" name="conscious" value="ซึม" onChange={handleInputChange} checked={patientData.conscious === "ซึม"} /> ซึม</label>
            <label><input type="radio" name="conscious" value="สับสน" onChange={handleInputChange} checked={patientData.conscious === "สับสน"} /> สับสน</label>
            <label><input type="radio" name="conscious" value="ไม่รู้สึกตัว" onChange={handleInputChange} checked={patientData.conscious === "ไม่รู้สึกตัว"} /> ไม่รู้สึกตัว</label>
          </div>

          <label>ลักษณะการหายใจ</label>
          <div className="column">
            <label><input type="radio" name="breath_pattern" value="หายใจปกติ" onChange={handleInputChange} checked={patientData.breath_pattern === "หายใจปกติ"} /> หายใจปกติ</label>
            <label><input type="radio" name="breath_pattern" value="หายใจช้า" onChange={handleInputChange} checked={patientData.breath_pattern === "หายใจช้า"} /> หายใจช้า</label>
            <label><input type="radio" name="breath_pattern" value="หายใจเร็ว หายใจหอบเหนื่อย" onChange={handleInputChange} checked={patientData.breath_pattern === "หายใจเร็ว หายใจหอบเหนื่อย"} /> หายใจเร็ว หายใจหอบเหนื่อย</label>
          </div>

          <label>อาการเบื้องต้น (เพิ่มอาการอื่นๆ)</label>
          <input 
            type="text" 
            name="extra_symptoms"
            placeholder="กรุณาอธิบายอาการเพิ่มเติม" 
            value={patientData.extra_symptoms} 
            onChange={handleInputChange} 
          />
        </fieldset>
        </div>

        <fieldset className="input-box">
          <legend>รูปแบบการรับประทานอาหาร</legend>
          <label>วิธีการรับประทานอาหาร</label>
          <div>
            <label><input type="radio" name="eat_method" value="รับประทานเอง" onChange={handleInputChange} checked={patientData.eat_method === "รับประทานเอง"} /> รับประทานเอง</label>
            <label><input type="radio" name="eat_method" value="ต้องการความช่วยเหลือ" onChange={handleInputChange} checked={patientData.eat_method === "ต้องการความช่วยเหลือ"} /> ต้องการความช่วยเหลือ</label>
          </div>

          <label>ชนิดอาหาร</label>
          <div>
            <label><input type="radio" name="food_type" value="ปกติ" onChange={handleInputChange} checked={patientData.food_type === "ปกติ"} /> ปกติ</label>
            <label><input type="radio" name="food_type" value="อาหารอ่อน" onChange={handleInputChange} checked={patientData.food_type === "อาหารอ่อน"} /> อาหารอ่อน</label>
            <label><input type="radio" name="food_type" value="อาหารทางสายยาง" onChange={handleInputChange} checked={patientData.food_type === "อาหารทางสายยาง"} /> อาหารทางสายยาง</label>
          </div>

          <label>ปริมาณอาหาร</label>
          <select 
            name="food_intake" 
            multiple 
            value={patientData.food_intake} 
            onChange={handleFoodIntakeChange}
          >
            <option value="ทานได้ตามปกติ">ทานได้ตามปกติ</option>
            <option value="ทานได้น้อย">ทานได้น้อย</option>
            <option value="ทานไม่ได้">ทานไม่ได้</option>
            <option value="รับประทานอาหารทางสายยาง">รับประทานอาหารทางสายยาง</option>
          </select>

          <label>รายละเอียดเพิ่มเติม</label>
          <input 
            type="text" 
            name="extra_food"
            placeholder="กรุณาอธิบายรายละเอียดเพิ่มเติม" 
            value={patientData.extra_food} 
            onChange={handleInputChange} 
          />
        </fieldset>

        <fieldset className="input-box">
          <legend>ส่วนที่ 3: การนอนหลับและการขับถ่าย</legend>
          <label>การนอนหลับ</label>
          <div className="column">
            <label><input type="radio" name="sleep" value="หลับปกติ" onChange={handleInputChange} checked={patientData.sleep === "หลับปกติ"} /> หลับปกติ</label>
            <label><input type="radio" name="sleep" value="หลับๆ ตื่นๆ" onChange={handleInputChange} checked={patientData.sleep === "หลับๆ ตื่นๆ"} /> หลับๆ ตื่นๆ</label>
            <label><input type="radio" name="sleep" value="นอนไม่หลับ" onChange={handleInputChange} checked={patientData.sleep === "นอนไม่หลับ"} /> นอนไม่หลับ</label>
          </div>

          <label>การขับถ่าย</label>
          <div className="column">
            <label><input type="radio" name="excretion" value="ขับถ่ายปกติ" onChange={handleInputChange} checked={patientData.excretion === "ขับถ่ายปกติ"} /> ขับถ่ายปกติ</label>
            <label><input type="radio" name="excretion" value="ขับถ่ายน้อยกว่าปกติ" onChange={handleInputChange} checked={patientData.excretion === "ขับถ่ายน้อยกว่าปกติ"} /> ขับถ่ายน้อยกว่าปกติ</label>
            <label><input type="radio" name="excretion" value="ท้องผูก" onChange={handleInputChange} checked={patientData.excretion === "ท้องผูก"} /> ท้องผูก</label>
          </div>
        </fieldset>

        <fieldset className="input-box">
          <legend>หมายเหตุ</legend>
          <textarea 
            name="notes" 
            placeholder="กรอกหมายเหตุเพิ่มเติม (ถ้ามี)" 
            value={patientData.notes} 
            onChange={handleInputChange}
          />
        </fieldset>
        
        <button type="submit">บันทึก</button>
      </form>

      {submittedData && (
        <section className="submitted-data">
          <header>ข้อมูลที่บันทึก</header>
          <table className="submitted-table">
            <tbody>
              {Object.keys(submittedData).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{submittedData[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </section>
  );
};

export default Form;
