import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // const byDateDesc = data?.focus.sort((evtA, evtB) =>
  //   new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  // );

  // Modification du code pour plusieurs raisons. 1 inversion du signe supérieur en inférieur.
  // Création d'un tableau décomposé qui sauvegardera le tableau original.
  // ajout d'un tableau vide au cas où les données sont absentes
  const byDateDesc = data?.focus
    ? [...data.focus].sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
      )
    : [];

  // const nextCard = () => {
  //   setTimeout(
  //     () => setIndex(index < byDateDesc.length ? index + 1 : 0),
  //     5000
  //   );
  // };
  // useEffect(() => {
  //   nextCard();
  // });

  // ajout de -1 après byDateDesc.length, pour défiler 3 éléments sans page blanche entre les slides.
  // ajout de timer et d'un clearTimout pour pouvoir reste le temps si on clic sur un bouton radio
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]);
  // console.log(byDateDesc);

  return (
    <div className="SlideCardList">
      {/* suppression de chevrons non nécessaire */}
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Changement de l'encapsulation. Avant le premier maping englobait le second, ce qui posait des problèmes d'affichage des boutons radio sélectionnés au clic */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {/* ajout d'événement dans les paramètres */}
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.title} // changement de la clé pour une meilleure syntaxe
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // changement de "idx" par "index" pour mettre à jour le boutton
              onChange={() => setIndex(radioIdx)} // ajout d'un onChange pour naviger au clic
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
