import { Modal } from "flowbite";
export function contact() {
  // select the two elements that we'll work with
  const buttons: HTMLElement[] | null = Array.from(document.querySelectorAll(".contactButton"));
  const modal: HTMLElement | null = document.querySelector(
    "#authentication-modal"
  );

  // create a new modal component
  const modalComponent = new Modal(modal);

  // toggle the visibility of the modal when clicking on the button
  if (buttons) {
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        modalComponent.toggle();
        const closeButton = document.querySelector("#closeModal");
        if (closeButton) {
          closeButton.addEventListener("click", () => {
            modalComponent.hide();
          });
        }
      });
    });
  }
}