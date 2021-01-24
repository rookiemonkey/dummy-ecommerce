
export default function toggleSideBar(action) {
    const sidebar = document.querySelector('.sidebar_nav');
    const body = document.body;

    switch (action) {
        case 'open':
            sidebar.style.transform = 'translate(0vw)'
            body.style.overflowY = 'hidden'
            break;

        case 'close':
            sidebar.style.transform = 'translate(100vw)'
            body.style.overflowY = 'auto'
            break;

        default:
            alert('wrong ACTION passed to toggleSideBar function!')
    }
}