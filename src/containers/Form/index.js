import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

import "../../pages/Home/style.scss"; // style de la div "alert-empty" en lien avec isAlert

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess = () => null, onError = () => null }) => {
  const [sending, setSending] = useState(false);

  const [selectedValue, setSelectedValue] = useState(""); // code ajouté pour vérifier si l'utilisateur a sélectionné un motif
  const [isAlert, setIsAlert] = useState(false); // code ajouté pour créer un message si la personne n'a pas sélectionné le motif
  const formRef = useRef(null); // code ajouté pour cibler le formulaire

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      // code ajouté pour les conditions du sélecteur de motif
      if (selectedValue !== "Personel" && selectedValue !== "Entreprise") {
        setIsAlert(true);
        setSending(false);
        return;
      }

      try {
        await mockContactApi();
        setSending(false);
        setIsAlert(false); // ajout d'alerte si "Personel" ou "Entreprise" n'est pas selectionné

        formRef.current.reset(); // ajout 'reset()' pour enlever les donner du formulaire après son envoie

        onSuccess(true); // ajout onSuccess
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [selectedValue, onSuccess, onError]
  );

  // code ajouté pour désactiver l'alerte une fois la bonne valeur sélectionnée dans la balise select
  const handleChangeSelect = useCallback((value) => {
    setSelectedValue(value);
    setIsAlert(false);
  }, []);

  return (
    <form onSubmit={sendContact} ref={formRef}>
      <div className="row">
        {/* ajout d'un 'required' */}
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            required="required"
            type={FIELD_TYPES.INPUT_TEXT}
          />
          <Field placeholder="" label="Prénom" required="required" />
          {/* appel de l'alert si motif non selectionné */}
          {isAlert && (
            <div className="alert-empty">
              Veuillez sellectionner un motif ci-dessous avant d&rsquo;envoyer
              votre message
            </div>
          )}

          <Select
            selection={["Personel", "Entreprise"]}
            onChange={handleChangeSelect} // ajout du onChange
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />

          <Field
            placeholder=""
            label="Email"
            required="required"
            type={FIELD_TYPES.INPUT_EMAIL}
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            required="required"
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

// Form.defaultProps = {
//   onError: () => null,
//   onSuccess: () => null,
// };
// suppression du defaultProps et ajout des valeurs avec leurs paramètres directement dans la fonction Form

export default Form;
