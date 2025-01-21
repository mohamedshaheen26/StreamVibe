import React, { useState } from "react";
import CustomButton from "./CustomButton";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      title: "What is StreamVibe?",
      answer:
        "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      title: "How much does StreamVibe cost?",
      answer: "StreamVibe costs $9.99 per month for the basic plan.",
    },
    {
      title: "What content is available?",
      answer:
        "StreamVibe offers a wide variety of movies, TV shows, and exclusive content.",
    },
    {
      title: "How can I watch StreamVibe?",
      answer:
        "You can watch StreamVibe on various devices such as smartphones, tablets, and smart TVs.",
    },
    {
      title: "How do I sign up?",
      answer:
        "Signing up for StreamVibe is easy and can be done on our website or app.",
    },
    {
      title: "What is the free trial?",
      answer:
        "StreamVibe offers a 7-day free trial for new users to explore its features.",
    },
    {
      title: "How do I contact support?",
      answer:
        "You can contact StreamVibe support through email or live chat on our website.",
    },
    {
      title: "What are the payment methods?",
      answer:
        "StreamVibe accepts payments through credit cards, debit cards, and PayPal.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Split questions into two arrays
  const leftColumnQuestions = questions.slice(0, 4);
  const rightColumnQuestions = questions.slice(4);

  return (
    <section className='faq' id='faq'>
      <div className='container'>
        <div className='d-flex flex-column align-items-end justify-content-between flex-xl-row'>
          <div className='content-left mb-4 mb-xl-0'>
            <h2>Frequently Asked Questions</h2>
            <p>
              Got questions? We've got answers! Check out our FAQ section to
              find answers to the most common questions about StreamVibe.
            </p>
          </div>
          <CustomButton className='custom-button' label='Ask a Question' />
        </div>
        <div className='accordion'>
          {" "}
          <div className='row g-4'>
            <div className='col-12 col-lg-6'>
              {leftColumnQuestions.map((question, index) => (
                <div className='faq-item' key={index}>
                  <div
                    className={`d-flex align-items-${
                      activeIndex === index ? "start" : "center"
                    }`}
                    onClick={() => toggleAnswer(index)}
                  >
                    <div className='faq-number'>
                      {index < 10 ? "0" : ""}
                      {index + 1}
                    </div>
                    <div className='faq-content'>
                      <h4
                        className={`faq-header ${
                          activeIndex === index ? "mb-3" : ""
                        }`}
                      >
                        {question.title}
                      </h4>
                      {activeIndex === index && (
                        <p className='faq-answer'>{question.answer}</p>
                      )}
                    </div>
                    <div className='faq-icon'>
                      {activeIndex === index ? (
                        <i className='fas fa-minus'></i>
                      ) : (
                        <i className='fas fa-plus'></i>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='col-12 col-lg-6'>
              {rightColumnQuestions.map((question, index) => (
                <div className='faq-item' key={index + 4}>
                  <div
                    className={`d-flex align-items-${
                      activeIndex === index + 4 ? "start" : "center"
                    }`}
                    onClick={() => toggleAnswer(index + 4)}
                  >
                    <div className='faq-number'>
                      {index < 10 ? "0" : ""}
                      {index + 5}
                    </div>
                    <div className='faq-content'>
                      <h4
                        className={`faq-header ${
                          activeIndex === index + 4 ? "mb-3" : ""
                        }`}
                      >
                        {question.title}
                      </h4>
                      {activeIndex === index + 4 && (
                        <p className='faq-answer'>{question.answer}</p>
                      )}
                    </div>
                    <div className='faq-icon'>
                      {activeIndex === index + 4 ? (
                        <i className='fas fa-minus'></i>
                      ) : (
                        <i className='fas fa-plus'></i>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
