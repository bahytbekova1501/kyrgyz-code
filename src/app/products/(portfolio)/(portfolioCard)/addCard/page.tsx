"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchPortfolio } from "@/redux/slices/portfolioSlice";
import { PortfolioCardTypes } from "@/types/card.types";

const AddCard: React.FC = () => {
  // const [portfolioId, setPortfolioId] = useState<number | undefined>(undefined);
  // const [card, setCard] = useState<PortfolioCardTypes>({
  //   id: Date.now(),
  //   title: "",
  //   image: "none",
  //   btnImg: "none",
  //   link: "",
  //   styleType: "text",
  // });
  // const [file, setFile] = useState<File | null>(null);
  // const dispatch: AppDispatch = useDispatch();
  // const portfolios = useSelector(
  //   (state: RootState) => state.portfolio.portfolio
  // );

  // useEffect(() => {
  //   dispatch(fetchPortfolio());
  // }, [dispatch]);

  // const handlePortfolioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setPortfolioId(Number(e.target.value));
  // };

  // const handleCardChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   setCard({
  //     ...card,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const selectedFile = e.target.files[0];
  //     setFile(selectedFile);

  //     if (selectedFile) {
  //       const imageRef = ref(storage, `images/${selectedFile.name}`);
  //       try {
  //         await uploadBytes(imageRef, selectedFile);
  //         const url = await getDownloadURL(imageRef);

  //         // Обновляем форму с URL загруженного изображения
  //         setCard((prevState) => ({
  //           ...prevState,
  //           image: url, // Устанавливаем URL как значение поля
  //         }));
  //       } catch (error) {
  //         console.error("Error uploading image: ", error);
  //       }
  //     }
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (portfolioId === undefined) {
  //     alert("Выберите продукт !");
  //     return;
  //   }

  //   dispatch(addCardToPortfolio({ portfolioId, card }));

  //   setCard({
  //     id: Date.now(),
  //     title: "",
  //     image: "none",
  //     btnImg: "none",
  //     link: "",
  //     styleType: "text",
  //   });
  //   setFile(null);
  // };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="portfolio">Выберите продукт</label>
          <select
            id="portfolio"
            name="portfolio"
            onChange={handlePortfolioChange}
            value={portfolioId ?? ""}
          >
            <option value="">--Выберите продукт--</option>
            {portfolios.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="title">Название карточки</label>
          <input
            type="text"
            id="title"
            name="title"
            value={card.title}
            onChange={handleCardChange}
          />
        </div>
        <div>
          <label htmlFor="link">ccылка на кнопку</label>
          <input
            type="link"
            id="link"
            name="link"
            value={card.link}
            onChange={handleCardChange}
          />
        </div>
        <div>
          <label htmlFor="fileUpload">Upload Image</label>
          <input type="file" id="fileUpload" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="fileUpload">Upload BtnImage</label>
          <input type="file" id="fileUpload" onChange={handleFileChange} />
        </div>

        <div>
          <label htmlFor="styleType">Тип стиля</label>
          <select
            id="styleType"
            name="styleType"
            value={card.styleType}
            onChange={handleCardChange}
          >
            <option value="text">Text</option>
            <option value="bgImage">bgImage</option>
            <option value="picture-text">picture-text</option>
            <option value="text-btn">text-btn</option>
          </select>
        </div>
        <button type="submit">Добавить карточку</button>
      </form>{" "} */}
    </div>
  );
};

export default AddCard;
