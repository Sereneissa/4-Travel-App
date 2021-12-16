import { handleSubmit } from './js/formHandler'

console.log(handleSubmit,);

console.log("CHANGE!!");

import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

export {
    handleSubmit,
   }


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button-submit').addEventListener('click', handleSubmit);
})