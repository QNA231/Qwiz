import { useEffect, useState } from "react";

const Quiz = () => {
    const [questionBuffer, setQuestionBuffer] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [userAnswer, setUserAnswer] = useState([]);

    const API_URL = "https://opentdb.com/api.php?amount=50";

    // Định dạng câu hỏi
    const formatQuestion = (questionObject) => {
        const allAnswers = [
            questionObject.correct_answer,
            ...questionObject.incorrect_answers
        ].sort(() => Math.random() - 0.5); // xáo trộn đáp án
        return {
            ...questionObject,
            all_answers: allAnswers,
        };
    };

    // Fetch API một lần
    const fetchQues = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

            const data = await response.json();
            if (data.response_code !== 0) throw new Error(`API Error Code: ${data.response_code}`);

            const formattedQuestions = data.results.map(formatQuestion);
            setQuestionBuffer(formattedQuestions);
            setUserAnswer(Array(formattedQuestions.length).fill(null)); // tạo mảng câu trả lời
            setCurrentQuestion(formattedQuestions[0]);
        } catch (error) {
            console.error("Lỗi truy xuất câu hỏi:", error.message);
        }
    };

    useEffect(() => {
        fetchQues();
    }, []);

    // Chuyển sang câu tiếp theo
    const goNext = () => {
        if (currentQuestionIndex < questionBuffer.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex);
            setCurrentQuestion(questionBuffer[nextIndex]);
            setSelectedOption(userAnswer[nextIndex]);
        }
    };

    // Quay lại câu trước
    const goBack = () => {
        if (currentQuestionIndex > 0) {
            const prevIndex = currentQuestionIndex - 1;
            setCurrentQuestionIndex(prevIndex);
            setCurrentQuestion(questionBuffer[prevIndex]);
            setSelectedOption(userAnswer[prevIndex]);
        }
    };

    const handleAnswerClick = (selectedAnswer) => {
        setSelectedOption(selectedAnswer);
        const newUserAnswer = [...userAnswer];
        newUserAnswer[currentQuestionIndex] = selectedAnswer;
        setUserAnswer(newUserAnswer);
    };

    if (!currentQuestion) {
        return <div>Đang tải câu hỏi...</div>;
    }

    return (
        <div className="quiz-container">
            <h2>Câu {currentQuestionIndex + 1}</h2>
            <p className="question">{currentQuestion.question}</p>

            {currentQuestion.all_answers.map((answer, index) => (
                <button
                    key={index}
                    className={`option ${selectedOption === answer ? 'selected' : ''}`}
                    onClick={() => handleAnswerClick(answer)}
                    disabled={!!selectedOption && selectedOption !== answer}
                >
                    <span>{String.fromCharCode(65 + index)}. </span>
                    {answer}
                </button>
            ))}

            {selectedOption && (
                <p className={selectedOption === currentQuestion.correct_answer ? "correct-answer" : "incorrect-answer"}>
                    {selectedOption === currentQuestion.correct_answer ? "Đáp án đúng" : "Đáp án sai"}
                </p>
            )}

            <div className="nav-buttons">
                <button onClick={goBack} disabled={currentQuestionIndex === 0}>Quay lại</button>
                <button onClick={goNext} disabled={currentQuestionIndex === questionBuffer.length - 1}>Tiếp theo</button>
            </div>
        </div>
    );
};

export default Quiz;
