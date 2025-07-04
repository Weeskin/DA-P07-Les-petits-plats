import './style.css'
import { header } from './blockpage/header.js'
import { mainBody } from './blockpage/mainBody.js'

document.querySelector('#app').innerHTML = ` 
    ${header()}
    ${mainBody()}
   

`
