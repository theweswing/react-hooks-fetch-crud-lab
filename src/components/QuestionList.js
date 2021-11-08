import React, {useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [allQuestions,setAllQuestions]=useState("")
  const [activeQuestions,setActiveQuestions]=useState("")

  useEffect(() => {
    fetch('http://localhost:3000/questions')
    .then((r) => r.json())
    .then((data) => setActiveQuestions(data))
  },[])

  useEffect(() => {
    fetch('http://localhost:3000/questions')
    .then((r) => r.json())
    .then((data) => setAllQuestions(data))
  },[])

  function displayQuestions(){
    const displayedQuestions = [...activeQuestions].map((givenQuestion) => {
      return <QuestionItem question={givenQuestion} activeQuestions={activeQuestions} setActiveQuestions={setActiveQuestions} />
    })
    return displayedQuestions
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{displayQuestions()}</ul>
    </section>
  );
}

export default QuestionList;
