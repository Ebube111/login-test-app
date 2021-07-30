import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

const Form = styled.form`
  border: 1px solid red;
  width: 500px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FormItem = styled.div`
  margin: 10px 0;
`;

const Button = styled.div`
  width: 100px;
  height: 30px;
  margin-left: 110px;
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
`;
export const ValidateInput = (str = " ") => str.includes("@");

function App() {
  const [formData, setFormData] = useState({});

  const handleOnChange = ({ target: { name, value } }) =>
    setFormData(prev => ({ ...prev, [name]: value }));

  const handleSubmit = async () => {
    const response = await fetch("https://dummyapi.io/data/api/");
    try {
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="App">
      <div className="App-header">
        <Form name="login-form" onSubmit={handleSubmit}>
          <FormItem>
            <label htmlFor="email">Email: </label>
            <input id="email" name="email" onChange={handleOnChange} />
          </FormItem>
          {formData.email && !ValidateInput(formData.email) ? (
            <Error>Email not valid</Error>
          ) : null}
          <FormItem>
            <label htmlFor="password">Password: </label>
            <input id="password" name="password" onChange={handleOnChange} />
          </FormItem>
          <Button role="button" onClick={handleSubmit}>
            submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
