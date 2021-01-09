import Calzada from '../main';

export default function HTMLMoreButton(props) {
    this.button = document.createElement('span');
    this.button.classList.add('button')
    this.button.classList.add('btn_more')
    this.button.classList.add('transition-scroll');
    this.button.classList.add('show-on-scroll');
    this.button.id = `btn_more_${props.id}`;
    this.button.textContent = 'More'

    if (props.route == 'department') {
        this.button.setAttribute('deptId', props.department_id);
        this.button.setAttribute('deptName', props.department_name);
    }

    if (props.route == 'home')
        return null

    this.button.onclick = event => {
        Calzada.onNextPage(props.page);
        props.route == 'department'
            ? Calzada.toDepartment(event)
            : Calzada.toSearch(event)
    }
}