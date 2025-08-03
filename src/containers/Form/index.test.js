import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      // En ajoutant une condition de vérification de champs le code.test doit avoir une nouvel methode
      // Vérifier si chaque champs est bien remplie
      fireEvent.change(screen.getByTestId("Nom"), {
        target: { value: "Nom" },
      });
      fireEvent.change(screen.getByTestId("Prénom"), {
        target: { value: "Prénom" },
      });
      fireEvent.change(screen.getByTestId("Email"), {
        target: { value: "adresse@email.com" },
      });
      fireEvent.change(screen.getByTestId("Message"), {
        target: { value: "Message" },
      });

      // Ouvrir le menu déroulant
      fireEvent.click(screen.getByTestId("collapse-button-testid"));

      // Sélectionner une option
      fireEvent.click(screen.getByText("Personel"));

      // Soumettre le formulaire
      fireEvent.click(await screen.findByRole("button", { name: /envoyer/i }));

      // Vérifier que le texte "En cours" s'affiche bien
      await screen.findByText("En cours");

      // Vérifier que onSuccess est bien appelé
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });
  });
});

// Ancien code **************

//       fireEvent(
//         await screen.findByTestId("button-test-id"),
//         new MouseEvent("click", {
//           cancelable: true,
//           bubbles: true,
//         })
//       );
//       await screen.findByText("Envoyer");
//       await screen.findByText("En cours");

//       await screen.findByText(findTextInElement);
//       expect(onSuccess).toHaveBeenCalled();
//     });
//   });
// });
