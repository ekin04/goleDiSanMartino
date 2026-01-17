export function toggle(button: string, menu: string) {
  const buttonElement: HTMLElement | null = document.querySelector(button);
  const menuElement: HTMLElement | null = document.querySelector(menu);
  if (buttonElement) {
    const toggleMenu = () => {
      if (menuElement?.classList.contains("hidden")) {
        menuElement?.classList.remove("hidden");
        buttonElement.removeEventListener("click", toggleMenu);
        buttonElement.addEventListener("click", closeMenu);
      } else {
        closeMenu();
      }
    };

    const closeMenu = () => {
      menuElement?.classList.add("hidden");
      buttonElement.removeEventListener("click", closeMenu);
      buttonElement.addEventListener("click", toggleMenu);
    };

    buttonElement.addEventListener("click", toggleMenu);
  }
}
