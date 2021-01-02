
export default function HTMLNotifier() {

    this.initialize = () => {
        this.hideTimeout = null;
        this.element = document.createElement("div");
        this.element.className = "notify";
        document.body.appendChild(this.element);
    }

    this.showMessage = (message, state) => {
        clearTimeout(this.hideTimeout);
        this.element.textContent = message;
        this.element.className = "notify notify--visible";

        if (state) {
            this.element.classList.add(`notify--${state}`);
        }

        this.hideTimeout = setTimeout(() => {
            this.element.classList.remove("notify--visible");
        }, 3000);
    }

}