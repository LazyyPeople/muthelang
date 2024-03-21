let umandanify = `<label class="form-control">
<div class="label">
    <span class="label-text">Umandanify</span>
</div>
<textarea class="muthe textarea w-full textarea-bordered" rows="3" placeholder="Umandanify"></textarea>
</label>`;
let indonesia = `<label class="form-control">
<div class="label">
    <span class="label-text">Bahasa Indonesia</span>
</div>
<textarea class="id textarea w-full textarea-bordered" rows="3" placeholder="Bahasa Indonesia"></textarea>
</label>`

document.addEventListener('DOMContentLoaded', function() {
    let dbLang = localStorage.getItem('lang');
    let textHelper = document.querySelector('.text-helper');
    if (dbLang === 'umandanify') {
        textHelper.textContent = 'Umandanify > Indonesia';
        document.querySelector('.boxtext').innerHTML = umandanify + indonesia;
        document.querySelector('.id').disabled = true;
    } else {
        document.querySelector('.boxtext').innerHTML = indonesia + umandanify;
        textHelper.textContent = 'Indonesia > Umandanify';
        document.querySelector('.muthe').disabled = true;
    }
});

function changeBahasa(e, lang) {
    let value = e.target.value;
    if(lang === 'indonesia') {
        console.log('indonesia');
        document.querySelector('.muthe').value = umandanifyFunc(value);
    } else if(lang === 'umandanify') {
        console.log('umandanify');
        document.querySelector('.id').value = deumandanifyFunc(value);
    }
}

function toggleLang() {
    let dbLang = localStorage.getItem('lang');
    let textHelper = document.querySelector('.text-helper');
    if (dbLang === 'umandanify') {
        localStorage.setItem('lang', 'indonesia');
        textHelper.textContent = 'Indonesia > Umandanify';
        document.querySelector('.boxtext').classList.toggle('flex-col-reverse');
        document.querySelector('.boxtext').classList.toggle('flex-col');
        document.querySelector('.muthe').disabled = true;
        document.querySelector('.id').disabled = false;
    } else {
        localStorage.setItem('lang', 'umandanify');
        textHelper.textContent = 'Umandanify > Indonesia';
        document.querySelector('.boxtext').classList.toggle('flex-col-reverse');
        document.querySelector('.boxtext').classList.toggle('flex-col');
        document.querySelector('.id').disabled = true;
        document.querySelector('.muthe').disabled = false;
    }
}

function deumandanifyFunc(str) {
    return str
    .replace(/(iden|pre|pru|pro|pri)/gi, '')
    .replace(/(strengen)/gi, 'ng')
    .replace(/(.)(es)/gi, '$1');
}

function umandanifyFunc(str) {
    let vocal = false;
    let result = "";
    for (let i = 0; i < str.length; i++) {
        const letter = str[i];
        if (letter === ' ') {
            result += letter + "| ";
            vocal = false;
            continue;
        } else if ("aiueo".includes(letter)) {
            vocal = true;
            result += letter;
        } else if ("bcdfghjklmnpqrstvwxyz".includes(letter)) {
            result += letter;
        } else {
            result += " " + letter + " ";
            vocal = false;
            continue;
        }
        if (vocal) {
            result += " ";
            vocal = false;
            continue;
        }
    }
    const ss = result.replace(/\s+/g, " ");
    result = "";
    for (const s of ss.split(" ")) {
        if (s.length === 3 && s.slice(0, 2) !== "ng" && s.slice(0, 2) !== "ny") {
            result += s[0] + " " + s.slice(1);
        } else if (s.length === 4 && s.slice(0, 2) === "ng") {
            result += s.slice(0, 2) + " " + s.slice(2);
        } else if (s.length === 4 && s.slice(1, 4) === "nya") {
            result += s[0] + " " + s.slice(1);
        } else if (s.length === 4 && s.slice(1, 4) !== "nya") {
            result += s[0] + " " + s[1] + " " + s.slice(2);
        } else {
            result += s;
        }
        result += " ";
    }
    result = result.replace(/i/g, "ipri")
        .replace(/e/g, "epre")
        .replace(/o/g, "opro")
        .replace(/u/g, "upru")
        .replace(/a/g, "aiden")
        .replace(/ (\w) /g, " $1es ")
        .replace(/^(\w) /g, "$1es ")
        .replace(/ ng /g, " strengen ")
        .replace(/\|/g, "")
        .replace(/\s+/g, " ")
        .replace(/^ | $/g, "")
        .replace(/ ([^\w])/g, "$1");

    return result;
}