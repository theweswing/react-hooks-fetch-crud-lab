import React, {useState,useEffect} from "react";

function QuestionItem({ question, activeQuestions, setActiveQuestions }) {
  const { id, prompt, answers, correctIndex } = question;
  const [selectedIndex,setSelectedIndex]=useState(correctIndex)

  function handleChange(e){
    setSelectedIndex(e.target.value)
    console.log(e.target.balue)
    fetch( `http://localhost:3000/questions/${id}`,{
      method: "PATCH",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(
        {
          "correctIndex":parseInt(e.target.value)
        }
      )
    })
  }

  function handleDelete(e){
    const questionsMinusDeleted = [...activeQuestions].filter((givenQuestion) => {
      return givenQuestion.id !== id
    })
    setActiveQuestions(questionsMinusDeleted)
    fetch(`http://localhost:3000/questions/${id}`,{
      method: "DELETE",
    })
    .then((r) => r.json())
    .then((data) => console.log(data))
  }

  function handleUpdate(e){

  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
