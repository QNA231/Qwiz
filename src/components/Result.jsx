import React from 'react'

const Result = ({ score, totalQuestions, resetQuiz, viewBack }) => {
    return (
        <div>
            <h2>Kết quả</h2>
            <div className='resultContainer'>
                <div className='result'>Số câu đúng: <strong className='result-success'>{score}</strong></div>
                <div className='result'>Số câu sai: <strong className='result-error'>{totalQuestions - score}</strong></div>
                <div className='result'>Tỉ lệ đúng: <strong className='result-ratio'>{score / totalQuestions * 100}%</strong></div>
            </div>
            <div className='resultButtonsContainer'>
                <button className='result-button' onClick={viewBack}>Xem lại</button>
                <button className='result-button' onClick={resetQuiz}>Làm lại</button>
            </div>
        </div>
    )
}

export default Result