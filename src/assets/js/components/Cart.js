
export default function HTMLCartInit() {
    this.parent = document.createElement('div');
    this.parent.id = 'checkout-route-container';

    this.parent.innerHTML = `
        <ul class="list-cart"></ul>
        <div class="sidebar">
            <form class="sidebar-cart"></form>
            <div class="sidebar-history">
                <h3>Checkout History</h3>
                <ul class="list-carthistory"></ul>
            </div>
        </div>
    `
}