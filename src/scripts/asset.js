export function setInner(id,content){
    document.getElementById(id).innerHTML = content;
}

export function getValue(id){
    return document.getElementById(id).value;
}

export function textBlur(id){
    document.getElementById(id).blur();
}

export function setValue(id,valuecontent){
    return document.getElementById(id).value=valuecontent;
}

export function addChild(id,tag,classvalue,content){
    let el = document.createElement(tag);
    let classArray = classvalue.split(" ");
    classArray.forEach(setClassValue.bind(null,el));
    el.innerHTML = content;
    document.getElementById(id).appendChild(el);
}

export function onClick(id,actionfunctionname){
    document.getElementById(id).onclick = actionfunctionname;
}

function setClassValue(el,classvalue){
    el.classList.add(classvalue.trim());
}
