import { useEffect, useState } from "react";

const Quiz = () => {
    const [questionBuffer, setQuestionBuffer] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [selectedOption, setSelectedOption] = useState();
    const [userAnswer, setUserAnswer] = useState(Array.from({ length: questionBuffer.length }));

    // Hàm chuẩn bị dữ liệu cho việc hiển thị
    const formatQuestion = (questionObject) => {
        const allAnswers = [
            questionObject.correct_answer,
            ...questionObject.incorrect_answers
        ];
        return {
            ...questionObject,
            all_answers: allAnswers,
        };
    };

    // LÔ GIC 1: CHỈ FETCH API MỘT LẦN KHI COMPONENT MOUNT
    const fetchQues = async () => {
        const API_URL = "https://opentdb.com/api.php?amount=50";
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Lỗi HTTP: ${response.status}`);
            }
            const data = await response.json();
            if (data.response_code !== 0) {
                throw new Error(`Lỗi API Trivia DB: Code ${data.response_code}.`);
            }
            // LƯU KẾT QUẢ API, GÂY RA RENDER VÀ CHẠY useEffect 2
            setQuestionBuffer(data.results);
        } catch (error) {
            console.error("Lỗi xảy ra khi truy xuất câu hỏi: ", error.message);
        }
    };

    // Hàm chuyển sang câu hỏi tiếp theo
    const goNext = () => {
        setCurrentQuestion(formatQuestion(questionBuffer[currentQuestionIndex + 1]));
        
    };

    const goBack = () => {
        if (currentQuestionIndex >= 0) {
            setCurrentQuestion(formatQuestion(questionBuffer[currentQuestionIndex - 1]));
        }
    };

    useEffect(() => {
        fetchQues();
    }, []); // 🎯 CHỈ CHẠY MỘT LẦN

    // LÔ GIC 2: XỬ LÝ DỮ LIỆU SAU KHI TẢI
    useEffect(() => {
        // Kiểm tra nếu dữ liệu đã tải và chưa có câu hỏi hiện tại
        if (questionBuffer.length > 0 && currentQuestionIndex === 0 && !currentQuestion) {
            const formatted = formatQuestion(questionBuffer[currentQuestionIndex]);
            setCurrentQuestion(formatted);
        }
    }, [questionBuffer, currentQuestionIndex, currentQuestion]);

    // ----------------------------------------------------
    // KIỂM TRA ĐIỀU KIỆN RENDER
    if (!currentQuestion) {
        return <div>Đang tải câu hỏi hoặc xảy ra lỗi...</div>;
    }

    // ... (Hàm handleAnswerClick cần được định nghĩa để sử dụng moveToNextQuestion)
    const handleAnswerClick = (selectedAnswer, index) => {
        setSelectedOption(selectedAnswer);

        const newUserAnswer = [...userAnswer];
        newUserAnswer[currentQuestion] = index;
        setUserAnswer[newUserAnswer];
    }

    return (
        <div className="quiz-container">
            {/* 🎯 SỬ DỤNG currentQuestion đã được xử lý */}
            <h2>Câu {currentQuestionIndex + 1}</h2>
            <p className="question">{currentQuestion.question}</p>

            {currentQuestion.all_answers.map((answer, index) => (
                <button
                    key={index}
                    className={`option ${selectedOption === answer ? 'selected' : ''}`}
                    disabled={!!selectedOption && selectedOption !== answer}
                    onClick={() => handleAnswerClick(answer, index)}>
                    <span>{String.fromCharCode(65 + index)}. </span>
                    {answer}
                </button>
            ))}

            {selectedOption != null ? (selectedOption === currentQuestion.correct_answer ? <p className="correct-answer">Đáp án đúng</p> : <p className="incorrect-answer">Đáp án sai</p>) : ""}

            <div className="nav-buttons">
                <button onClick={goBack}>Quay lại</button>
                <button onClick={goNext}>Tiếp theo</button>
            </div>
        </div>
    );
};

export default Quiz;