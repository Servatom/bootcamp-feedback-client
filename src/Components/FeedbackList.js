import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import axios from "axios";

const FeedbackList = ({ setDeleteId }) => {
  const [Feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    const getData = async () => {
      let res = await axios.get(`https://dohe.servatom.com/`);
      if (res !== []) setFeedbacks(res.data.reverse());
    };
    getData();
  }, []);
  const colors = ["purple", "yellow", "green", "pink"];
  const spanList = ["", "md:col-span-2"];
  let color,
    span,
    countPerRow = 0;
  return (
    <div className="p-12 grid md:grid-cols-4 grid-cols-1 gap-4">
      {Feedbacks.map((feedback, index) => {
        feedback.message.length < 50 || countPerRow % 4 > 2
          ? (span = "")
          : (span = spanList[Math.floor(Math.random() * spanList.length)]);
        color = colors[Math.floor(Math.random() * colors.length)] + " " + span;

        countPerRow = span === "" ? countPerRow + 1 : countPerRow + 2;
        feedback.color = color;
        return (
          <FeedbackItem
            feedback={feedback}
            key={feedback._id}
            setDeleteId={setDeleteId}
          />
        );
      })}
    </div>
  );
};

export default FeedbackList;
