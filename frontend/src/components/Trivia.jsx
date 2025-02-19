import React, { useState, useEffect } from 'react';
import Load from './Load';
import axios from 'axios';
import '../styles/trivia.css';

const Trivia = () => {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [finalScore, setFinalScore] = useState(false);
    const [error, setError] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(""); 

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/trivia/questions')
            .then((res) => {
                const transformedQuestions = res.data.map((question) => {
                    const choices = [
                        question.choice_a,
                        question.choice_b,
                        question.choice_c,
                        question.choice_d
                    ].filter(choice => choice !== null);

                    // Shuffle choices before returning the question object
                    const shuffledChoices = randomizeQuestions(choices);

                    // Set the correct answer text directly
                    const correctAnswerText = question.correct_answer;

                    return {
                        ...question,
                        choices: shuffledChoices,
                        correct_answer: correctAnswerText // Store the correct answer text (not index)
                    };
                });

                const randomQuestions = randomizeQuestions(transformedQuestions);
                setQuestions(randomQuestions);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching data: ", err);
                setError(err);
                setLoading(false);
            });
    }, []);

    // Shuffle the questions
    const randomizeQuestions = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleAnswer = (answer) => {
        const correctAnswer = questions[currentQuestion]?.correct_answer;  // Use optional chaining to avoid errors if currentQuestion is undefined

        if (!correctAnswer) return;  // Safeguard for undefined correctAnswer

        // Check if the user's answer matches the correct one
        if (answer === correctAnswer) {
            setScore(score + 1);
            setFeedbackMessage("Correct!");
        } else {
            setFeedbackMessage(`Wrong! The correct answer is: ${correctAnswer}`);
        }

        setUserAnswer(answer);

        setTimeout(() => {
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
                setUserAnswer(null);
                setFeedbackMessage("");
            } else {
                setFinalScore(true);
            }
        }, 2000);
    };

    // Handle user input for text-based questions
    const handleInputAnswer = (inputAnswer) => {
        const correctAnswer = questions[currentQuestion]?.correct_answer;

        if (!correctAnswer) return;

        if (inputAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim()) {
            setScore(score + 1);
            setFeedbackMessage("Correct!");
        } else {
            setFeedbackMessage(`Wrong! The correct answer is: ${correctAnswer}`);
        }

        setUserAnswer(inputAnswer);

        setTimeout(() => {
            if (currentQuestion + 1 < questions.length) {
                setCurrentQuestion(currentQuestion + 1);
                setUserAnswer(null);
                setFeedbackMessage("");
            } else {
                setFinalScore(true);
            }
        }, 2000);  // Time out after 2 seconds for the message to show
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // when quiz is done, user can restart the quiz
    if (finalScore) {
        return (
            <div className="trivia-container">
                <div className="score-container">
                    <h2>Your Score: {score} out of {questions.length}</h2>
                    <button onClick={() => {
                        // Reset all the relevant state variables
                        setCurrentQuestion(0);
                        setUserAnswer(null);
                        setScore(0);
                        setFinalScore(false);
                        setFeedbackMessage("");
                    }}>
                        Restart Quiz
                    </button>
                </div>
            </div>
        );
    }

    // If there are no questions or the questions are still loading
    if (loading) {
        return <Load />;
    }

    const question = questions[currentQuestion];
    const choices = question.choices || [];

    return (
        <section className="trivia-container">
            <h1>Welcome to Bible Trivia</h1>
            <div className="trivia-section">            
                <h3>{question.question}</h3>

                {/* Check if the question has multiple-choice options */}
                {choices.length > 0 ? (
                    <div>
                        {choices.map((choice, index) => {
                            const labels = ['A:', 'B:', 'C:', 'D:']; // Labels for the multiple choices
                            const buttonLabel = `${labels[index]} ${choice}`;

                            let buttonClass = "";
                            if (userAnswer) {
                                if (choice === question.correct_answer) {
                                    buttonClass = "correct";
                                } else if (choice === userAnswer && choice !== question.correct_answer) {
                                    buttonClass = "wrong";
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(choice)}
                                    className={buttonClass}
                                    disabled={userAnswer !== null} // Makes sure user cannot press on another answer once the 1st is clicked
                                >
                                    {buttonLabel}
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    // If it's a text-based question, show an input field
                    <div>
                        <input
                            type="text"
                            value={userAnswer || ""}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Type your answer"
                        />
                        <button onClick={() => handleInputAnswer(userAnswer)} disabled={!userAnswer}>
                            Submit Answer
                        </button>
                    </div>
                )}

                {feedbackMessage && <div className="feedback-message">{feedbackMessage}</div>}
            </div>
        </section>
    );
};

export default Trivia;
