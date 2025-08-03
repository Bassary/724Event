import PropTypes from "prop-types";

import "./style.scss";

export const FIELD_TYPES = {
  INPUT_TEXT: 1,
  TEXTAREA: 2,
  INPUT_EMAIL: 3, // ajout de l'input email pour le required adapter à l'email
};

const Field = ({
  type = FIELD_TYPES.INPUT_TEXT,
  label = "",
  name = "field-name",
  placeholder = "",
  ...rest
}) => {
  let component;
  switch (type) {
    case FIELD_TYPES.INPUT_TEXT:
      component = (
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          required="required"
          {...rest}
        />
      );
      break;
    case FIELD_TYPES.INPUT_EMAIL: // ajout de code
      component = (
        <input
          type="email" // type 'email' ajouter pour correspondre au required adapté
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          required="required"
          {...rest}
        />
      );
      break;
    case FIELD_TYPES.TEXTAREA:
      component = (
        <textarea
          name={name}
          data-testid="field-testid"
          required="required"
          {...rest}
        />
      );
      break;
    default:
      component = (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          data-testid="field-testid"
          required="required"
          {...rest}
        />
      );
  }
  return (
    <div className="inputField">
      <span>{label}</span>
      {component}
    </div>
  );
};

Field.propTypes = {
  type: PropTypes.oneOf(Object.values(FIELD_TYPES)),
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

//  Field.defaultProps = {
//    label: "",
//    placeholder: "",
//    type: FIELD_TYPES.INPUT_TEXT,
//    name: "field-name",
//  }
// suppression du defaultProps et ajout des valeurs avec leurs paramètres directement dans la fonction Field

export default Field;
