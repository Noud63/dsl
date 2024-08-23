
"use client";
import React, { useState, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";


const ModalPage = () => {

  const [newFiles, setNewFiles] = useState({ images: [] });

  const [inView, setInView] = useState(false)

  const router = useRouter();

  const closeModal = () => {
    setInView(!inView);
    router.push("/")
    setNewFiles({ images: [] });
  };

  const handleChange = (e) => {
    const { files } = e.target;
    const addedImages = [...newFiles.images];

    for (const file of files) {
      addedImages.push(file);
    }
    setNewFiles((prevState) => ({
      ...prevState,
      images: addedImages,
    }));
  };

  const deleteSelectedImage = (name) => {
    const newArray = newFiles.images.filter((img) => img.name !== name);
    console.log(newArray);
    setNewFiles((prevState) => ({
      ...prevState,
      images: newArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    newFiles.images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });
      if (res.status === 200) {
        //  router.push("/")
        closeModal();
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
   
      !inView && <div className="w-full min-h-screen absolute top-0 left-0 right-0 bottom-0 m-auto bg-green-950/60 flex justify-center items-center">
        <div className="w-full max-w-[500px] bg-white rounded-lg shadow-md p-4 mx-4">
          <div className="w-full flex flex-row justify-between items-center border-b border-gray-300 pb-2">
            <div className="text-lg font-semibold">Schrijf een bericht</div>
            <div className="cursor-pointer" onClick={closeModal}>
              <IoMdCloseCircleOutline size={35} color="green" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <textarea
              name="postContent"
              id="content"
              cols="30"
              rows="10"
              className="w-full border border-gray-300 mt-4 outline-none p-2"
              required
            />

            <span className="pb-2">Voeg een afbeelding toe:</span>

            <div className="mt-2">
              <input
                multiple
                type="file"
                // id="images"
                // name="images"
                accept="image/*"
                onChange={handleChange}
                className=""
              />

              <div className="text-md mt-2 mb-2 border-b border-gray-300 pb-2">
                {newFiles.images.length > 0
                  ? `${newFiles.images.length} bestand(en) geselecteerd.`
                  : ""}
              </div>
            </div>

            <div className="mb-4">
              {newFiles.images.length > 0
                ? newFiles.images.map((img) => (
                    <div
                      className="flex flex-row w-full items-center py-1"
                      key={img.name}
                    >
                      {img.name}
                      <IoMdCloseCircleOutline
                        size={20}
                        color="red"
                        className="pt-1 cursor-pointer"
                        onClick={() => deleteSelectedImage(img.name)}
                      />
                    </div>
                  ))
                : ""}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-950 via-green-700 to-green-950 rounded-lg flex justify-center py-2 text-white text-lg"
            >
              Plaatsen
            </button>
          </form>
        </div>
      </div>
    
  );
};

export default ModalPage;

