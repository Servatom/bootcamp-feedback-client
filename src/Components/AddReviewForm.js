import { useReducer, useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const Message = ({ message }) => {
  let response = {};
  if (message === 1) {
    response = {
      class: "text-green-600",
      msg: "Feedback successfully submitted!",
    };
  } else if (message === -1) {
    response = {
      class: "text-green-600",
      msg: "",
    };
  } else {
    response = response = {
      class: "text-red-600",
      msg: "Something Went wrong, Please try again",
    };
  }

  return (
    <p className={response.class + " mx-auto p-2 w-full text-center"}>
      {response.msg}
    </p>
  );
};

const AddReviewForm = ({ setAddFormOpen }) => {
  const [message, setmessage] = useState(-1);

  const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value,
    };
  };
  const [formdata, setformdata] = useReducer(formReducer, {});

  const onClick = (e) => {
    e.preventDefault();
    axios
      .post("https://dohe.servatom.com/", formdata)
      .then((res) => {
        if (res.status === 200) {
          setmessage(1);
          setTimeout(() => {
            document.location.reload();
          }, 2000);
        } else {
          setmessage(0);
        }
      })
      .catch((err) => {
        console.log(`err : ${err}`);
        setmessage(0);
      });
    setTimeout(() => {
      setAddFormOpen(false);
    }, 1000);
  };

  const handleChange = async (e) => {
    setformdata({
      name: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <Modal setModalOpen={setAddFormOpen}>
      <form className="flex flex-col justify-center items-start p-4 px-6 ">
        <label className="font-light text-sm mb-2">Name: *</label>
        <input
          type={"text"}
          name="name"
          onChange={(e) => handleChange(e)}
          className="px-4 py-2 w-full mb-6 bg-[#F6F6F6] rounded-md border border-gray-400"
          required
        />

        <label className="font-light text-sm mb-2">Github URL:</label>
        <input
          type={"url"}
          name="github"
          onChange={(e) => handleChange(e)}
          className="px-4 py-2 w-full mb-6 bg-[#F6F6F6] rounded-md border border-gray-400"
        />

        <label className="font-light text-sm mb-2">LinkedIn URL:</label>
        <input
          type={"url"}
          name="linkedin"
          onChange={(e) => handleChange(e)}
          className="px-4 py-2 w-full mb-6 bg-[#F6F6F6] rounded-md border border-gray-400"
        />

        <label className="font-light text-sm mb-2">Twitter URL:</label>
        <input
          type={"url"}
          name="twitter"
          onChange={(e) => handleChange(e)}
          className="px-4 py-2 w-full mb-6 bg-[#F6F6F6] rounded-md border border-gray-400"
        />

        <label className="font-light text-sm mb-2">Instagram URL:</label>
        <input
          type={"url"}
          name="instagram"
          onChange={(e) => handleChange(e)}
          className="px-4 py-2 w-full mb-6 bg-[#F6F6F6] rounded-md border border-gray-400"
        />

        <label className="font-light text-sm mb-2">
          Passphrase: *<span>(Would be required for deleting feedback)</span>
        </label>
        <input
          type={"text"}
          name="passphrase"
          onChange={(e) => handleChange(e)}
          className="px-4 py-2 w-full mb-6 bg-[#F6F6F6] rounded-md border border-gray-400"
          required
        />

        <label className="font-light text-sm mb-2">Feedback: *</label>
        <textarea
          className="px-4 py-2 w-full mb-6 bg-[#F6F6F6] rounded-md border border-gray-400 resize-y"
          rows={5}
          name="message"
          onChange={(e) => handleChange(e)}
          required
        />

        <button
          onClick={(e) => onClick(e)}
          className="bg-[#9296FF] hover:bg-[#6268FF] p-3 px-24 mx-auto  text-white items-center rounded-full text-xl font-semibold"
        >
          Submit
        </button>
        <Message message={message} />
      </form>
    </Modal>
  );
};

export default AddReviewForm;
