import React from "react";
import axios from "axios";
import "./sms.css";

export default function SendSms() {
  const [number, setNumber] = React.useState(null);
  const [msg, setMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  function createMsg() {
    setLoading(true);
    axios
      .post("http://localhost:8000/api/messages", { number, msg })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="container">
      <h1>AEMABIT MSG</h1>
      <div className="wrapper-field">
        <h3>Enjoy feel free to send a Msg!</h3>
        <div className="field">
          <label>Add Phone Number</label>
          <input
            className="input"
            type="text"
            onChange={event => setNumber(event.target.value)}
            placeholder="+1123456789"
          />
        </div>
        <div className="field">
          <label>Write the content Msg!</label>
          <textarea
            className="text-area"
            type="textarea"
            onChange={event => setMsg(event.target.value)}
            placeholder="Text Here!"
          />
        </div>
      </div>
      <button
        disabled={loading || !msg.trim() || !number}
        className="submit"
        onClick={createMsg}
      >
        Submit
      </button>
    </div>
  );
}
