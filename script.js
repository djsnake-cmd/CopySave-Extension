function createCards(index){
    const container = document.getElementById('container');
    const div = document.createElement('div');
    div.className = "container";
    div.innerHTML=`
        <div id="area-${index}-div">
            <textarea name="" id="textarea-${index}" cols="3" rows="3"></textarea>
            <button id="btn-copy-${index}">Copy</button>
            <button id="btn-save-${index}">Save</button>
            <button id ="btn-delete-${index}">Delete</button>
        </div>`;
    container.appendChild(div);

    document.getElementById(`btn-copy-${index}`).addEventListener('click',function(){
        copyToClipboard(index);
    })
    
    document.getElementById(`btn-save-${index}`).addEventListener('click', function(){
        saveText(index);
    })
}


function copyToClipboard(index) 
{
    var copyText = document.getElementById(`textarea-${index}`);
    copyText.select();
    console.log(copyText)
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
}

function saveText(index) 
{
    var text = document.getElementById(`textarea-${index}`).value;
    var data = {};
    data[`savedText-${index}`] = text;
    chrome.storage.local.set(data, function () { });
}

document.addEventListener('DOMContentLoaded', function () 
{
    for (let index = 0; index < 4; index++) {
        const key = `savedText-${index}`;
        chrome.storage.local.get(key, function(data) {
        document.getElementById(`textarea-${index}`).value = data[key] || '';
        })
    }
});

for(let index = 0; index<4; index++){
    createCards(index);
}

